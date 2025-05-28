"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronRight, ChevronLeft, X } from "lucide-react";
import sc from "@/public/scpic.png";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import { getArticles } from "@/lib/api-service";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

interface PaginationData {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
}

interface ArticlesResponse {
    columns: Article[];
    pagination: PaginationData;
}

const ColumnsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        per_page: 10,
        total: 0,
        total_pages: 1
    });
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Get token after component mounts
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);

        if (!storedToken) {
            router.push("/login");
            return;
        }

        const fetchArticles = async () => {
            try {
                setIsLoading(true);
                const response = await getArticles(storedToken) as ArticlesResponse;
                console.log(response);
                setArticles(response.columns);
                setPagination(response.pagination);
                setCurrentPage(response.pagination.page);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [router]);

    // Format date from ISO string to readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!token) {
        return null; // Return null while checking authentication
    }

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

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto bg-white">
                {/* Header */}
                <header className="py-6 px-4 border-b">
                    <div className="flex flex-col  justify-between items-start md:items-center gap-4  ">
                        <div>
                            <h1 className="text-2xl font-bold text-indigo-600">
                                NYAYNIDHI Legal Insights & Commentary
                            </h1>
                            <p className="text-sm text-gray-600">
                                Stay informed with expert legal analysis, case law insights, and
                                the latest updates to enhance your legal research.
                            </p>
                        </div>

                        {isVisible && (
                            <div className=" flex justify-end  w-full">
                                <div className="relative border border-purple-500 rounded-lg p-4 max-w-sm bg-white shadow-lg">
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="absolute top-2 right-2 text-purple-500 hover:text-purple-700"
                                    >
                                        <X size={16} />
                                    </button>
                                    <p className="text-gray-800 font-medium">Want to write one?</p>
                                    <p className="text-gray-700">
                                        Create your <span className="font-bold">NYATNIDHI</span>{" "}
                                        lawyer profile to publish your column here.
                                    </p>
                                    <Link href={"/columns/draft"}>
                                        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 float-right">
                                            Create Now!
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Article Grid */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <Card key={article.id} className="border-0 shadow-none">
                            <Link href={`/columns/${article.id}`}>
                                <CardContent className="p-0">
                                    <Image
                                        src={article.image_url || sc}
                                        alt={article.title}
                                        className="w-full object-cover"
                                    />
                                    <div className="px-4 py-2">
                                        <div className="text-gray-500 text-xs flex items-center gap-1 mb-1">
                                            <Calendar size={12} />
                                            <span>{formatDate(article.created_at)}</span>
                                        </div>
                                        <h3 className="font-semibold text-sm mb-2 flex items-start">
                                            <span>{article.title}</span>
                                            <ChevronRight
                                                size={16}
                                                className="text-indigo-600 mt-0.5 ml-1 flex-shrink-0"
                                            />
                                        </h3>
                                        <p className="text-xs text-gray-500">{article.content}</p>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center space-x-1 p-6">
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0 rounded-md"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    >
                        <ChevronLeft size={16} />
                    </Button>

                    {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            className={`w-8 h-8 p-0 rounded-md ${currentPage === page ? "bg-indigo-600" : ""}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0 rounded-md"
                        disabled={currentPage === pagination.total_pages}
                        onClick={() => setCurrentPage(Math.min(pagination.total_pages, currentPage + 1))}
                    >
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
            <Footer />
            <Copyright />
        </>
    );
};

export default ColumnsPage;
