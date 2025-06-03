"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Copyright from "@/components/Copyright";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        country: "",
        email: "",
        phone: "",
        password: "",
        termsAccepted: false,
        notRobot: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const isPhoneValid = (phone: string) => /^\+\d{7,15}$/.test(phone); // +1234567...

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { firstName, lastName, email, phone, termsAccepted, notRobot, country, password } = form;

        if (!firstName || !lastName || !email || !phone || !termsAccepted || !notRobot || !password) {
            toast.error("Please fill all required fields and agree to the terms.");
            return;
        }

        if (!isPhoneValid(phone)) {
            toast.error("Phone number must be in the format +123456789.");
            return;
        }

        setLoading(true);
        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/api/signup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                country,
                email,
                phone_number: phone,
                password,
              }),
            }
          );

          const data = await res.json();
          if (!res.ok) {
            toast.error(data.message || "Signup failed.");
            return;
          }

          localStorage.setItem("token", data.token);
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
          }

          // Set token in cookies (expires in 7 days)
          document.cookie = `token=${data.token}; path=/; max-age=${
            60 * 60 * 24 * 7
          }; secure; samesite=strict`;
          toast.success("Signup successful! Redirecting to profile setup...");
          router.push("/profile");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex min-h-screen w-full">
                <div className="relative w-2/5 bg-blue-100 bg-opacity-50 hidden md:block">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/loginpageimage.png')", opacity: 0.3 }}
                    />
                    <div className="relative z-10 p-12 flex flex-col h-full justify-center ml-10">
                        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                            WELCOME TO THE NEW
                            <br />
                            WORLD OF{" "}
                            <span className="text-indigo-600">
                                LEGAL
                                <br />
                                RESEARCH
                            </span>
                        </h1>
                        <p className="mt-4 text-gray-800">
                            Empowered by{" "}
                            <span className="text-indigo-600">Artificial Intelligence</span>
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-3/5 flex items-center justify-center py-6">
                    <div className="w-full max-w-md px-6">
                        <h2 className="text-3xl font-bold mb-2">Sign up for a 7 day free trial</h2>
                        <p className="text-gray-600 mb-8">No credit card required</p>

                        <form onSubmit={handleSubmit}>
                            {[
                                { id: "firstName", label: "First name", required: true },
                                { id: "lastName", label: "Last name", required: true },
                                { id: "country", label: "Country", required: false },
                                { id: "email", label: "Email", required: true },
                                { id: "phone", label: "Phone Number", required: true },
                                { id: "password", label: "Password", required: true },
                            ].map(({ id, label, required }) => (
                                <div className="mb-4" key={id}>
                                    <label htmlFor={id} className="block text-gray-700 mb-1">
                                        {label} {required && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type={id === "email" ? "email" : id === "phone" ? "tel" : id === "password" ? 'password' : "text"}
                                        id={id}
                                        value={(form as any)[id]}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder={id === "phone" ? "+123456789" : ""}
                                    />
                                </div>
                            ))}

                            <div className="mb-4 flex items-center">
                                <input
                                    type="checkbox"
                                    id="termsAccepted"
                                    checked={form.termsAccepted}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="termsAccepted" className="ml-2 block text-gray-700 text-sm">
                                    Agree to our <a href="#" className="text-red-500">terms</a>
                                </label>
                            </div>

                            <div className="mb-4 border border-gray-300 rounded-md p-2 flex items-center">
                                <input
                                    type="checkbox"
                                    id="notRobot"
                                    checked={form.notRobot}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="notRobot" className="ml-2 block text-gray-700 text-sm">
                                    I'm not a robot
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`bg-indigo-600 text-white py-2 px-8 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-auto block ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? "Submitting..." : "Request Trial Access"}
                            </button>

                            <div className="mt-4 text-sm text-center">
                                Already have an account?{" "}
                                <a href="#" className="text-red-500">
                                    Sign in
                                </a>
                            </div>
                        </form>

                        <div className="mt-12">
                            <p className="text-gray-800 font-medium mb-4 text-center">
                                Are you a Judge, Student or Prosecutor? You are eligible for a
                                free Casemine subscription.
                            </p>
                            <div className="flex justify-between space-x-4">
                                {["Judge", "Student", "Prosecutor"].map((role) => (
                                    <button
                                        key={role}
                                        onClick={() => router.push("/")}
                                        className="bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 flex-1"
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Copyright />
        </div>
    );
}

export default Page;
