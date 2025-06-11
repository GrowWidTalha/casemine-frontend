"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import { toast } from "sonner";

const ForgetPasswordPageClient = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleForgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setSuccess(true);
        toast.success("If that email exists, a reset link has been sent.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
              RESET YOUR <span className="text-indigo-600">PASSWORD</span>
            </h1>
            <p className="mt-4 text-gray-800">
              We’ll send you a reset link via{" "}
              <span className="text-indigo-600">email</span>
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-3/5 flex items-center justify-center py-6">
          <div className="w-full max-w-md px-6">
            <h2 className="text-4xl font-bold mb-2 text-center">
              Forgot Password
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Enter your registered email.
            </p>

            <form onSubmit={handleForgetPassword}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm mb-4 text-center">
                  Reset link sent! Check your inbox.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <div className="mt-6 text-sm text-center">
                <a
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Back to Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

const ForgetPasswordPage = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <ForgetPasswordPageClient />
  </React.Suspense>
);

export default ForgetPasswordPage;
