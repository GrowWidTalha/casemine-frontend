"use client";

import Copyright from "@/components/Copyright";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const ResetPasswordPageClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Missing reset token.");
      router.push("/login");
    }
  }, [token, router]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, new_password: password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      toast.success("Password reset successful. Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen w-full">
        {/* Left Panel */}
        <div className="relative w-[30%] bg-blue-100 bg-opacity-50 hidden md:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/loginpageimage.png')",
              opacity: 0.3,
            }}
          />
          <div className="relative z-10 p-12 flex flex-col h-full justify-center">
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
              RESET YOUR
              <br />
              PASSWORD
            </h1>
            <p className="mt-4 text-gray-800">
              Powered by <span className="text-indigo-600">Secure Tech</span>
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-3/5 flex items-center justify-center py-6">
          <div className="w-full max-w-md px-6">
            <h2 className="text-3xl font-bold mb-2 text-center">
              Set New Password
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Enter and confirm your new password.
            </p>

            <form onSubmit={handleReset}>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  New Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 mb-2"
                >
                  Confirm Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm mb-4 text-center">
                  Password reset successful!
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-48 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-auto block ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPageClient />
    </Suspense>
  );
};

export default ResetPasswordPage;
