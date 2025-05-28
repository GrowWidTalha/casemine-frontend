"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SecondarySidebar from "@/components/SecondarySidebar";
import { getFolders, uploadDocument, getDocuments, deleteFolder } from "@/lib/api-service";

interface Document {
    id: number;
    document_name: string;
    file_type: string;
    file_size: number;
    created_at: string;
}

interface Folder {
    id: number;
    folder_name: string;
    created_at: string;
}

export default function FolderPage({ params }: { params: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [folder, setFolder] = useState<Folder | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login?redirect=/dashboard/folder/" + params.id);
            return;
        }

        loadData(token);
    }, [router, params.id]);

    const loadData = async (token: string) => {
        try {
            setIsLoading(true);
            const [foldersResponse, documentsResponse] = await Promise.all([
                getFolders(token),
                getDocuments('folder', parseInt(params.id), token)
            ]);

            const currentFolder = foldersResponse.folders.find(
                (f: Folder) => f.id === parseInt(params.id)
            );

            if (!currentFolder) {
                toast.error('Folder not found');
                router.push('/dashboard');
                return;
            }

            setFolder(currentFolder);
            setDocuments(documentsResponse.documents);
            setIsLoading(false);
        } catch (error: any) {
            toast.error(error.message || 'Failed to load folder data');
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const file = event.target.files?.[0];
        if (!file) return;

        try {
            await uploadDocument(file, 'folder', parseInt(params.id), token);
            toast.success('Document uploaded successfully');
            loadData(token);
        } catch (error: any) {
            toast.error(error.message || 'Failed to upload document');
        }
    };

    const handleDeleteFolder = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await deleteFolder(parseInt(params.id), token);
            toast.success('Folder deleted successfully');
            router.push('/dashboard');
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete folder');
        }
    };

    if (isLoading || !folder) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading folder details...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <SecondarySidebar
                type="folder"
                name={folder.folder_name}
                actions={[
                    {
                        label: 'Delete Folder',
                        icon: '🗑️',
                        onClick: handleDeleteFolder
                    }
                ]}
            />
            <div className="bg-gray-50 p-6 mt-[120px]">
                <div className="max-w-7xl mx-auto">
                    {/* Documents Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Documents</h2>
                            <div>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                                <label htmlFor="file-upload">
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer"
                                        onClick={() => document.getElementById('file-upload')?.click()}
                                    >
                                        Upload Document
                                    </Button>
                                </label>
                            </div>
                        </div>

                        {documents.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No documents uploaded yet
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {documents.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                    >
                                        <div>
                                            <h3 className="font-medium">{doc.document_name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {doc.file_type.toUpperCase()} • {(doc.file_size / 1024).toFixed(2)} KB
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Uploaded: {new Date(doc.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            View
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
