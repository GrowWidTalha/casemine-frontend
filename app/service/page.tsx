"use client";
import React, { useState } from "react";
import { Plus, X, Menu } from "lucide-react";
import amicus from "@/public/amicus 1.png";
import caseiq from "@/public/caseiq-logo 1.png";
import justiclady from "@/public/justice lady.png";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import { useRouter } from "next/navigation";
const CaseMineDashboard = () => {
  const [activeTab, setActiveTab] = useState("RECENT CASES");
  const [activeMainTab, setActiveMainTab] = useState("RESEARCH HOME");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "Next.js tutorials",
    "TypeScript best practices",
    "Tailwind CSS examples",
    "React hooks guide",
    "Framer Motion animations",
  ]);
  const mainTabs = [
    "RESEARCH HOME",
    "DOCUMENTS",
    "SEARCH HISTORY",
    "BOOKMARKS",
    "CASEIQ",
    "TASKS",
    "SEARCH ALERTS",
  ];
  const recentTabs = [
    "RECENT CASES",
    "RECENT TASKS",
    "RECENT BOOKMARKS",
    "RECENT SEARCHES",
    "RECENT DOCUMENTS",
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50 font-sans flex relative">
        {/* Mobile Sidebar Toggle - Now visible before xl breakpoint */}
        <button
          className="xl:hidden fixed z-50 top-8 left-4 bg-[#5d3fd3] text-white px-2 py-2 rounded-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Sidebar Background with Gavel Image */}

        <div
          className={`w-1/4 bg-cover bg-center relative xl:block ${
            sidebarOpen ? "absolute z-30 w-72" : "hidden"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/loginpageimage.png')",
              opacity: 0.3,
            }}
          />
          <div className="relative z-10 p-6 h-full">
            {/* Profile Card */}
            <div className="bg-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-[#5d3fd3] text-white rounded-full border border-white min-w-12 min-h-12 flex items-center justify-center mr-3 text-lg">
                  <span className="font-semibold">AN</span>
                </div>
                <span className="text-2xl font-bold">Guy Hawkins</span>
              </div>
              <div>
                <p className="font-medium text-base mb-1">
                  Are you a practicing lawyer?
                </p>
                <p className="text-sm mb-3">
                  Casemine now lets you enhance your digital presence by
                  creating your unique profile and claiming the cases you have
                  appeared in.
                </p>
                <div className="flex justify-end">
                  <button className="bg-[#5d3fd3] text-white text-xs px-4 py-1 rounded">
                    Click here to know more
                  </button>
                </div>
              </div>
            </div>

            {/* Folders Section */}
            <div className=" rounded-lg">
              <div className="bg-amber-200 p-4 flex justify-between items-center">
                <h3 className="font-bold text-lg">My Folders</h3>
                <button className="bg-[#5d3fd3] text-white text-xs px-3 py-1 rounded flex items-center">
                  <Plus size={16} className="mr-1" />
                  Add New
                </button>
              </div>
              <div className=" border border-black flex justify-center items-center h-96 rounded-b-lg relative overflow-hidden">
                {/* Background gavel image inside folder area */}

                <button className="relative z-10 bg-[#5d3fd3] text-white text-xs px-3 py-1 rounded flex items-center">
                  <Plus size={16} className="mr-1" />
                  Add New Folder
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full xl:w-3/4 bg-white border-2 border-gray-400 md:mx-8 h-fit  mt-4">
          {/* Main Navigation Tabs - With horizontal scroll to prevent breaking layout */}
          <div className="flex border-b border-gray-300 overflow-x-auto">
            {mainTabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                  activeMainTab === tab
                    ? "text-gray-800 border-b border-gray-400"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveMainTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          {activeMainTab === "RESEARCH HOME" && (
            <div className="p-4 xl:p-8">
              <h1 className="text-xl xl:text-2xl font-bold text-center mb-8 xl:mb-16">
                What Would You Like to do Today?
              </h1>

              {/* Tool Icons */}
              <div className="flex flex-col xl:flex-row justify-center items-center xl:space-x-40 mb-8 xl:mb-16 space-y-8 xl:space-y-0">
                <div className="flex flex-col items-center">
                  <div className="mb-2">
                    <Image src={amicus} alt="" />
                  </div>

                  <button
                    onClick={() => {
                      router.push("/amicus");
                    }}
                    className="bg-[#5d3fd3] text-white text-sm px-4 py-2 rounded hover:cursor-pointer"
                  >
                    Ask Question
                  </button>
                </div>

                <div className="flex flex-col items-center">
                  <div className="mb-2">
                    <Image src={caseiq} alt="" />
                  </div>
                  <button
                    onClick={() => {
                      router.push("/caseiq");
                    }}
                    className="bg-[#5d3fd3] text-white text-sm px-4 py-2 rounded"
                  >
                    Upload a document
                  </button>
                </div>
              </div>

              {/* Recent Activities Section - Modified to stack properly on mobile */}
              <div className="mt-8">
                {/* First row of tabs - Now with horizontal scroll */}
                <div className="flex flex-wrap">
                  <div className="w-full xl:w-7/12 border border-gray-300">
                    <div className="flex overflow-x-auto">
                      {recentTabs.slice(0, 3).map((tab) => (
                        <button
                          key={tab}
                          className={`px-4 py-2 text-sm font-medium border-r border-gray-300 whitespace-nowrap flex-shrink-0 ${
                            activeTab === tab ? "bg-white" : "bg-gray-50"
                          }`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Second row of tabs - Now with horizontal scroll */}
                  <div className="w-full xl:w-5/12 border border-gray-300 xl:border-l-0 mt-0">
                    <div className="flex overflow-x-auto">
                      {recentTabs.slice(3, 5).map((tab) => (
                        <button
                          key={tab}
                          className={`px-4 py-2 text-sm font-medium border-r border-gray-300 whitespace-nowrap flex-shrink-0 ${
                            activeTab === tab ? "bg-white" : "bg-gray-50"
                          }`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content boxes - Now stacking properly */}
                <div className="flex flex-wrap">
                  {/* Left content pane */}
                  <div className="w-full xl:w-7/12 border border-gray-300 border-t-0 p-3">
                    <div className="bg-amber-100 rounded p-4 relative">
                      <button className="absolute right-2 top-2 text-gray-500">
                        <X size={16} />
                      </button>
                      <p className="text-sm">
                        There are no cases present. Please add some case to get
                        the result.
                      </p>
                      <p className="text-sm text-blue-600 mt-2">
                        Add new Case »
                      </p>
                    </div>
                  </div>

                  {/* Right content pane */}
                  <div className="w-full xl:w-5/12 border border-gray-300 border-t-0 xl:border-l-0 p-3">
                    <div>
                      <div className="mb-4">
                        <p className="text-sm">
                          Lawyer:CALIFORNIA v. HODARI D.
                        </p>
                        <p className="text-xs text-amber-500">
                          19 Jan 2025 17:39
                        </p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm">
                          Lawyer:CALIFORNIA v. HODARI D.
                        </p>
                        <p className="text-xs text-amber-500">
                          19 Jan 2025 17:39
                        </p>
                      </div>
                      <div className="h-16 xl:h-32"></div>{" "}
                      {/* Spacer to match layout */}
                      <div className="text-right">
                        <button className="text-red-500 text-sm">
                          Show all »
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeMainTab === "DOCUMENTS" && (
            <div className="p-4">
              {/* Documents table header */}
              <div className="border border-gray-300">
                <div className="grid grid-cols-4 border-b border-gray-300">
                  <div className="p-4 font-medium">Name</div>
                  <div className="p-4 font-medium">Date</div>
                  <div className="p-4 font-medium">Modified</div>
                  <div className="p-4 font-medium">Shared with</div>
                </div>

                {/* No documents notification */}
                <div className="p-4">
                  <div className="bg-amber-100 p-4 rounded relative">
                    <button className="absolute right-2 top-2 text-gray-500">
                      <X size={16} />
                    </button>
                    <p className="text-sm">
                      No documents have been added for this folder yet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload button */}
              <div className="flex justify-center mt-8">
                <button className="bg-[#5d3fd3] text-white px-4 py-2 rounded">
                  Upload a document
                </button>
              </div>

              {/* Lady Justice image at bottom right */}
              <div className="relative h-96">
                <div className="absolute -bottom-4 right-0">
                  <Image
                    src={justiclady}
                    alt="Lady Justice statue"
                    className="w-64"
                  />
                </div>
              </div>
            </div>
          )}

          {activeMainTab === "SEARCH HISTORY" && (
            <div className="p-4 bg-white ">
              <ul className="space-y-2">
                {searchHistory.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-100  hover:bg-gray-200 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {activeMainTab === "BOOKMARKS" && (
            <div className="p-4 bg-white  ">
              <ul className="space-y-2">
                {searchHistory.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-100  hover:bg-gray-200 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          

        </div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default CaseMineDashboard;
