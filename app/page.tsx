"use client";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import herosecpic from "@/public/herosec1.png";
import frame from "@/public/frame.png";
import hammer from "@/public/hammerimg.png";
import LogoShowcase from "@/components/Showcase";
import Sec2 from "@/components/Sec2";
import Sec3 from "@/components/Sec3";
import Sec4 from "@/components/Sec4";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import Link from "next/link";
import logo from "@/public/logo2.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getSocket } from "@/utils/socket";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const socket = getSocket();

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="w-full max-w-[1160px]  mx-auto px-6 py-10 font-sans">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row xl:justify-between items-center gap-12 xl:gap-8 mb-16 w-full mt-4">
            <div className="w-full md:max-w-[50%] xl:max-w-[60%] ">
              <div className="inline-block bg-[#5d3fd3] text-white text-sm font-medium  px-4 py-2 rounded-full mb-6">
                Legal research platform
              </div>

              <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-[80%]">
                Unravelling the Law with AI
              </h1>

              <p className="text-gray-700 mb-8 leading-relaxed text-xs text-justify">
                AMICUS is a generative artificial intelligence trained on the
                whole body of law to serve as a highly skillful and reliable
                legal assistant. AMICUS not only aids in finding the most
                accurate and precise answers to your legal queries but also
                serves as a strategy guide. It is continually updated with the
                latest developments in the law and is engineered to provide
                authentic sources to validate its responses.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => {
                    router.push("/amicus");
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-4 h-auto rounded-md flex items-center"
                >
                  Try AMICUS NOW
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>

                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 font-medium px-6 py-4 h-auto rounded-md flex items-center"
                >
                  Watch Casemine overview videos
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>

                <Button
                  onClick={() => {
                    router.push("/signup");
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 h-auto rounded-md"
                >
                  Request a Demo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative">
                <Image
                  src={herosecpic}
                  alt="Legal research"
                  className="w-full object-cover relative z-10"
                />
                <Image
                  src={hammer}
                  alt="hammer"
                  className=" w-20 sm:w-[128px]  absolute z-20 -bottom-2 -right-5 sm:-right-[72px]"
                />
              </div>
              <div className=" absolute top-2 sm:top-3  right-2 sm:right-8 rounded-[42px] border-2 border-[#5d3fd3] h-full w-full "></div>
            </div>
          </div>

          {/* Features Section */}
          <LogoShowcase />
        </div>
        <div className="border w-[50%] mx-auto "></div>
        <Sec2 />
        <Sec3 />
        <Sec4 />
        <footer className="bg-white py-12 text-gray-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Column 1 - Logo and Contact */}
              <div className="col-span-1">
                <div className="mb-6">
                  <Image
                    onClick={() => {
                      router.push("/");
                    }}
                    src={logo}
                    alt="GoPro Logo"
                    className="mb-4"
                  />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  Eleanor Pena
                </h3>
                <p className="text-gray-500 mb-2">Know us better!</p>
                <div className="flex flex-col space-y-1">
                  <Link
                    href="/signup"
                    className="text-gray-500 hover:text-gray-500"
                  >
                    Request a Demo
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-gray-500">
                    Watch Casemine overview
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-gray-500">
                    Videos
                  </Link>
                </div>
              </div>

              {/* Column 2 - About Us */}
              <div className="col-span-1">
                <h3 className="text-lg font-bold text-black mb-6">ABOUT US</h3>
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/aboutus"
                    className="flex items-center text-gray-500 hover:text-gray-500"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Mission & Vision
                  </Link>
                  <Link
                    href="/aboutus"
                    className="flex items-center text-gray-500 hover:text-gray-500"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Our Company
                  </Link>
                  <Link
                    href="/aboutus"
                    className="flex items-center text-gray-500 hover:text-gray-500"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Our Projects
                  </Link>
                  <Link
                    href="/aboutus"
                    className="flex items-center text-gray-500 hover:text-gray-500"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Our Team
                  </Link>
                </div>
              </div>

              {/* Column 3 - Discover */}
              <div className="col-span-1">
                <h3 className="text-lg font-bold text-black mb-6">DISCOVER</h3>
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/ai_research"
                    className="flex items-center text-gray-500 hover:text-gray-500"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Projects & Research
                  </Link>
                  <Link
                    href="/messages"
                    className="flex items-center text-gray-500 hover:text-gray-500"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Messages
                  </Link>
                  <Link
                    href="/plan"
                    className="flex items-center text-gray-500 hover:text-gray-500"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Pricing
                  </Link>
                  <Link
                    href="/recomendation_services"
                    className="flex items-center text-gray-500 hover:text-gray-500"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    AttorneyIQ
                  </Link>
                </div>
              </div>

              {/* Column 4 - Useful Links */}
              <div className="col-span-1">
                <h3 className="text-lg font-bold text-black mb-6">
                  Casemine Tools
                </h3>
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/caseplus"
                    className="flex items-center text-gray-500 hover:text-gray-500"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Citation Codes
                  </Link>
                  <Link
                    href="/choose_url"
                    className="flex items-center text-gray-500 hover:text-gray-500"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Judgment Search
                  </Link>
                  <Link
                    href="/citation"
                    className="flex items-center text-gray-500 hover:text-gray-500"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Citation Search
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <Copyright />
      </main>
    </>
  );
}
