"use client"

import type React from "react"
import { useEffect, useState, useRef, Suspense } from "react"
import {
    PanelLeft,
    PanelRightClose,
    MoreHorizontal,
    Plus,
    Send,
    FileText,
    Upload,
    MessageSquare,
    FileIcon,
    FileUp,
    FilePenLine,
    FileSearch,
} from "lucide-react"
import { toast } from "sonner"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import Copyright from "@/components/Copyright"
import amicuslogo from "@/public/amicus 1.png"
import Image from "next/image"
import { v4 as uuidv4 } from "uuid"
import type { ChatMode, Message, ArgumentType } from "@/lib/types"
import { createConversation, sendMessage, uploadFile, getConversationHistory, loadAmicusRecentConversations } from "@/lib/api-service"

// Create a client component that uses useSearchParams
function AmicusClient() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeTab, setActiveTab] = useState<ChatMode>("Chat")
    const [argumentType, setArgumentType] = useState<ArgumentType>("both")
    const [recentConversations, setRecentConversations] = useState<any[]>([])

    // Conversation state
    const initialConvId = searchParams.get("conversation_id")
    const [conversationId, setConversationId] = useState<string | null>(initialConvId)
    const [messages, setMessages] = useState<Message[]>([])

    const [queryInput, setQueryInput] = useState("")
    const [loadingConversation, setLoadingConversation] = useState(false)
    const [loadingQa, setLoadingQa] = useState(false)
    const [searchableCase, setSearchableCase] = useState("Casemine Repository")
    const [remainingChars, setRemainingChars] = useState(2000)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [hasUploadedFile, setHasUploadedFile] = useState(true) // Set to true to fix the "no document uploaded" error
    const [lastUploadedFile, setLastUploadedFile] = useState<string | null>(null)
    const [lastDocId, setLastDocId] = useState<string | null>(null) // Track the last document ID

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Load recent conversations
    useEffect(() => {
        const loadRecentConvs = async () => {
            const token = localStorage.getItem("token")
            if (!token) return

            try {
                const response = await loadAmicusRecentConversations(token)
                if (response.conversations) {
                    setRecentConversations(response.conversations)
                }
            } catch (err: any) {
                console.error("Failed to load recent conversations:", err)
                toast.error("Failed to load conversation history")
            }
        }

        loadRecentConvs()
    }, [])

    // Check auth on mount
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            const redirectTo = encodeURIComponent(pathname + window.location.search)
            router.push(`/login?redirect=${redirectTo}`)
        } else {
            // Add initial assistant message
            if (messages.length === 0) {
                setMessages([
                    {
                        id: uuidv4(),
                        role: "assistant",
                        content:
                            "Hello! How can I assist you with your legal questions today? If you have a specific inquiry regarding Indian law or need information about a legal judgment, please let me know!",
                        timestamp: new Date(),
                    },
                ])
            }

            // Load conversation history if we have a conversation ID
            if (initialConvId) {
                loadConversationHistory(initialConvId, token)
            }
        }
    }, [initialConvId])

    const loadConversationHistory = async (convId: string, token: string) => {
        try {
            setLoadingConversation(true)
            const history = await getConversationHistory(convId, token)
            console.log(history)

            if (history && history.length > 0) {
                const historyMessages: Message[] = history.flatMap((item: any) => {
                    const userMessage: Message = {
                        id: uuidv4(),
                        role: "user",
                        content: item.message || "",
                        timestamp: new Date(item.created_at || Date.now()),
                        avatar: "KC", // user avatar
                    }

                    const assistantMessage: Message = {
                        id: uuidv4(),
                        role: "assistant",
                        content: item.response || "",
                        timestamp: new Date(item.created_at || Date.now()),
                        avatar: undefined, // assistant has no avatar
                    }

                    return [userMessage, assistantMessage]
                })

                setMessages(historyMessages)
            }
        } catch (err: any) {
            toast.error(`Failed to load conversation history: ${err.message || "Unknown error"}`)
            console.error(err)
        } finally {
            setLoadingConversation(false)
        }
    }


    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    const handleTabClick = (tab: ChatMode) => {
        setActiveTab(tab)
    }

    const handleSend = async () => {
        if (!queryInput.trim()) return
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("You must be logged in to send messages")
            return
        }

        // Add user message immediately
        const userMessageId = uuidv4()
        const userMessage: Message = {
            id: userMessageId,
            role: "user",
            content: queryInput,
            avatar: "KC",
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMessage])
        setQueryInput("")

        try {
            // 1. If no conversation, create one
            let convId = conversationId
            if (!convId) {
                setLoadingConversation(true)
                convId = await createConversation(token)
                setConversationId(convId)

                // Update URL
                const params = new URLSearchParams(searchParams.toString())
                params.set("conversation_id", convId)
                router.replace(`${pathname}?${params.toString()}`)
            }

            // 2. Send question to appropriate endpoint based on active tab
            setLoadingQa(true)

            // Pass the lastDocId for document-based features
            const response = await sendMessage(
                activeTab,
                convId,
                userMessage.content,
                token,
                argumentType,
                // Only pass lastDocId for document-based features
                // @ts-ignore
                activeTab === "Summarize" || activeTab === "Draft" || activeTab === "Contract Review" ? lastDocId : undefined,
            )

            // 3. Add assistant response based on the endpoint response format
            let assistantContent = ""

            if (activeTab === "Chat" && response.answer) {
                assistantContent = response.answer
            } else if (activeTab === "Summarize" && response.summary) {
                assistantContent = response.summary
            } else if (activeTab === "Arguments" && response.arguments) {
                assistantContent = response.arguments
            } else if (activeTab === "Draft" && response.draft) {
                assistantContent = response.draft
            } else if (activeTab === "Contract Review" && response.review) {
                assistantContent = response.review
            } else {
                // Fallback for unexpected response format
                assistantContent =
                    response.answer ||
                    response.summary ||
                    response.arguments ||
                    response.draft ||
                    response.review ||
                    "No response content found"
            }

            const assistantMessage: Message = {
                id: uuidv4(),
                role: "assistant",
                content: assistantContent,
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, assistantMessage])
            setRemainingChars(2000) // Reset character count after sending
        } catch (err: any) {
            toast.error(`Error: ${err.message || "Unknown error occurred"}`)
            // Add error message
            setMessages((prev) => [
                ...prev,
                {
                    id: uuidv4(),
                    role: "assistant",
                    content: `I'm sorry, I encountered an error processing your request: ${err.message || "Unknown error"}. Please try again.`,
                    timestamp: new Date(),
                },
            ])
        } finally {
            setLoadingConversation(false)
            setLoadingQa(false)
        }
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("You must be logged in to upload files")
            return
        }

        try {
            setLoadingQa(true)

            // Create conversation if needed
            let convId = conversationId
            if (!convId) {
                setLoadingConversation(true)
                convId = await createConversation(token)
                setConversationId(convId)

                // Update URL
                const params = new URLSearchParams(searchParams.toString())
                params.set("conversation_id", convId)
                router.replace(`${pathname}?${params.toString()}`)
            }

            // Add user message about the file
            const userMessage: Message = {
                id: uuidv4(),
                role: "user",
                content: `I've uploaded a file: ${file.name}`,
                avatar: "KC",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, userMessage])

            // Upload the file
            const response = await uploadFile(file, convId, token)

            if (response.doc_id) {
                // Save the document ID
                setLastDocId(response.doc_id)
                setHasUploadedFile(true)
                setLastUploadedFile(file.name)

                // Add assistant acknowledgment message
                const assistantAckMessage: Message = {
                    id: uuidv4(),
                    role: "assistant",
                    content: `File uploaded successfully: ${file.name}`,
                    timestamp: new Date(),
                }
                setMessages((prev) => [...prev, assistantAckMessage])

                // If in Summarize tab, automatically request a summary
                if (activeTab === "Summarize") {
                    // Add user message requesting summary
                    const summaryRequestMessage: Message = {
                        id: uuidv4(),
                        role: "user",
                        content: `Please summarize this document.`,
                        avatar: "KC",
                        timestamp: new Date(),
                    }
                    setMessages((prev) => [...prev, summaryRequestMessage])

                    // Call the summarize endpoint with the document ID
                    try {
                        const summaryResponse = await sendMessage(
                            "Summarize",
                            convId,
                            "Please summarize this document",
                            token,
                            "both", // Default argument type
                            response.doc_id, // Pass the document ID
                        )

                        const summaryContent = summaryResponse.summary || "I couldn't generate a summary for this document."

                        const summaryMessage: Message = {
                            id: uuidv4(),
                            role: "assistant",
                            content: summaryContent,
                            timestamp: new Date(),
                        }

                        setMessages((prev) => [...prev, summaryMessage])
                    } catch (summaryErr: any) {
                        toast.error(`Error generating summary: ${summaryErr.message || "Unknown error"}`)

                        setMessages((prev) => [
                            ...prev,
                            {
                                id: uuidv4(),
                                role: "assistant",
                                content: `I'm sorry, I encountered an error generating the summary: ${summaryErr.message || "Unknown error"}. Please try again.`,
                                timestamp: new Date(),
                            },
                        ])
                    }
                }

                // If in Contract Review tab, automatically request a review
                if (activeTab === "Contract Review") {
                    // Add user message requesting contract review
                    const reviewRequestMessage: Message = {
                        id: uuidv4(),
                        role: "user",
                        content: `Please review this contract.`,
                        avatar: "KC",
                        timestamp: new Date(),
                    }
                    setMessages((prev) => [...prev, reviewRequestMessage])

                    // Call the contract review endpoint with the document ID
                    try {
                        const reviewResponse = await sendMessage(
                            "Contract Review",
                            convId,
                            "Please review this contract",
                            token,
                            "both", // Default argument type
                            response.doc_id, // Pass the document ID
                        )

                        const reviewContent = reviewResponse.review || "I couldn't generate a review for this contract."

                        const reviewMessage: Message = {
                            id: uuidv4(),
                            role: "assistant",
                            content: reviewContent,
                            timestamp: new Date(),
                        }

                        setMessages((prev) => [...prev, reviewMessage])
                    } catch (reviewErr: any) {
                        toast.error(`Error reviewing contract: ${reviewErr.message || "Unknown error"}`)

                        setMessages((prev) => [
                            ...prev,
                            {
                                id: uuidv4(),
                                role: "assistant",
                                content: `I'm sorry, I encountered an error reviewing the contract: ${reviewErr.message || "Unknown error"}. Please try again.`,
                                timestamp: new Date(),
                            },
                        ])
                    }
                }
            }
        } catch (err: any) {
            toast.error(`Error uploading file: ${err.message || "Unknown error"}`)
            setMessages((prev) => [
                ...prev,
                {
                    id: uuidv4(),
                    role: "assistant",
                    content: `I'm sorry, I encountered an error uploading the file: ${err.message || "Unknown error"}. Please try again.`,
                    timestamp: new Date(),
                },
            ])
        } finally {
            setLoadingQa(false)
            setLoadingConversation(false)
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQueryInput(value)
        setRemainingChars(2000 - value.length)
    }

    const startNewChat = () => {
        setConversationId(null)
        setMessages([
            {
                id: uuidv4(),
                role: "assistant",
                content:
                    "Hello! How can I assist you with your legal questions today? If you have a specific inquiry regarding Indian law or need information about a legal judgment, please let me know!",
                timestamp: new Date(),
            },
        ])
        setHasUploadedFile(true)
        setLastUploadedFile(null)
        setLastDocId(null) // Reset the document ID

        // Update URL to remove conversation_id
        const params = new URLSearchParams(searchParams.toString())
        params.delete("conversation_id")
        router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`)
    }

    const renderInputArea = () => {
        switch (activeTab) {
            case "Chat":
                return (
                    <div className="relative">
                        <input
                            type="text"
                            value={queryInput}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask anything"
                            className="w-full bg-gray-100 rounded-md px-4 py-3 pr-12 outline-none text-sm"
                            disabled={loadingConversation || loadingQa}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loadingConversation || loadingQa || !queryInput.trim()}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-[#5d3fd3] disabled:opacity-50 disabled:hover:text-gray-500"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                )
            case "Summarize":
                return (
                    <div className="p-4 bg-gray-100 rounded-md">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full bg-blue-500 text-white py-3 rounded-md flex items-center justify-center gap-2"
                        >
                            <Upload size={20} />
                            Click here to upload
                        </button>
                        <div className="flex justify-center mt-2 gap-2">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">DOC</span>
                            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">TXT</span>
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">PDF</span>
                        </div>
                        {lastUploadedFile && (
                            <div className="mt-3 text-xs text-gray-600 text-center">
                                Current file: {lastUploadedFile} {lastDocId && <span className="text-gray-400">(ID: {lastDocId})</span>}
                            </div>
                        )}
                    </div>
                )
            case "Arguments":
                return (
                    <div className="p-4 bg-gray-100 rounded-md">
                        <div className="flex gap-4 mb-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="argumentType"
                                    checked={argumentType === "for"}
                                    onChange={() => setArgumentType("for")}
                                    className="w-4 h-4 accent-green-500"
                                />
                                <span className={`text-sm ${argumentType === "for" ? "text-green-600 font-medium" : "text-gray-600"}`}>
                                    Argument For
                                </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="argumentType"
                                    checked={argumentType === "against"}
                                    onChange={() => setArgumentType("against")}
                                    className="w-4 h-4 accent-green-500"
                                />
                                <span
                                    className={`text-sm ${argumentType === "against" ? "text-green-600 font-medium" : "text-gray-600"}`}
                                >
                                    Argument Against
                                </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="argumentType"
                                    checked={argumentType === "both"}
                                    onChange={() => setArgumentType("both")}
                                    className="w-4 h-4 accent-green-500"
                                />
                                <span className={`text-sm ${argumentType === "both" ? "text-green-600 font-medium" : "text-gray-600"}`}>
                                    Both
                                </span>
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                value={queryInput}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Case details"
                                className="w-full bg-white rounded-md px-4 py-3 pr-12 outline-none text-sm border border-gray-200"
                            />
                            <button
                                onClick={handleSend}
                                disabled={loadingConversation || loadingQa || !queryInput.trim()}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-[#5d3fd3] disabled:opacity-50 disabled:hover:text-gray-500"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                )
            case "Draft":
                return (
                    <div className="p-4 bg-gray-100 rounded-md">
                        {lastDocId && (
                            <div className="mb-3 text-xs text-gray-600">
                                Using document: {lastUploadedFile} <span className="text-gray-400">(ID: {lastDocId})</span>
                            </div>
                        )}
                        <div className="relative">
                            <input
                                type="text"
                                value={queryInput}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Your draft requirements"
                                className="w-full bg-white rounded-md px-4 py-3 pr-12 outline-none text-sm border border-gray-200"
                            />
                            <button
                                onClick={handleSend}
                                disabled={loadingConversation || loadingQa || !queryInput.trim()}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-[#5d3fd3] disabled:opacity-50 disabled:hover:text-gray-500"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                )
            case "Contract Review":
                return (
                    <div className="p-4 bg-gray-100 rounded-md">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full bg-blue-500 text-white py-3 rounded-md flex items-center justify-center gap-2 mb-4"
                        >
                            <Upload size={20} />
                            Select contract file (DOC, TXT, PDF)
                        </button>
                        {lastUploadedFile && (
                            <div className="mb-3 text-xs text-gray-600 text-center">
                                Current file: {lastUploadedFile} {lastDocId && <span className="text-gray-400">(ID: {lastDocId})</span>}
                            </div>
                        )}
                        <div className="relative">
                            <input
                                type="text"
                                value={queryInput}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Your contract context"
                                className="w-full bg-white rounded-md px-4 py-3 pr-12 outline-none text-sm border border-gray-200"
                            />
                            <button
                                onClick={handleSend}
                                disabled={loadingConversation || loadingQa || !queryInput.trim()}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-[#5d3fd3] disabled:opacity-50 disabled:hover:text-gray-500"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <>
            {/* <Navbar /> */}
            {(loadingConversation || loadingQa) && (
                <div className="fixed top-0 left-0 w-full h-1 bg-[#5d3fd3] animate-pulse z-50" />
            )}
            <div className="flex min-h-screen bg-white">
                {sidebarOpen && (
                    <div className="w-[250px] sm:w-[300px] border-r border-gray-200 bg-gray-50/30 flex flex-col relative">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('/loginpageimage.png')", opacity: 0.3 }}
                        />
                        <div className="p-5 relative z-10">
                            <button
                                onClick={startNewChat}
                                className="flex items-center gap-2 border border-gray-400 bg-gray-100 hover:bg-gray-200 rounded-md w-full p-3 text-gray-600"
                            >
                                <Plus size={18} /> New Chat
                            </button>

                            {/* Recent conversations list */}
                            <div className="mt-4 space-y-2">
                                {recentConversations.map((conv) => (
                                    <button
                                        key={conv.conversation_id}
                                        onClick={() => {
                                            setConversationId(conv.conversation_id)
                                            const token = localStorage.getItem("token")
                                            if (token) {
                                                loadConversationHistory(conv.conversation_id, token)
                                            }
                                            // Update URL
                                            const params = new URLSearchParams(searchParams.toString())
                                            params.set("conversation_id", conv.conversation_id)
                                            router.replace(`${pathname}?${params.toString()}`)
                                        }}
                                        className={`w-full p-2 text-left text-sm rounded-md hover:bg-gray-200 ${conversationId === conv.conversation_id ? 'bg-gray-200' : ''
                                            }`}
                                    >
                                        <div className="truncate">{conv.message}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {new Date(conv.created_at).toLocaleDateString()}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-auto p-4 border-t border-gray-200 flex items-center justify-between relative z-10">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-[#5d3fd3] flex items-center justify-center text-white">
                                    KC
                                </div>
                                <span className="ml-3 font-semibold">User</span>
                            </div>
                            <button className="text-gray-400">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                        <div className="px-5 py-2 text-sm text-gray-500 flex gap-2 relative z-10">
                            <span className="cursor-pointer hover:underline">Terms</span>
                            <span>|</span>
                            <span className="cursor-pointer hover:underline">Privacy Policy</span>
                        </div>
                    </div>
                )}
                <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
                    <div className="absolute top-5 left-5 z-10">
                        <button onClick={toggleSidebar} className="p-2 border border-gray-200 rounded-md hover:bg-gray-100">
                            {sidebarOpen ? <PanelRightClose size={18} /> : <PanelLeft size={18} />}
                        </button>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-6 py-8">
                        <div className="flex flex-col items-center mb-4">
                            <Image
                                src={amicuslogo || "/placeholder.svg?height=80&width=200"}
                                alt="AMICUS Logo"
                                width={180}
                                height={70}
                            />
                        </div>
                        <p className="text-lg font-semibold mb-4 text-center">
                            Your GPT-Powered AI assistant with unmatched legal knowledge!
                        </p>
                        <div className="border border-gray-200 rounded-md w-full shadow-sm">
                            <div className="h-[300px] overflow-auto p-4" id="messages-container">
                                {messages.map((message, index) => (
                                    <div key={message.id} className="mb-4">
                                        {message.role === "user" ? (
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white text-sm">
                                                    {message.avatar || "KC"}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm">{message.content}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 flex-shrink-0">
                                                    <div className="w-full h-full border border-gray-300 rounded-md flex items-center justify-center">
                                                        <FileText size={16} className="text-gray-700" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 bg-gray-50 p-3 rounded-md">
                                                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {loadingQa && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 flex-shrink-0">
                                            <div className="w-full h-full border border-gray-300 rounded-md flex items-center justify-center">
                                                <FileText size={16} className="text-gray-700" />
                                            </div>
                                        </div>
                                        <div className="flex-1 bg-gray-50 p-3 rounded-md">
                                            <div className="flex space-x-2 justify-center items-center h-6">
                                                <div className="h-2 w-2 bg-[#5d3fd3] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="h-2 w-2 bg-[#5d3fd3] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="h-2 w-2 bg-[#5d3fd3] rounded-full animate-bounce"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="border-t border-gray-200">
                                {/* Tabs at the bottom */}
                                <div className="flex border-b border-gray-200 overflow-x-auto">
                                    <button
                                        onClick={() => handleTabClick("Chat")}
                                        className={`px-4 py-2 text-sm whitespace-nowrap flex items-center gap-2 ${activeTab === "Chat" ? "border-b-2 border-[#5d3fd3] font-medium" : "text-gray-600"}`}
                                    >
                                        <MessageSquare size={16} /> Chat
                                    </button>
                                    <button
                                        onClick={() => handleTabClick("Summarize")}
                                        className={`px-4 py-2 text-sm whitespace-nowrap flex items-center gap-2 ${activeTab === "Summarize" ? "border-b-2 border-[#5d3fd3] font-medium" : "text-gray-600"}`}
                                    >
                                        <FileIcon size={16} /> Summarize
                                    </button>
                                    <button
                                        onClick={() => handleTabClick("Arguments")}
                                        className={`px-4 py-2 text-sm whitespace-nowrap flex items-center gap-2 ${activeTab === "Arguments" ? "border-b-2 border-[#5d3fd3] font-medium" : "text-gray-600"}`}
                                    >
                                        <FileUp size={16} /> Arguments
                                        <span className="bg-green-500 text-white text-xs px-1 py-0.5 rounded">NEW</span>
                                    </button>
                                    <button
                                        onClick={() => handleTabClick("Draft")}
                                        className={`px-4 py-2 text-sm whitespace-nowrap flex items-center gap-2 ${activeTab === "Draft" ? "border-b-2 border-[#5d3fd3] font-medium" : "text-gray-600"}`}
                                    >
                                        <FilePenLine size={16} /> Draft
                                        <span className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded">BETA</span>
                                    </button>
                                    <button
                                        onClick={() => handleTabClick("Contract Review")}
                                        className={`px-4 py-2 text-sm whitespace-nowrap flex items-center gap-2 ${activeTab === "Contract Review" ? "border-b-2 border-[#5d3fd3] font-medium" : "text-gray-600"}`}
                                    >
                                        <FileSearch size={16} /> Contract Review
                                        <span className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded">BETA</span>
                                    </button>
                                </div>

                                {/* Input area based on active tab */}
                                <div className="px-4 py-3">{renderInputArea()}</div>

                                <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-600 flex justify-end">
                                    <div>Remaining characters: {remainingChars}</div>
                                </div>
                                <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-500">
                                    Please note that the information provided by AMICUS should not be considered as legal advice. AMICUS
                                    may occasionally include inaccuracies relating to cases, titles, or citation codes.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Copyright />

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.docx,.doc,.txt"
            />
        </>
    )
}

// Main page component with Suspense
export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AmicusClient />
        </Suspense>
    )
}
