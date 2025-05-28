"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Folder, FolderOpen } from "lucide-react"
import { createCase, createFolder, getFolders, getCases } from "@/lib/api-service"

interface FolderType {
    id: number
    folder_name: string
}

interface CaseType {
    id: number
    case_name: string
    client_name: string
}

interface UserProfile {
    first_name: string
    last_name: string
    profile_image_url: string | null
}

export default function Sidebar() {
    const router = useRouter()
    const [folders, setFolders] = useState<FolderType[]>([])
    const [cases, setCases] = useState<CaseType[]>([])
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
    const [isNewCaseDialogOpen, setIsNewCaseDialogOpen] = useState(false)
    const [newFolderName, setNewFolderName] = useState("")
    const [newCaseData, setNewCaseData] = useState({ case_name: "", client_name: "" })
    const [activeFolder, setActiveFolder] = useState<number | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/login")
            return
        }
        loadData(token)
    }, [router])

    const loadData = async (token: string) => {
        try {
            const [foldersRes, casesRes] = await Promise.all([getFolders(token), getCases(token)])
            setFolders(
                foldersRes.folders || [
                    { id: 1, folder_name: "General" },
                    { id: 2, folder_name: "test folder" },
                ],
            )
            setCases(casesRes.cases || [])
        } catch (error: any) {
            // Fallback to demo data if API fails
            setFolders([
                { id: 1, folder_name: "General" },
                { id: 2, folder_name: "test folder" },
            ])
            toast.error(error.message || "Failed to load data")
        }
    }

    const handleCreateFolder = async () => {
        const token = localStorage.getItem("token")
        if (!token) return

        try {
            await createFolder(newFolderName, token)
            toast.success("Folder created successfully")
            setIsNewFolderDialogOpen(false)
            setNewFolderName("")
            loadData(token)
        } catch (error: any) {
            toast.error(error.message || "Failed to create folder")
        }
    }

    const handleCreateCase = async () => {
        const token = localStorage.getItem("token")
        if (!token) return

        try {
            await createCase(newCaseData.case_name, newCaseData.client_name, token)
            toast.success("Case created successfully")
            setIsNewCaseDialogOpen(false)
            setNewCaseData({ case_name: "", client_name: "" })
            loadData(token)
        } catch (error: any) {
            toast.error(error.message || "Failed to create case")
        }
    }

    const handleFolderClick = (folderId: number) => {
        setActiveFolder(folderId)
        router.push(`/dashboard/folder/${folderId}`)
    }

    return (
        <aside className="w-64 bg-white h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-base font-medium">My Folders</h2>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-sm" onClick={() => setIsNewFolderDialogOpen(true)}>
                        New Folder
                    </Button>
                </div>
            </div>

            <div className="py-2">
                {folders.map((folder) => (
                    <div
                        key={folder.id}
                        className={`flex items-center px-4 py-2 text-sm cursor-pointer ${activeFolder === folder.id ? "bg-gray-100" : "hover:bg-gray-50"
                            }`}
                        onClick={() => handleFolderClick(folder.id)}
                    >
                        <span className="mr-2 text-yellow-500">
                            {activeFolder === folder.id ? <FolderOpen size={18} /> : <Folder size={18} />}
                        </span>
                        <span className="truncate">{folder.folder_name}</span>
                    </div>
                ))}
            </div>

            {/* Cases Section */}
            <div className="flex items-center justify-between p-4 border-y border-gray-200">
                <h2 className="text-base font-medium">My Cases</h2>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-sm" onClick={() => setIsNewCaseDialogOpen(true)}>
                        New Case
                    </Button>
                </div>
            </div>

            <div className="py-2">
                {cases.map((case_item) => (
                    <div
                        key={case_item.id}
                        className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-50"
                        onClick={() => router.push(`/dashboard/case/${case_item.id}`)}
                    >
                        <span className="mr-2 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 19H2c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h20c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2z" />
                                <path d="M2 7l10 7 10-7" />
                            </svg>
                        </span>
                        <div className="flex flex-col">
                            <span className="font-medium truncate">{case_item.case_name}</span>
                            <span className="text-xs text-gray-500 truncate">{case_item.client_name}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* New Folder Dialog */}
            <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Folder</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Folder Name</label>
                            <Input
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                placeholder="Enter folder name"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateFolder}>Create Folder</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* New Case Dialog */}
            <Dialog open={isNewCaseDialogOpen} onOpenChange={setIsNewCaseDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Case</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Case Name</label>
                            <Input
                                value={newCaseData.case_name}
                                onChange={(e) => setNewCaseData(prev => ({ ...prev, case_name: e.target.value }))}
                                placeholder="Enter case name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Client Name</label>
                            <Input
                                value={newCaseData.client_name}
                                onChange={(e) => setNewCaseData(prev => ({ ...prev, client_name: e.target.value }))}
                                placeholder="Enter client name"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewCaseDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateCase}>Create Case</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </aside>
    )
}
