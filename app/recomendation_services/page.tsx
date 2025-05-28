// App.tsx
"use client";
import Copyright from "@/components/Copyright";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function App() {
  const [text, setText] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("text");

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setUploadedFile(file);
      alert(`Uploaded: ${file.name}`);
    }
  };

  const handleTextChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(event.target.value);
  };

  const handleCourtChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedCourt(event.target.value);
  };

  const handleSearch = () => {
    console.log("Text:", text);
    console.log("Selected Court:", selectedCourt);
    console.log("Uploaded File:", uploadedFile?.name || "None");
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col text-justify">
        {/* Top border */}
        <div className="h-1 w-full bg-gray-800"></div>

        <div className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-16">
          {/* Title */}
          <h1 className="text-center text-3xl md:text-4xl font-bold mb-10 ">
            <span className="text-indigo-600">AttorneyIQ</span> -CaseMine's
            Lawyer <br /> Recommendation Service
          </h1>

          {/* Content Paragraphs */}
          <div className="space-y-8 max-w-5xl mx-auto text-gray-800">
            <p className="text-lg">
              CaseMine's intelligent recommendation service is designed to
              revolutionize legal research by providing precise and contextually
              relevant case law suggestions. Our advanced AI-powered system
              analyzes legal queries, identifies key precedents, and offers
              insightful recommendations based on judicial reasoning and legal
              principles. By leveraging machine learning and natural language
              processing, CaseMine ensures that users receive highly relevant
              citations, enabling them to build stronger legal arguments and
              make well-informed decisions.
            </p>

            <p className="text-lg">
              The recommendation engine goes beyond simple keyword matching,
              offering case suggestions that align with the specific nuances of
              your legal query. It evaluates case similarities, judicial
              interpretations, and evolving legal doctrines, helping legal
              professionals uncover hidden connections between cases. This
              sophisticated approach minimizes research gaps and ensures that no
              critical case law is overlooked, providing a seamless and
              efficient research experience.
            </p>

            <p className="text-lg">
              Whether you are a practicing lawyer, legal researcher, or law
              student, CaseMine's recommendation service empowers you with
              cutting-edge technology to streamline your workflow. By automating
              the discovery of relevant case law, we save you valuable time and
              effort while enhancing the accuracy and depth of your legal
              research. With CaseMine, you can trust that your legal research is
              comprehensive, precise, and backed by the latest advancements in
              AI-driven legal intelligence.
            </p>
          </div>

          {/* Call to Action Button */}
          <div className="flex justify-center mt-12">
            <button className="bg-amber-400 hover:bg-amber-500 text-black font-medium py-3 px-8 rounded-md transition-colors">
              Click here to know more
            </button>
          </div>
        </div>
      </div>

      {/* bottom sec */}
      <div className=" bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 relative overflow-hidden">
        {/* Background overlay with opacity */}
        <div className="absolute inset-0 bg-[url('/BG.png')] bg-cover bg-center opacity-70"></div>

        {/* Main content container */}
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-10 relative z-10">
          {/* Left section - Tips */}
          <div className="md:w-1/2 text-white">
            <h2 className="text-4xl font-bold mb-10">Tips for usage:</h2>
            <ol className="list-decimal ml-10 space-y-8">
              <li className="text-xl leading-relaxed">
                To maximize the benefits of CaseMine's powerful legal research
                tools, start by entering precise legal queries using relevant
                keywords, citations, or case names.
              </li>
              <li className="text-xl leading-relaxed">
                To maximize the benefits of CaseMine's powerful legal research
                tools, start by entering precise legal queries using relevant
                keywords, citations, or case names.
              </li>
              <li className="text-xl leading-relaxed">
                To maximize the benefits of CaseMine's powerful legal research
                tools, start by entering precise legal queries using relevant
                keywords, citations, or case names.
              </li>
            </ol>
          </div>

          {/* Right section - Form */}
          <div className="md:w-1/2 flex items-start">
            <div className="bg-white rounded p-6 w-full">
              {/* Upload/Add buttons */}
              <div className="flex mb-8">
                <button
                  className={`w-1/2 py-2 px-4 border border-gray-300 rounded-sm mr-1 font-normal ${
                    activeTab === "upload"
                      ? "bg-gray-300"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setActiveTab("upload")}
                >
                  Upload Document
                </button>
                <button
                  className={`w-1/2 py-2 px-4 border border-gray-300 rounded-sm ml-1 font-normal ${
                    activeTab === "text"
                      ? "bg-gray-300"
                      : "bg-white text-red-500"
                  }`}
                  onClick={() => setActiveTab("text")}
                >
                  Add Text
                </button>
              </div>

              {activeTab === "text" && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    Copy & paste or type{" "}
                    <span className="font-medium">textual excerpts</span> on a
                    certain legal issue.
                  </p>
                  <textarea
                    placeholder="Paste your text here......"
                    className="w-full border border-gray-300 rounded-sm p-3 h-20"
                    value={text}
                    onChange={handleTextChange}
                  />
                </div>
              )}

              {activeTab === "upload" && (
                <div className="mb-6 flex justify-center">
                  <label className="py-2 px-4 border border-gray-300 rounded-sm bg-blue-500 text-white font-normal cursor-pointer">
                    Upload Document
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleUpload}
                    />
                  </label>
                </div>
              )}

              {/* Court selection */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Select Court</p>
                <select
                  className="w-full border border-gray-300 rounded-sm p-3 text-gray-500"
                  value={selectedCourt}
                  onChange={handleCourtChange}
                >
                  <option value="">- Select Court -</option>
                  <option value="Supreme Court">Supreme Court</option>
                  <option value="High Court">High Court</option>
                  <option value="District Court">District Court</option>
                </select>
              </div>

              {/* Search button */}
              <button
                className="w-full bg-yellow-500 hover:bg-yellow-600 py-2 rounded-sm text-black font-medium"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Copyright />
    </>
  );
}

export default App;
