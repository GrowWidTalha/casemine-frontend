"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createArticle } from '@/lib/api-service';

const DraftColumnsPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Get token after component mounts
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            router.push("/login");
            return;
        }
        setToken(storedToken);
    }, [router]);

    const handleSelectImage = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file.');
                return;
            }

            // Check if file is jpg, jpeg, png or gif
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                alert('Only jpg, jpeg, png or gif images are allowed.');
                return;
            }

            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageSrc(null);
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handlePublish = async () => {
        if (!title.trim()) {
            alert("Please enter a title");
            return;
        }

        if (!content.trim()) {
            alert("Please enter content");
            return;
        }

        if (!token) {
            router.push("/login");
            return;
        }

        try {
            setIsLoading(true);
            // Note: Image upload functionality would be handled here in a real implementation
            // For now, we're just saving the title and content
            await createArticle(title, content, token);

            alert("Column published successfully!");
            router.push("/columns");
        } catch (error) {
            console.error("Failed to publish column:", error);
            alert("Failed to publish column. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveDraft = async () => {
        if (!title.trim() && !content.trim()) {
            alert("Please enter a title or content to save as draft");
            return;
        }

        if (!token) {
            router.push("/login");
            return;
        }

        try {
            setIsLoading(true);
            // In a real app, we would have a separate endpoint for drafts
            // For now, we're using the same createArticle function
            await createArticle(title, content, token);

            alert("Draft saved successfully!");
            router.push("/columns");
        } catch (error) {
            console.error("Failed to save draft:", error);
            alert("Failed to save draft. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return null; // Return null while checking authentication
    }

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto bg-white p-4">
                {/* Publish/Save Draft Buttons */}
                <div className="flex justify-end mb-4 space-x-2">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handlePublish}
                        disabled={isLoading}
                    >
                        <span className="mr-1">↑</span> Publish
                    </Button>
                    <Button
                        variant="outline"
                        className="border-gray-300 text-gray-700"
                        onClick={handleSaveDraft}
                        disabled={isLoading}
                    >
                        <span className="mr-1">📄</span> Save Draft
                    </Button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    {/* Title Input */}
                    <Input
                        placeholder="Title*"
                        className="text-xl p-4 h-auto bg-gray-50"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* Content Textarea */}
                    <Textarea
                        placeholder="Content..."
                        className="min-h-[300px] p-4 bg-gray-50 resize-y"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {/* Image Upload */}
                    <div className="mt-6">
                        <div className={`border-2 border-dashed rounded-md p-6 text-center ${imageSrc ? 'border-blue-300' : 'border-orange-300'}`}>
                            {imageSrc ? (
                                <div className="flex justify-center">
                                    <img
                                        src={imageSrc}
                                        alt="Preview"
                                        className="max-h-64 max-w-full object-contain"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <p className="text-center font-medium mb-1">Upload Image (w:500px h:300px)</p>
                                    <p className="text-center text-sm text-gray-500">Only jpg, jpeg, png or gif images are allowed</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-2 flex space-x-2">
                            <Button
                                type="button"
                                variant="secondary"
                                className="bg-blue-200 hover:bg-blue-300 text-blue-700"
                                onClick={handleSelectImage}
                            >
                                Select image
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="text-gray-700"
                                onClick={handleRemoveImage}
                                disabled={!imageSrc}
                            >
                                Remove image
                            </Button>
                            <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/gif"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Copyright />
        </>
    );
};

export default DraftColumnsPage;
