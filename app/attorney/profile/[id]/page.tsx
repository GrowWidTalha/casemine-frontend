"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';

interface ProfessionalExperience {
    job_title: string;
    company_name: string;
    from_year: number;
    to_year: number | null;
}

interface AttorneyProfile {
    id: number;
    first_name: string;
    last_name: string;
    organization: string;
    job_title: string;
    total_experience: number;
    consultation_fees: number;
    city: string;
    country: string;
    bio_graph: string;
    website: string;
    email: string | null;
    mobile_number: string | null;
    practice_areas: string[];
    practice_courts: string[];
    professional_experience: ProfessionalExperience[];
    languages_known: string[];
    facebook_url?: string;
    twitter_url?: string;
    linkedin_url?: string;
}

const AttorneyPublicProfilePage = () => {
    const params = useParams();
    const [profile, setProfile] = useState<AttorneyProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/api/attorney/profile/${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    const error = await response.json();
                    setError(error.error || 'Failed to fetch profile');
                }
            } catch (error) {
                setError('Failed to fetch profile');
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) {
            fetchProfile();
        }
    }, [params.id]);

    if (isLoading) {
        return (
            <>
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">Loading...</div>
                </div>
                <Footer />
                <Copyright />
            </>
        );
    }

    if (error || !profile) {
        return (
            <>
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-red-600">{error || 'Profile not found'}</div>
                </div>
                <Footer />
                <Copyright />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold">
                                {profile.first_name} {profile.last_name}
                            </h1>
                            <p className="text-gray-600">{profile.job_title}</p>
                            <p className="text-gray-600">{profile.organization}</p>
                            <p className="text-sm text-gray-500">
                                {profile.city}, {profile.country}
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            {profile.facebook_url && (
                                <a
                                    href={profile.facebook_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                </a>
                            )}
                            {profile.twitter_url && (
                                <a
                                    href={profile.twitter_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-600"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                    </svg>
                                </a>
                            )}
                            {profile.linkedin_url && (
                                <a
                                    href={profile.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-700 hover:text-blue-900"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">
                                Experience: {profile.total_experience} years
                            </p>
                            <p className="text-sm text-gray-500">
                                Consultation Fee: ₹{profile.consultation_fees}
                            </p>
                            {profile.website && (
                                <p className="text-sm">
                                    Website:{' '}
                                    <a
                                        href={profile.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {profile.website}
                                    </a>
                                </p>
                            )}
                        </div>
                        <div>
                            {profile.email && (
                                <p className="text-sm">
                                    Email:{' '}
                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {profile.email}
                                    </a>
                                </p>
                            )}
                            {profile.mobile_number && (
                                <p className="text-sm">
                                    Phone:{' '}
                                    <a
                                        href={`tel:${profile.mobile_number}`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {profile.mobile_number}
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                {profile.bio_graph && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">About</h2>
                        <p className="text-gray-700 whitespace-pre-wrap">{profile.bio_graph}</p>
                    </div>
                )}

                {/* Practice Areas */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">Practice Areas</h2>
                    <div className="flex flex-wrap gap-2">
                        {profile.practice_areas.map((area, index) => (
                            <span
                                key={index}
                                className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
                            >
                                {area}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Courts of Practice */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">Courts of Practice</h2>
                    <div className="flex flex-wrap gap-2">
                        {profile.practice_courts.map((court, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                            >
                                {court}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Professional Experience */}
                {profile.professional_experience.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">Professional Experience</h2>
                        <div className="space-y-4">
                            {profile.professional_experience.map((exp, index) => (
                                <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                                    <h3 className="font-semibold">{exp.job_title}</h3>
                                    <p className="text-gray-600">{exp.company_name}</p>
                                    <p className="text-sm text-gray-500">
                                        {exp.from_year} - {exp.to_year || 'Present'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {profile.languages_known.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Languages</h2>
                        <div className="flex flex-wrap gap-2">
                            {profile.languages_known.map((language, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                                >
                                    {language}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
            <Copyright />
        </>
    );
};

export default AttorneyPublicProfilePage;
