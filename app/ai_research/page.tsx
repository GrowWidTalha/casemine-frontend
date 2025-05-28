"use cient";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import balanceimg from "@/public/balanceimggraphicalview.png";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import Ai from '@/components/Ai_res_top'
const LegalDocumentApp = () => {
  // Filter categories data
  const filterCategories = [
    { id: "practice-areas", label: "Practice Areas" },
    { id: "all-courts", label: "All Courts" },
    { id: "judge-iq", label: "Judge IQ" },
    { id: "other-filters", label: "Other Filters" },
  ];

  // Sub-filter data
  const subFilters = [
    { id: "uploaded-document", label: "Uploaded Document" },
    { id: "graphical-view", label: "Graphical View" },
    { id: "citations-found", label: "Citations Found" },
  ];

  // Bottom filters data
  const bottomFilters = [
    { id: "suggested-precedents", label: "Suggested Precedents" },
    { id: "suggested-arguments", label: "Suggested Arguments" },
    { id: "nyayamitra", label: "NYAYAMITRA", subLabel: "Powered by GPT4" },
  ];

  // Content sections data
  const contentSections = [
    {
      id: 1,
      title: "Lorem Ipsum Lorem Ipsum",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.",
      hasImage: true,
    },
    {
      id: 2,
      title: "Lorem Text",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
      author: "Lorem Ipsum",
      authorSubtext: "Lorem Ipsum simply",
      hasQuote: true,
      bgColor: "bg-purple-50",
    },
    {
      id: 3,
      title: "Lorem Text",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
      author: "Lorem Ipsum",
      authorSubtext: "Lorem Ipsum simply",
      hasQuote: true,
      bgColor: "bg-white",
    },
    {
      id: 4,
      title: "Lorem Text",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
      author: "Lorem Ipsum",
      authorSubtext: "Lorem Ipsum simply",
      hasQuote: true,
      bgColor: "bg-purple-50",
    },
  ];

  // Form fields
  const formFields = [
    { id: "first-name", label: "First Name", type: "text" },
    { id: "last-name", label: "Last Name", type: "text" },
    { id: "email", label: "Email Address *", type: "email" },
    { id: "phone", label: "Phone Number *", type: "tel" },
    { id: "subject", label: "Subject *", type: "text" },
    { id: "message", label: "Message", type: "textarea" },
  ];

 

  return (
    <>
      <Navbar />
      <Ai/>
      <div className="max-w-6xl mx-auto p-4 bg-white">
        {/* Main Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ">
          <div>
            <h2 className="font-bold text-2xl mb-4">
              {contentSections[0].title}
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed">
              {contentSections[0].content}
            </p>
          </div>
          <div className="  flex items-center justify-center overflow-hidden">
            <Image src={balanceimg} alt="Legal scales" className="" />
          </div>
        </div>

        {/* Content Sections */}
        {contentSections.slice(1).map((section) => (
          <div
            key={section.id}
            className={`${section.bgColor} py-8 px-6 mb-8 flex flex-col md:flex-row gap-8`}
          >
            <div className="w-full md:w-2/3">
              <h3 className="font-bold text-2xl mb-4">{section.title}</h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                {section.content}
              </p>
            </div>
            {section.hasQuote && (
              <div className="w-full md:w-1/3 bg-white p-6 rounded-sm shadow-sm">
                <div className="relative">
                  <div className="text-red-600 text-4xl absolute -left-4 -top-4">
                    "
                  </div>
                  <p className="text-sm italic text-gray-800 mb-4">
                    {section.quote}
                  </p>
                  <div>
                    <p className="text-center text-sm font-semibold">
                      {section.author}
                    </p>
                    <p className="text-center text-xs text-gray-600">
                      {section.authorSubtext}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default LegalDocumentApp;
