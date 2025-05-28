"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';
import sc from "@/public/scpic.png";
import Link from 'next/link';

// Icons
import {
    ThumbsUp,
    ThumbsDown,
    MessageSquare,
    Bookmark,
    ChevronRight,
    ArrowUp
} from 'lucide-react';
import { getArticleById, getArticles } from '@/lib/api-service';

interface Article {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    image_path: string | null;
    image_url: string | null;
    user_id: string;
}

interface RelatedArticle {
    id: number;
    title: string;
    image_url: string | null;
}

const ColumnDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const columnId = params.columnId as string;
    const [article, setArticle] = useState<Article | null>(null);
    const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        // Fetch article details
        const fetchArticleDetails = async () => {
            try {
                setIsLoading(true);
                // This should be replaced with an actual API call to get specific column
                // For now using dummy data that matches the screenshot

                // Simulated API response delay
                await new Promise(resolve => setTimeout(resolve, 500));

                const article = await getArticleById(columnId, token);
                const relatedArticles = await getArticles(token);
                setArticle(article);

                // Mock related articles
                setRelatedArticles(relatedArticles.columns);

            } catch (error) {
                console.error("Error fetching column details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticleDetails();
    }, [columnId, router]);

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    if (isLoading) {
        return (
            <>
                <Navbar />
                <div className="max-w-7xl mx-auto bg-white min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
                <Footer />
                <Copyright />
            </>
        );
    }

    if (!article) {
        return (
            <>
                <Navbar />
                <div className="max-w-7xl mx-auto bg-white min-h-screen flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Article Not Found</h1>
                    <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => router.push('/columns')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Return to Columns
                    </button>
                </div>
                <Footer />
                <Copyright />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto bg-white flex flex-col lg:flex-row">
                {/* Main Content */}
                <div className="flex-1 px-4 py-6">
                    {/* Breadcrumb/Navigation Icons */}
                    <div className="flex items-center mb-4 text-gray-400">
                        <ArrowUp className="w-4 h-4 mr-2" />
                        <span className="mr-2">|</span>
                        <Bookmark className="w-4 h-4" />
                    </div>

                    {/* Article Title */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        {article.title}
                    </h1>

                    {/* Author Info */}
                    <div className="flex items-center mb-8 border-b pb-6">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                            DD
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <h2 className="text-indigo-600 font-semibold mr-1">Divyansh Dwivedi</h2>
                                <span className="text-gray-500 text-sm">
                                    {formatDate(article.created_at)}
                                </span>
                            </div>
                            <p className="text-gray-500 text-xs uppercase font-semibold">ASSOCIATE AT CASEMINE</p>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-8">
                        <Image
                            src={sc}
                            alt={article.title}
                            className="w-full h-auto rounded-md"
                        />
                    </div>

                    {/* Article Content */}
                    <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
                        {article.content.split('\n\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-4">{paragraph}</p>
                        ))}
                    </div>

                    {/* Author Info (Repeated at bottom) */}
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                            DD
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-indigo-600 font-semibold">Divyansh Dwivedi</h2>
                            <p className="text-gray-500 text-xs uppercase font-semibold">ASSOCIATE AT CASEMINE</p>
                        </div>
                    </div>

                    {/* Interaction Bar */}
                    <div className="flex items-center justify-between border py-2 px-4 rounded-md mb-8">
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center text-gray-500 hover:text-indigo-600">
                                <ThumbsUp className="w-4 h-4 mr-1" />
                                <span>Upvote | 0</span>
                            </button>
                            <button className="flex items-center text-gray-500 hover:text-indigo-600">
                                <ThumbsDown className="w-4 h-4 mr-1" />
                                <span>Downvote</span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center text-gray-500 hover:text-indigo-600">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                <span>Comments 0</span>
                            </button>
                            <span className="text-gray-500">Views 77</span>
                            <button className="flex items-center text-gray-500 hover:text-indigo-600">
                                <Bookmark className="w-4 h-4 mr-1" />
                                <span>Bookmark</span>
                            </button>
                            <div className="flex items-center space-x-2">
                                <Link href="#" className="text-gray-400 hover:text-indigo-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </Link>
                                <Link href="#" className="text-gray-400 hover:text-indigo-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </Link>
                                <Link href="#" className="text-gray-400 hover:text-indigo-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </Link>
                                <Link href="#" className="text-gray-400 hover:text-indigo-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 px-4 py-6 border-l">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Latest Columns</h2>

                    {/* Related Articles */}
                    <div className="space-y-6">
                        {relatedArticles.map((article) => (
                            <div key={article.id} className="flex gap-3">
                                <div className="w-24 h-20 relative overflow-hidden rounded-md flex-shrink-0">
                                    <Image
                                        src={article.image_url || sc}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-800">
                                        <Link href={`/columns/${article.id}`} className="hover:text-indigo-600">
                                            {article.title}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
            <Copyright />
        </>
    );
};

export default ColumnDetailsPage;
