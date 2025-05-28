"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { createCase, getCases, createFolder, getFolders, getDocuments } from "@/lib/api-service";

interface Folder {
    id: number;
    folder_name: string;
    created_at: string;
}

interface Case {
    id: number;
    case_name: string;
    client_name: string;
    created_at: string;
}

interface Document {
    id: number;
    document_name: string;
    file_type: string;
    file_size: number;
    created_at: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("RECENT CASES");
    const [isLoading, setIsLoading] = useState(true);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [cases, setCases] = useState<Case[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);

    // Dialog states
    const [isNewCaseDialogOpen, setIsNewCaseDialogOpen] = useState(false);
    const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
    const [newCaseData, setNewCaseData] = useState({ case_name: '', client_name: '' });
    const [newFolderName, setNewFolderName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login?redirect=/dashboard");
            return;
        }

        loadData(token);
    }, [router]);

    const loadData = async (token: string) => {
        try {
            setIsLoading(true);
            const [foldersRes, casesRes] = await Promise.all([
                getFolders(token),
                getCases(token)
            ]);
            setFolders(foldersRes.folders);
            setCases(casesRes.cases);
            setIsLoading(false);
        } catch (error: any) {
            toast.error(error.message || 'Failed to load data');
            setIsLoading(false);
        }
    };

    const handleCreateCase = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        try {
            await createCase(newCaseData.case_name, newCaseData.client_name, token);
            toast.success('Case created successfully');
            setIsNewCaseDialogOpen(false);
            setNewCaseData({ case_name: '', client_name: '' });
            loadData(token);
        } catch (error: any) {
            toast.error(error.message || 'Failed to create case');
        }
    };

    const handleCreateFolder = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        try {
            await createFolder(newFolderName, token);
            toast.success('Folder created successfully');
            setIsNewFolderDialogOpen(false);
            setNewFolderName('');
            loadData(token);
        } catch (error: any) {
            toast.error(error.message || 'Failed to create folder');
        }
    };

    const handleAskQuestions = () => {
        router.push("/amicus");
    };

    const handleUploadDocument = () => {
        router.push("/caseiq");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
                {/* Main Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                        <div className="mb-4">
                            <Image
                                src="/amicus 1.png"
                                alt="Amicus Logo"
                                width={150}
                                height={150}
                                priority
                            />
                        </div>
                        <Button
                            onClick={handleAskQuestions}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                            Ask Questions
                        </Button>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                        <div className="mb-4">
                            <Image
                                src="/caseiq-logo 1.png"
                                alt="CaseIQ Logo"
                                width={150}
                                height={150}
                                priority
                            />
                        </div>
                        <Button
                            onClick={handleUploadDocument}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                            Upload a document
                        </Button>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[...cases, ...folders]
                            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                            .slice(0, 5)
                            .map((item) => (
                                <div
                                    key={'case_name' in item ? `case-${item.id}` : `folder-${item.id}`}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                    onClick={() => router.push(`${'case_name' in item ? `/dashboard/case/${item.id}` : `/dashboard/folder/${item.id}`}`)}
                                >
                                    <div>
                                        <h3 className="font-medium">
                                            {'case_name' in item ? item.case_name : item.folder_name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {'case_name' in item ? `Case • ${item.client_name}` : 'Folder'}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-2">Total Cases</h3>
                        <p className="text-3xl font-bold text-indigo-600">{cases.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-2">Total Folders</h3>
                        <p className="text-3xl font-bold text-indigo-600">{folders.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-2">Total Items</h3>
                        <p className="text-3xl font-bold text-indigo-600">{cases.length + folders.length}</p>
                    </div>
                </div>
            </div>

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
                        <Button variant="outline" onClick={() => setIsNewCaseDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateCase}>Create Case</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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
                        <Button variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateFolder}>Create Folder</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
