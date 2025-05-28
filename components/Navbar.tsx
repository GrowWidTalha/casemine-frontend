"use client"

import { ArrowBigDown, ChevronDown, Menu, Search, X, MessageSquare, Settings, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import logo from '@/public/logo.png'
import Image from "next/image"
import { usePathname } from "next/navigation";
import { logoutUser } from "@/lib/api-service"
import { toast } from "sonner"

export function Navbar() {
    const router = useRouter()
    const pathname = usePathname();
    const [searchFilter, setSearchFilter] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [unreadMessages, setUnreadMessages] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsLoggedIn(!!token)
        // TODO: Fetch unread messages count
        setUnreadMessages(2) // Example count
    }, [])

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await logoutUser(token)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                setIsLoggedIn(false)
                toast.success('Successfully logged out')
                router.push('/')
            }
        } catch (error) {
            console.error('Logout error:', error)
            // Still remove token from localStorage even if API call fails
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            setIsLoggedIn(false)
            router.push('/')
        }
    }

    const handleSearch = (e: FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    const renderAuthButtons = () => {
        if (isLoggedIn) {
            return (
                <div className="flex items-center space-x-4">
                    {/* Messages Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <MessageSquare className="h-5 w-5 text-white" />
                                {unreadMessages > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                                        {unreadMessages}
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem onClick={() => router.push('/messages')}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                <span>View Messages</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push('/messages/new')}>
                                <span>New Message</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center space-x-2 text-white hover:text-yellow-400">
                                <User className="h-5 w-5" />
                                <span>Profile</span>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem onClick={() => router.push('/profile')}>
                                <User className="mr-2 h-4 w-4" />
                                <span>My Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/attorney/profile')}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Attorney Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/settings')}>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
        return (
            <>
                <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                        router.push('/login')
                    }}
                    className="rounded bg-[#5d3fd3] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#6c5ce7]/90 sm:px-6 sm:py-0.5 sm:text-xs hover:cursor-pointer"
                >
                    Login
                </Button>
                <Button
                    size="sm"
                    onClick={() => {
                        router.push('/signup')
                    }}
                    className="rounded bg-[#5d3fd3] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#6c5ce7]/90 sm:px-6 sm:py-0.5 sm:text-xs"
                >
                    Signup
                </Button>
            </>
        )
    }

    const renderMobileAuthButtons = () => {
        if (isLoggedIn) {
            return (
                <>
                    <div className="space-y-2">
                        <Link
                            href="/messages"
                            className="flex items-center py-2 text-lg font-medium text-white hover:text-white/90"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <MessageSquare className="mr-2 h-5 w-5" />
                            Messages
                            {unreadMessages > 0 && (
                                <span className="ml-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                                    {unreadMessages}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="/profile"
                            className="flex items-center py-2 text-lg font-medium text-white hover:text-white/90"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <User className="mr-2 h-5 w-5" />
                            My Profile
                        </Link>
                        <Link
                            href="/attorney/profile"
                            className="flex items-center py-2 text-lg font-medium text-white hover:text-white/90"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <User className="mr-2 h-5 w-5" />
                            Attorney Profile
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center py-2 text-lg font-medium text-white hover:text-white/90"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Settings className="mr-2 h-5 w-5" />
                            Settings
                        </Link>
                    </div>
                    <Button
                        className="w-full rounded bg-[#5d3fd3] px-6 py-2 text-xs font-medium text-white hover:bg-[#6c5ce7]/90"
                        onClick={() => {
                            setMobileMenuOpen(false)
                            handleLogout()
                        }}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </>
            )
        }
        return (
            <>
                <Button
                    className="w-full rounded bg-[#5d3fd3] px-6 py-2 text-xs font-medium text-white hover:bg-[#6c5ce7]/90"
                    onClick={() => {
                        setMobileMenuOpen(false)
                        router.push('/login')
                    }}
                >
                    Login
                </Button>
                <Button
                    className="w-full rounded bg-[#5d3fd3] px-6 py-2 text-xs font-medium text-white hover:bg-[#6c5ce7]/90"
                    onClick={() => {
                        setMobileMenuOpen(false)
                        router.push('/signup')
                    }}
                >
                    Signup
                </Button>
            </>
        )
    }

    return (
        <nav className="w-full bg-[#121e33] z-[999]">
            {/* Desktop Navbar */}
            <div className="mx-auto flex h-[80px] w-full  max-w-[1160px] items-center justify-between px-4 lg:px-6 lg:py-[62px]">
                {/* Logo */}
                <Image
                    onClick={() => { router.push('/') }}
                    src={logo} alt="" className="w-[100px] sm:w-[150px] lg:w-[174px] hover:cursor-pointer" />

                {/* Search Bar - Hidden on mobile, visible on medium screens and up */}
                <form onSubmit={handleSearch} className="hidden lg:relative lg:mx-4 lg:flex lg:w-full lg:max-w-md lg:items-center bg-white rounded-md p-0.5">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search className="h-4 w-4" />
                    </div>
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter keywords or case title"
                        className="h-10 rounded-l-md border-0 bg-white pl-10 text-sm focus-visible:ring-0 shadow-none"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-10 rounded-l-none rounded-r-md border-0 bg-[#f2fffb] px-4 text-sm hover:cursor-pointer text-[#5d3fd3] font-medium"
                            >
                                {searchFilter}
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSearchFilter("All")}>All</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSearchFilter("Cases")}>Cases</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSearchFilter("Documents")}>Documents</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </form>

                {/* Navigation Links - Hidden on mobile */}
                <div className="hidden lg:flex lg:items-center lg:space-x-4">
                    <Link href="/citation_search" className={`text-sm font-medium ${pathname === "/citation_search" ? "text-yellow-500" : "text-white"} hover:text-yellow-400`}>
                        Citation Search
                    </Link>
                    <Link href="/caseiq" className={`text-sm font-medium ${pathname === "/caseiq" ? "text-yellow-500" : "text-white"} hover:text-yellow-400`}>
                        CaseIQ
                    </Link>
                    <Link href="/amicus" className={`text-sm font-medium ${pathname === "/amicus" ? "text-yellow-500" : "text-white"} hover:text-yellow-400`}>
                        AMICUS
                    </Link>
                    <Link href="/columns" className={`text-sm font-medium ${pathname === "/legal_insights" ? "text-yellow-500" : "text-white"} hover:text-yellow-400`}>
                        Columns
                    </Link>
                    <Link href="/cases_list/supreme_court" className={`text-sm font-medium ${pathname === "/cases_list/supreme_court" ? "text-yellow-500" : "text-white"} hover:text-yellow-400`}>
                        Supreme Court
                    </Link>
                    <Link href="/cases_list/high_court" className={`text-sm font-medium ${pathname === "/cases_list/high_court" ? "text-yellow-500" : "text-white"} hover:text-yellow-400`}>
                        High Courts
                    </Link>
                    {renderAuthButtons()}
                </div>

                {/* Mobile Menu Button - Visible only on mobile */}
                <div className="flex items-center space-x-2 lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="space-y-4 px-4 pb-4 pt-2">
                        <form onSubmit={handleSearch} className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search className="h-4 w-4" />
                            </div>
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Enter keywords or case title"
                                className="h-10 w-full rounded-md border-0 bg-white pl-10 text-sm focus-visible:ring-0"
                            />
                        </form>
                        <Link
                            href="/citation_search"
                            className="block py-2 text-lg font-medium text-white hover:text-white/90"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Citation Search
                        </Link>
                        <Link
                            href="/caseiq"
                            className="block py-2 text-lg font-medium text-white hover:text-white/90"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            CaseIQ
                        </Link>
                        <Link
                            href="/amicus"
                            className="block py-2 text-lg font-medium text-white hover:text-white/90"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            AMICUS
                        </Link>
                        <Link
                            href="/columns"
                            className="block py-2 text-lg font-medium text-white hover:text-white/90"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Columns
                        </Link>
                        <Link
                            href="/cases_list/supreme_court"
                            className="block py-2 text-lg font-medium text-white hover:text-white/90"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Supreme Court
                        </Link>
                        <Link
                            href="/cases_list/high_court"
                            className="block py-2 text-lg font-medium text-white hover:text-white/90"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            High Courts
                        </Link>
                        {renderMobileAuthButtons()}
                    </div>
                </div>
            )}
        </nav>
    )
}
