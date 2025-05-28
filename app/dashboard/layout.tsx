"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login?redirect=/dashboard");
        }
    }, [router]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex relative">
                <Sidebar />
                <div className="flex-1 ml-64">
                    {children}
                </div>
            </div>
            <Footer />
            <Copyright />
        </div>
    );
}
