"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Menu, Plus } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';

const LegalPricingPage = () => {
      const [sidebarOpen, setSidebarOpen] = useState(false);
  // User profile data
  const profileData = {
    initials: "AN",
    name: "Guy Hawkins",
    question: "Are you a practicing lawyer?",
    description: "Customize now lets you enhance your digital presence by creating your unique profile and claiming the cases you have appeared in."
  };

  // Pricing plans data
  const pricingPlans = [
    {
      id: 1,
      name: "Essentials",
      price: "1,950",
      unit: "/year",
      description: "Annual Subscription",
      buttonColor: "bg-gray-900 hover:bg-black",
      highlighted: false
    },
    {
      id: 2,
      name: "AI PRO",
      price: "9,950",
      unit: "",
      description: "Setup Cost",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      highlighted: true
    },
    {
      id: 3,
      name: "AI Premium",
      price: "19,500",
      unit: "/year",
      description: "Annual Subscription",
      buttonColor: "bg-gray-900 hover:bg-black",
      highlighted: false
    }
  ];

  // Features list for all plans
  const features = [
    {
      name: "AI Powered Search",
      subtext: "Intelligent Judgment Search CiteText"
    },
    { name: "Visual Search" },
    { name: "Important Paragraphs" },
    { name: "Task Management" },
    { name: "Bookmarks" },
    { name: "Topic Alerts" },
    { name: "Citation Search" },
    { name: "Importance Matrix" },
    {
      name: "Exhaustive Coverage:",
      subtext: "Federal and State Courts"
    },
    {
      name: "256-bit AES and SSL/TLS encryption"
    },
    {
      name: "256-bit AES and SSL/TLS encryption"
    }
  ];

  // Footer links
  const footerLinks = [
    { name: "NYAYMITRA", url: "#" },
    { name: "CASEPULSE", url: "#" }
  ];

  // Partner logos
  const partnerLogos = [
    { name: "CASEIQ", color: "bg-teal-700" },
    { name: "AMICUS", subtext: "Powered by GPT" }
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white flex relative">
          {/* Left sidebar */}
          <button
        className="xl:hidden absolute z-50 top-2 left-2 bg-[#5d3fd3] text-white px-2 py-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Background with Gavel Image */}

      <div className={`w-1/4 bg-cover bg-center relative xl:block ${
          sidebarOpen ? "absolute z-30 w-72" : "hidden"
        }`}>
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
                Casemine now lets you enhance your digital presence by creating
                your unique profile and claiming the cases you have appeared in.
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


      <div className=" mx-auto relative p-4 mt-8 sm:mt-0  flex items-center justify-center">
        <div className="   w-fit">

          {/* Right content area */}
          <div className="md:col-span-2">
            {/* Package heading */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold mb-2">Current Package: AI Pro</h1>
              <p className="text-blue-600">Your free trial has expired. Subscribe now to continue using our services.</p>
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pricingPlans.map((plan) => (
                <Card key={plan.id} className={`border ${plan.highlighted ? 'border-purple-300' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                    <p className="text-yellow-500 text-sm mb-4">Starting at</p>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-sm text-gray-600">{plan.unit}</span>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>
                    
                    <Button className={`w-full mb-4 ${plan.buttonColor} text-white`}>
                      Subscribe Now
                    </Button>
                    
                    <div className="text-sm mb-2">You get:</div>
                    <div className="space-y-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-4 h-4 rounded-full bg-purple-700 flex-shrink-0 flex items-center justify-center mr-2 mt-1">
                            <Check className="text-white w-3 h-3" />
                          </div>
                          <span className="text-sm">
                            {feature.name}
                            {feature.subtext && (
                              <><br /><span className="text-xs text-gray-500">{feature.subtext}</span></>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    <Copyright/>
    </>
  );
};

export default LegalPricingPage;