"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select } from '@/components/ui/select';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';
import { BACKEND_URL } from '@/lib/api-service';

interface ProfessionalExperience {
    job_title: string;
    company_name: string;
    from_year: number;
    to_year: number | null;
}

interface AttorneyProfile {
    first_name: string;
    last_name: string;
    mobile_number: string;
    show_mobile_number: boolean;
    email: string;
    show_email: boolean;
    organization: string;
    website: string;
    total_experience: number;
    consultation_fees: number;
    job_title: string;
    education_degree: string;
    passing_year: number | null;
    university_name: string;
    facebook_url: string;
    twitter_url: string;
    linkedin_url: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
    bio_graph: string;
    practice_areas: string[];
    practice_courts: string[];
    professional_experience: ProfessionalExperience[];
    professional_memberships: string[];
    languages_known: string[];
}

const AttorneyProfilePage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState<AttorneyProfile>({
        first_name: '',
        last_name: '',
        mobile_number: '',
        show_mobile_number: false,
        email: '',
        show_email: false,
        organization: '',
        website: '',
        total_experience: 0,
        consultation_fees: 0,
        job_title: '',
        education_degree: '',
        passing_year: null,
        university_name: '',
        facebook_url: '',
        twitter_url: '',
        linkedin_url: '',
        address: '',
        city: '',
        province: '',
        postal_code: '',
        country: '',
        bio_graph: '',
        practice_areas: [],
        practice_courts: [],
        professional_experience: [],
        professional_memberships: [],
        languages_known: []
    });

    const [newArea, setNewArea] = useState('');
    const [newCourt, setNewCourt] = useState('');
    const [newMembership, setNewMembership] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [newExperience, setNewExperience] = useState<ProfessionalExperience>({
        job_title: '',
        company_name: '',
        from_year: 0,
        to_year: null
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch(BACKEND_URL + '/api/attorney/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const method = profile.id ? 'PUT' : 'POST';
            const response = await fetch(BACKEND_URL + '/api/attorney/profile', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(profile)
            });

            if (response.ok) {
                router.push('/attorney/dashboard');
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (error) {
            console.error('Error submitting profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (name: string) => {
        setProfile(prev => ({ ...prev, [name]: !prev[name as keyof AttorneyProfile] }));
    };

    const addPracticeArea = () => {
        if (newArea.trim()) {
            setProfile(prev => ({
                ...prev,
                practice_areas: [...prev.practice_areas, newArea.trim()]
            }));
            setNewArea('');
        }
    };

    const addCourt = () => {
        if (newCourt.trim()) {
            setProfile(prev => ({
                ...prev,
                practice_courts: [...prev.practice_courts, newCourt.trim()]
            }));
            setNewCourt('');
        }
    };

    const addExperience = () => {
        if (newExperience.job_title && newExperience.company_name) {
            setProfile(prev => ({
                ...prev,
                professional_experience: [...prev.professional_experience, newExperience]
            }));
            setNewExperience({
                job_title: '',
                company_name: '',
                from_year: 0,
                to_year: null
            });
        }
    };

    const addMembership = () => {
        if (newMembership.trim()) {
            setProfile(prev => ({
                ...prev,
                professional_memberships: [...prev.professional_memberships, newMembership.trim()]
            }));
            setNewMembership('');
        }
    };

    const addLanguage = () => {
        if (newLanguage.trim()) {
            setProfile(prev => ({
                ...prev,
                languages_known: [...prev.languages_known, newLanguage.trim()]
            }));
            setNewLanguage('');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Attorney Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                name="first_name"
                                placeholder="First Name"
                                value={profile.first_name}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="last_name"
                                placeholder="Last Name"
                                value={profile.last_name}
                                onChange={handleInputChange}
                            />
                            <div className="flex items-center space-x-2">
                                <Input
                                    name="mobile_number"
                                    placeholder="Mobile Number"
                                    value={profile.mobile_number}
                                    onChange={handleInputChange}
                                />
                                <div className="flex items-center">
                                    <Switch
                                        checked={profile.show_mobile_number}
                                        onCheckedChange={() => handleSwitchChange('show_mobile_number')}
                                    />
                                    <span className="ml-2">Show</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={profile.email}
                                    onChange={handleInputChange}
                                />
                                <div className="flex items-center">
                                    <Switch
                                        checked={profile.show_email}
                                        onCheckedChange={() => handleSwitchChange('show_email')}
                                    />
                                    <span className="ml-2">Show</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                name="organization"
                                placeholder="Organization"
                                value={profile.organization}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="website"
                                placeholder="Website"
                                value={profile.website}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="total_experience"
                                type="number"
                                placeholder="Total Experience (years)"
                                value={profile.total_experience}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="consultation_fees"
                                type="number"
                                placeholder="Consultation Fees"
                                value={profile.consultation_fees}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="job_title"
                                placeholder="Job Title"
                                value={profile.job_title}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Education */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Education</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                name="education_degree"
                                placeholder="Degree"
                                value={profile.education_degree}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="passing_year"
                                type="number"
                                placeholder="Passing Year"
                                value={profile.passing_year || ''}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="university_name"
                                placeholder="University Name"
                                value={profile.university_name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Social Media</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                name="facebook_url"
                                placeholder="Facebook URL"
                                value={profile.facebook_url}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="twitter_url"
                                placeholder="Twitter URL"
                                value={profile.twitter_url}
                                onChange={handleInputChange}
                            />
                            <Input
                                name="linkedin_url"
                                placeholder="LinkedIn URL"
                                value={profile.linkedin_url}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Address</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <Textarea
                                name="address"
                                placeholder="Address"
                                value={profile.address}
                                onChange={handleInputChange}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    name="city"
                                    placeholder="City"
                                    value={profile.city}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name="province"
                                    placeholder="Province"
                                    value={profile.province}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name="postal_code"
                                    placeholder="Postal Code"
                                    value={profile.postal_code}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name="country"
                                    placeholder="Country"
                                    value={profile.country}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Biography */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Biography</h2>
                        <Textarea
                            name="bio_graph"
                            placeholder="Tell us about yourself..."
                            value={profile.bio_graph}
                            onChange={handleInputChange}
                            className="h-32"
                        />
                    </div>

                    {/* Practice Areas */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Practice Areas</h2>
                        <div className="flex gap-2 mb-4">
                            <Input
                                value={newArea}
                                onChange={(e) => setNewArea(e.target.value)}
                                placeholder="Add practice area"
                            />
                            <Button type="button" onClick={addPracticeArea}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profile.practice_areas.map((area, index) => (
                                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                                    {area}
                                    <button
                                        type="button"
                                        className="ml-2 text-red-500"
                                        onClick={() => {
                                            setProfile(prev => ({
                                                ...prev,
                                                practice_areas: prev.practice_areas.filter((_, i) => i !== index)
                                            }));
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Courts */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Courts of Practice</h2>
                        <div className="flex gap-2 mb-4">
                            <Input
                                value={newCourt}
                                onChange={(e) => setNewCourt(e.target.value)}
                                placeholder="Add court"
                            />
                            <Button type="button" onClick={addCourt}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profile.practice_courts.map((court, index) => (
                                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                                    {court}
                                    <button
                                        type="button"
                                        className="ml-2 text-red-500"
                                        onClick={() => {
                                            setProfile(prev => ({
                                                ...prev,
                                                practice_courts: prev.practice_courts.filter((_, i) => i !== index)
                                            }));
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Professional Experience */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Professional Experience</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input
                                value={newExperience.job_title}
                                onChange={(e) => setNewExperience(prev => ({ ...prev, job_title: e.target.value }))}
                                placeholder="Job Title"
                            />
                            <Input
                                value={newExperience.company_name}
                                onChange={(e) => setNewExperience(prev => ({ ...prev, company_name: e.target.value }))}
                                placeholder="Company Name"
                            />
                            <Input
                                type="number"
                                value={newExperience.from_year || ''}
                                onChange={(e) => setNewExperience(prev => ({ ...prev, from_year: parseInt(e.target.value) }))}
                                placeholder="From Year"
                            />
                            <Input
                                type="number"
                                value={newExperience.to_year || ''}
                                onChange={(e) => setNewExperience(prev => ({ ...prev, to_year: parseInt(e.target.value) }))}
                                placeholder="To Year"
                            />
                        </div>
                        <Button type="button" onClick={addExperience} className="mb-4">Add Experience</Button>
                        <div className="space-y-2">
                            {profile.professional_experience.map((exp, index) => (
                                <div key={index} className="bg-gray-100 p-3 rounded">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-semibold">{exp.job_title}</h3>
                                            <p className="text-sm">{exp.company_name}</p>
                                            <p className="text-sm text-gray-600">
                                                {exp.from_year} - {exp.to_year || 'Present'}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-red-500"
                                            onClick={() => {
                                                setProfile(prev => ({
                                                    ...prev,
                                                    professional_experience: prev.professional_experience.filter((_, i) => i !== index)
                                                }));
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Professional Memberships */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Professional Memberships</h2>
                        <div className="flex gap-2 mb-4">
                            <Input
                                value={newMembership}
                                onChange={(e) => setNewMembership(e.target.value)}
                                placeholder="Add membership"
                            />
                            <Button type="button" onClick={addMembership}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profile.professional_memberships.map((membership, index) => (
                                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                                    {membership}
                                    <button
                                        type="button"
                                        className="ml-2 text-red-500"
                                        onClick={() => {
                                            setProfile(prev => ({
                                                ...prev,
                                                professional_memberships: prev.professional_memberships.filter((_, i) => i !== index)
                                            }));
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Languages Known</h2>
                        <div className="flex gap-2 mb-4">
                            <Input
                                value={newLanguage}
                                onChange={(e) => setNewLanguage(e.target.value)}
                                placeholder="Add language"
                            />
                            <Button type="button" onClick={addLanguage}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profile.languages_known.map((language, index) => (
                                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                                    {language}
                                    <button
                                        type="button"
                                        className="ml-2 text-red-500"
                                        onClick={() => {
                                            setProfile(prev => ({
                                                ...prev,
                                                languages_known: prev.languages_known.filter((_, i) => i !== index)
                                            }));
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-[#5D3FD3] text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Profile'}
                        </Button>
                    </div>
                </form>
            </div>
            <Footer />
            <Copyright />
        </>
    );
};

export default AttorneyProfilePage;
