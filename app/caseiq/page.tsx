// App.tsx
"use client";
import React, { useState } from 'react';
import { Plus, MoreHorizontal, Loader2, File } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';
import caseiq from '@/public/caseiq.png'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
function App() {
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('Upload Document');
    const [isUploading, setIsUploading] = useState(false)
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            alert('Please upload a PDF file.');
            setFile(null);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            alert('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('document', file);
        setIsUploading(true);

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            console.log('Response:', data);
            router.push(`/graphical_view?documentId=${data.document_id}`);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('File upload failed.');
        } finally {
            setIsUploading(false);
        }
    };


    const toggleFaq = (id: string) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const faqs = [
        {
            id: 'what-does',
            question: 'What does CaseIQ do?',
            answer: 'With CaseIQ, one can directly upload a legal document or relevant legal text and within no time our intelligence engine will retrieve all applicable statutes and case laws.'
        },
        {
            id: 'how-to-use',
            question: 'How should I use CaseIQ?',
            answer: 'CaseIQ is designed to be intuitive. Simply upload your legal document, paste text, or enter a URL. The AI will analyze the content and provide relevant legal information, cases, and statutes.'
        },
        {
            id: 'where-access',
            question: 'Where can I access CaseIQ on CaseMine ?',
            answer: 'CaseIQ is available directly on the CaseMine platform. Once logged in, you can find the CaseIQ tool in the main navigation menu or dashboard.'
        },
        {
            id: 'keywords',
            question: 'Can keywords be used in CaseIQ ?',
            answer: 'Yes, CaseIQ supports keyword searching. You can use specific legal terms or phrases to refine your search and get more targeted results from our database.'
        },
        {
            id: 'word-limit',
            question: 'Is there a minimum and maximum word limit for CaseIQ ?',
            answer: 'Yes, there are word limits to ensure optimal performance. The minimum is 50 words, and the maximum is 10,000 words per upload or text input.'
        },
        {
            id: 'file-types',
            question: 'What kinds of files can I upload to CaseIQ?',
            answer: 'CaseIQ supports various file formats including PDF, DOCX, DOC, and TXT files. The system can extract and analyze text from these document types.'
        },
        {
            id: 'how-works',
            question: 'How does CaseIQ work ?',
            answer: 'CaseIQ uses advanced AI and natural language processing to analyze legal documents, extract key information, and match it with relevant cases and statutes in our comprehensive database.'
        },
        {
            id: 'complex-docs',
            question: 'Legal documents contain many issues and/or exhibits/affidavits/ appendix. How would this influence my results ?',
            answer: 'CaseIQ is designed to handle complex legal documents with multiple issues and sections. Our AI identifies separate legal issues and provides relevant information for each, ensuring comprehensive analysis.'
        },
        {
            id: 'max-size',
            question: 'What is the Maximum Size of a file to be uploaded in CaseIQ ?',
            answer: 'The maximum file size for uploads is 20MB. This limit ensures efficient processing while accommodating most legal documents.'
        },
        {
            id: 'multiple-files',
            question: 'Can multiple files/text excerpts be uploaded in CaseIQ at the same time ?',
            answer: 'Currently, CaseIQ processes one file or text excerpt at a time for optimal analysis. For multiple documents, we recommend uploading them sequentially.'
        }
    ];

    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen bg-white">
                <div className="flex-1 flex flex-col md:flex-row gap-6 max-w-6xl mx-auto w-full px-6 py-6">
                    {/* Left Section - FAQs */}
                    <div className="w-full md:w-1/2">
                        <h1 className="text-2xl font-semibold mb-4">
                            <span className="text-indigo-600">CaseIQ</span> FAQs
                        </h1>

                        <div className="space-y-3">
                            {faqs.map((faq) => (
                                <div key={faq.id} className="overflow-hidden">
                                    <div
                                        className={`border rounded-md ${faq.id === 'what-does' && expandedFaq !== 'what-does'
                                            ? 'bg-amber-100 border-amber-200'
                                            : 'bg-gray-100 border-gray-200'
                                            }`}
                                    >
                                        <div
                                            className="flex justify-between items-center p-4 cursor-pointer"
                                            onClick={() => toggleFaq(faq.id)}
                                        >
                                            <h3 className="text-sm font-medium">{faq.question}</h3>
                                            <button className="text-red-500">
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        {(expandedFaq === faq.id || faq.id === 'what-does') && (
                                            <div className="p-4 bg-white border-t border-gray-200">
                                                <p className="text-sm">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Section - CaseIQ Info */}
                    <div className="w-full md:w-1/2 mt-6 md:mt-0">
                        <div className="flex justify-center mb-4">
                            <div className="text-center">
                                <Image src={caseiq} alt="CaseIQ Logo" className="mx-auto" />
                            </div>
                        </div>

                        <div className="text-center mb-6">
                            <p className="text-lg">Harness the power of Artificial Intelligence for your Case Research</p>
                        </div>

                        <div className="border border-gray-200 rounded-md">
                            <div className="flex border-b border-gray-200">
                                {['Upload Document', 'Add Text', 'Add Url'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => handleTabClick(tab)}
                                        className={`flex-1 py-2 text-sm ${activeTab === tab ? 'font-medium border-b-2 border-blue-500' : 'text-gray-500'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 relative">
                                {activeTab === 'Upload Document' && (
                                    <div className="space-y-4">
                                        <p className="text-sm mb-4">Use any legal document to retrieve judgments with similar facts and legal issues. You can upload:</p>
                                        <ol className="list-decimal pl-5 space-y-3 text-sm">
                                            <li><span className="font-medium">Pleadings</span> to find additional cases that make such pleadings more authoritative.</li>
                                            <li><span className="font-medium">Lower court judgments</span> to quickly find precedents with similar facts and legal issues.</li>
                                            <li><span className="font-medium">Legal articles/notes</span> to obtain a comprehensive set of relevant case law on your topic of research.</li>
                                            <li><span className="font-medium">Moot problems</span> to understand legal principles and statutes and find relevant authorities.</li>
                                        </ol>
                                        <div className="flex items-center space-x-4">
                                            <label
                                                className={`inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                            >
                                                <input
                                                    type="file"
                                                    accept="application/pdf"
                                                    onChange={handleFileChange}
                                                    disabled={isUploading}
                                                    className="hidden"
                                                />
                                                <span className="flex items-center space-x-2">
                                                    <File />
                                                    <span>Select PDF</span>
                                                </span>
                                            </label>

                                            {file && (
                                                <span className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M19 2H8a2 2 0 00-2 2v4H5a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V6a2 2 0 00-2-2zm-1 14H9v-2h9zm0-4H9v-2h9zm0-4H9V6h9z" />
                                                    </svg>
                                                    {file.name}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isUploading || !file}
                                            className={`w-full flex justify-center items-center space-x-2 bg-[#5d3fd3] text-white py-2 px-4 rounded-md transition ${isUploading || !file ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'}`}>
                                            {isUploading && <Loader2 className="animate-spin h-5 w-5" />}
                                            <span>{isUploading ? 'Uploading…' : 'Upload Document'}</span>
                                        </button>
                                    </div>
                                )}

                                {isUploading && (
                                    <div className="absolute inset-0 bg-white bg-opacity-75 flex flex-col items-center justify-center">
                                        <Loader2 className="animate-spin h-12 w-12 text-indigo-600" />
                                        <p className="mt-2 text-indigo-600 font-medium">Processing your document…</p>
                                    </div>
                                )}

                                {activeTab === 'Add Text' && (
                                    <div>
                                        <p className="text-sm mb-2">Copy and paste or type <span className="font-medium">textual excerpts</span> on a legal issue to obtain on-point cases.</p>
                                        <textarea className="w-full border p-2 rounded-md" rows={4} placeholder="Enter text..."></textarea>
                                        <button className="mt-3 bg-[#5d3fd3] text-white py-2 px-4 rounded-md">Get CaseIQ</button>
                                    </div>
                                )}

                                {activeTab === 'Add Url' && (
                                    <div>
                                        <p className="text-sm mb-2">Paste URLs of <span className="font-medium">legal articles, news, blogs, or case-law</span> to find relevant cases.</p>
                                        <input type="text" className="w-full border p-2 rounded-md" placeholder="Paste your URL here..." />
                                        <button className="mt-3 bg-[#5d3fd3] text-white py-2 px-4 rounded-md">Get CaseIQ</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto border-t border-gray-200 p-4">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-3 md:mb-0">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                                <span>AN</span>
                            </div>
                            <span className="ml-3 font-semibold">Guy Hawkins</span>
                            <button className="ml-2 text-gray-400">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>

                        <div className="text-sm text-gray-500 flex gap-4">
                            <span className="cursor-pointer hover:underline">Terms</span>
                            <span className="cursor-pointer hover:underline">Privacy Policy</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Copyright />
        </>
    );
}

export default App;
