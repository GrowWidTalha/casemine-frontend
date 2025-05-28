"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';
import { BACKEND_URL } from '@/lib/api-service';

interface Attorney {
    user_id: number;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    city: string;
    country: string;
    total_experience: number;
    practice_areas: string[];
    practice_courts: string[];
}

const AttorneySearchPage = () => {
    const [searchMethod, setSearchMethod] = useState<'text' | 'document'>('text');
    const [searchText, setSearchText] = useState('');
    const [selectedCourt, setSelectedCourt] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<Attorney[]>([]);

    const courts = [
        'Supreme Court Of India',
        'Privy Council',
        'Allahabad High Court',
        'Andhra Pradesh High Court',
        'Bombay High Court',
        'Calcutta High Court',
        'Chhattisgarh High Court',
        'Delhi High Court',
        'Gauhati High Court',
        'Gujarat High Court',
        'Himachal Pradesh High Court',
        'Jammu and Kashmir High Court',
        'Jharkhand High Court',
        'Karnataka High Court',
        'Kerala High Court',
        'Madhya Pradesh High Court',
        'Madras High Court',
        'Manipur High Court',
        'Meghalaya High Court',
        // Add more courts as needed
    ];

    const handleSearch = async () => {
        setIsLoading(true);

        try {
            if (searchMethod === 'text') {
                const response = await fetch(BACKEND_URL + '/api/attorney/search/text', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: searchText,
                        court_name: selectedCourt,
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    setSearchResults(data.attorneys);
                } else {
                    console.error('Search error:', data.error);
                }
            } else {
                if (!selectedFile) return;

                const formData = new FormData();
                formData.append('document', selectedFile);
                formData.append('court_name', selectedCourt);

                const response = await fetch(BACKEND_URL + '/api/attorney/search/document', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (response.ok) {
                    setSearchResults(data.attorneys);
                } else {
                    console.error('Search error:', data.error);
                }
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Find an Attorney</h1>

                {/* Search Method Toggle */}
                <div className="mb-6">
                    <div className="flex space-x-4">
                        <Button
                            onClick={() => setSearchMethod('text')}
                            className={`${searchMethod === 'text'
                                ? 'bg-[#5D3FD3] text-white'
                                : 'bg-white text-gray-700'
                                }`}
                        >
                            Search by Text
                        </Button>
                        <Button
                            onClick={() => setSearchMethod('document')}
                            className={`${searchMethod === 'document'
                                ? 'bg-[#5D3FD3] text-white'
                                : 'bg-white text-gray-700'
                                }`}
                        >
                            Upload Document
                        </Button>
                    </div>
                </div>

                {/* Search Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="space-y-4">
                        {searchMethod === 'text' ? (
                            <Textarea
                                placeholder="Enter your legal query or issue..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="h-32"
                            />
                        ) : (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                    accept=".pdf,.doc,.docx,.txt"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer flex flex-col items-center justify-center"
                                >
                                    <div className="text-[#5D3FD3] mb-2">
                                        <svg
                                            className="w-12 h-12"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-gray-600">
                                        {selectedFile
                                            ? selectedFile.name
                                            : 'Click to upload or drag and drop'}
                                    </div>
                                    <div className="text-gray-500 text-sm mt-1">
                                        Supported formats: PDF, DOC, DOCX, TXT
                                    </div>
                                </label>
                            </div>
                        )}

                        <select
                            value={selectedCourt}
                            onChange={(e) => setSelectedCourt(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Court</option>
                            {courts.map((court) => (
                                <option key={court} value={court}>
                                    {court}
                                </option>
                            ))}
                        </select>

                        <Button
                            onClick={handleSearch}
                            disabled={isLoading || !selectedCourt || (searchMethod === 'document' && !selectedFile)}
                            className="w-full bg-[#5D3FD3] text-white"
                        >
                            {isLoading ? 'Searching...' : 'Search Attorneys'}
                        </Button>
                    </div>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                        {searchResults.map((attorney) => (
                            <div
                                key={attorney.user_id}
                                className="bg-white p-6 rounded-lg shadow-md"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {attorney.first_name} {attorney.last_name}
                                        </h3>
                                        <p className="text-gray-600">{attorney.job_title}</p>
                                        <p className="text-gray-600">{attorney.organization}</p>
                                        <p className="text-sm text-gray-500">
                                            {attorney.city}, {attorney.country}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Experience: {attorney.total_experience} years
                                        </p>
                                    </div>
                                    <Button
                                        onClick={() => window.location.href = `/attorney/profile/${attorney.user_id}`}
                                        className="bg-[#5D3FD3] text-white"
                                    >
                                        View Profile
                                    </Button>
                                </div>

                                <div className="mt-4">
                                    <h4 className="font-medium mb-2">Practice Areas</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {attorney.practice_areas.map((area, index) => (
                                            <span
                                                key={index}
                                                className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
                                            >
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h4 className="font-medium mb-2">Courts of Practice</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {attorney.practice_courts.map((court, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                                            >
                                                {court}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {searchResults.length === 0 && !isLoading && (
                    <div className="text-center text-gray-600 mt-8">
                        No results found. Try adjusting your search criteria.
                    </div>
                )}
            </div>
            <Footer />
            <Copyright />
        </>
    );
};

export default AttorneySearchPage;
