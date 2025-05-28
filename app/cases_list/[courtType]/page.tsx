"use client"
import React, { useEffect, useState } from "react";
import dummyimg from "@/public/building img.png";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import { getCasesList } from "@/lib/api-service";
import { useParams } from "next/navigation";

const CourtOfAppeals: React.FC = () => {
    const [activeTab, setActiveTab] = useState("commentaries");
    const [casesList, setCasesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { courtType } = useParams();

    if (!courtType) {
        return <div>Court type not found</div>;
    }

    useEffect(() => {
        const fetchCasesList = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found");
                }
                const casesList = await getCasesList(courtType === "supreme_court" ? "supreme-court" : "high-court", token);
                console.log(casesList);
                setCasesList(casesList);
            } catch (error: any) {
                console.error("Cases List Fetch Error:", error);
                setError(error.message || "Failed to fetch cases list. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCasesList();
    }, []);

    // Loading state component
    if (isLoading) {
        return (
            <>
                <Navbar />
                <div className="max-w-4xl mx-auto p-4 min-h-[50vh] flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-indigo-600 font-medium">Loading case commentaries...</p>
                </div>
                <Footer />
                <Copyright />
            </>
        );
    }

    // Error state
    if (error) {
        return (
            <>
                <Navbar />
                <div className="max-w-4xl mx-auto p-4 min-h-[50vh] flex flex-col items-center justify-center">
                    <div className="text-red-500 mb-4 text-5xl">⚠️</div>
                    <h3 className="text-xl font-medium text-red-500 mb-2">Error Loading Data</h3>
                    <p className="text-gray-600">{error}</p>
                </div>
                <Footer />
                <Copyright />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="max-w-4xl mx-auto p-4">
                {/* Header */}
                <header className="text-center mb-6">
                    <h1 className="text-2xl font-normal">
                        <span className="text-indigo-600">Court</span> of Appeals for the
                        D.C. Circuit
                    </h1>
                    <h2 className="text-xl text-indigo-600">Case Commentaries</h2>
                </header>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-4">
                    <div className="flex">
                        <button
                            className={`py-2 px-4 border border-gray-300 border-b-0 rounded-t text-sm font-normal ${activeTab === "commentaries" ? "bg-gray-100" : "bg-white"
                                }`}
                            onClick={() => setActiveTab("commentaries")}
                        >
                            Commentaries
                        </button>
                    </div>
                </div>

                {/* Content area */}
                <div className="border border-gray-300 p-4">
                    {activeTab === "commentaries" &&
                        // @ts-ignore
                        casesList?.data?.map((commentary: any, index: any) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded mb-4 p-4"
                            >
                                <div className="flex flex-wrap">
                                    {/* Image */}
                                    <div className="w-20 h-20 mr-4">
                                        <Image
                                            src={dummyimg}
                                            alt="Court building"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        {/* Title with link */}
                                        <h3 className="text-indigo-600 font-normal mb-1">
                                            <a href="#" className="hover:underline">
                                                {commentary?.name}
                                            </a>
                                        </h3>

                                        {/* Author and date */}
                                        <p className="text-sm text-gray-800 font-medium mb-1">
                                            {commentary?.year}
                                        </p>

                                        {/* Description */}
                                        <p className="text-sm text-gray-700">
                                            {commentary?.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <Footer />
            <Copyright />
        </>
    );
};

export default CourtOfAppeals;
