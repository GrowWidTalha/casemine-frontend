"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import { getUserProfile, updateUserProfile, changePassword } from "@/lib/api-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function ProfilePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Profile data state
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        email: "",
        court_of_practice: "",
        organization: "",
        job_title: "",
        bio_graphy: "",
    });

    // Password change state
    const [passwordData, setPasswordData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    // Load user profile when component mounts
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login?redirect=/profile");
            return;
        }

        async function loadProfile() {
            try {
                const profileData = await getUserProfile(token!);
                setProfile({
                    first_name: profileData.first_name || "",
                    last_name: profileData.last_name || "",
                    email: profileData.email || "",
                    court_of_practice: profileData.court_of_practice || "",
                    organization: profileData.organization || "",
                    job_title: profileData.job_title || "",
                    bio_graphy: profileData.bio_graphy || "",
                });

                if (profileData.profile_image_url) {
                    setProfileImage(profileData.profile_image_url);
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Failed to load profile:", error);
                toast.error("Failed to load profile. Please try again.");
                setIsLoading(false);
            }
        }

        loadProfile();
    }, [router]);

    // Handle profile update form submission
    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }

            // Prepare profile data with file if selected
            const profileData = { ...profile };
            if (selectedFile) {
                profileData.profile_image = selectedFile;
            }

            const response = await updateUserProfile(profileData, token);

            // Update profile image if provided in response
            if (response.user && response.user.profile_image_url) {
                setProfileImage(response.user.profile_image_url);
            }

            toast.success("Profile updated successfully");
            setSelectedFile(null);
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile");
        } finally {
            setIsUpdating(false);
        }
    };

    // Handle password change form submission
    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate passwords match
        if (passwordData.new_password !== passwordData.confirm_password) {
            toast.error("New passwords do not match");
            return;
        }

        // Validate password length
        if (passwordData.new_password.length < 8) {
            toast.error("New password must be at least 8 characters long");
            return;
        }

        setIsChangingPassword(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }

            await changePassword(
                passwordData.current_password,
                passwordData.new_password,
                token
            );

            toast.success("Password changed successfully");

            // Reset form
            setPasswordData({
                current_password: "",
                new_password: "",
                confirm_password: "",
            });
        } catch (error: any) {
            toast.error(error.message || "Failed to change password");
        } finally {
            setIsChangingPassword(false);
        }
    };

    // Handle profile input changes
    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // Handle password input changes
    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);

            // Show preview
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setProfileImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    if (isLoading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading your profile...</p>
                    </div>
                </div>
                <Footer />
                <Copyright />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h1>

                        <Tabs defaultValue="profile">
                            <TabsList className="mb-8">
                                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                                <TabsTrigger value="password">Change Password</TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile">
                                <form onSubmit={handleProfileSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        {/* Profile Image */}
                                        <div className="md:col-span-2 flex flex-col items-center mb-6">
                                            <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4 bg-gray-200">
                                                {profileImage ? (
                                                    <Image
                                                        src={profileImage}
                                                        alt="Profile"
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-gray-500">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                            <label className="cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                                                Upload Photo
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                            {selectedFile && (
                                                <p className="text-sm text-gray-600 mt-2">
                                                    Selected: {selectedFile.name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Basic Information */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                First Name*
                                            </label>
                                            <Input
                                                name="first_name"
                                                value={profile.first_name}
                                                onChange={handleProfileChange}
                                                className="w-full"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Last Name*
                                            </label>
                                            <Input
                                                name="last_name"
                                                value={profile.last_name}
                                                onChange={handleProfileChange}
                                                className="w-full"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <Input
                                                name="email"
                                                value={profile.email}
                                                readOnly
                                                className="w-full bg-gray-100"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                        </div>

                                        {/* Professional Information */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Court of Practice
                                            </label>
                                            <Input
                                                name="court_of_practice"
                                                value={profile.court_of_practice}
                                                onChange={handleProfileChange}
                                                className="w-full"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Organization
                                            </label>
                                            <Input
                                                name="organization"
                                                value={profile.organization}
                                                onChange={handleProfileChange}
                                                className="w-full"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Job Title
                                            </label>
                                            <Input
                                                name="job_title"
                                                value={profile.job_title}
                                                onChange={handleProfileChange}
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Biography
                                            </label>
                                            <Textarea
                                                name="bio_graphy"
                                                value={profile.bio_graphy}
                                                onChange={handleProfileChange}
                                                className="w-full min-h-[100px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={isUpdating}
                                            className="bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            {isUpdating ? "Saving..." : "Save Profile"}
                                        </Button>
                                    </div>
                                </form>
                            </TabsContent>

                            <TabsContent value="password">
                                <form onSubmit={handlePasswordChange}>
                                    <div className="space-y-6 max-w-md mx-auto">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Current Password*
                                            </label>
                                            <Input
                                                type="password"
                                                name="current_password"
                                                value={passwordData.current_password}
                                                onChange={handlePasswordInputChange}
                                                className="w-full"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                New Password*
                                            </label>
                                            <Input
                                                type="password"
                                                name="new_password"
                                                value={passwordData.new_password}
                                                onChange={handlePasswordInputChange}
                                                className="w-full"
                                                required
                                                minLength={8}
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Password must be at least 8 characters long
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Confirm New Password*
                                            </label>
                                            <Input
                                                type="password"
                                                name="confirm_password"
                                                value={passwordData.confirm_password}
                                                onChange={handlePasswordInputChange}
                                                className="w-full"
                                                required
                                            />
                                        </div>

                                        <div className="flex justify-end">
                                            <Button
                                                type="submit"
                                                disabled={isChangingPassword}
                                                className="bg-indigo-600 hover:bg-indigo-700"
                                            >
                                                {isChangingPassword ? "Changing..." : "Change Password"}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Footer />
            <Copyright />
        </>
    );
}
