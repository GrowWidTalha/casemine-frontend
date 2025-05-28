import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import urlimg from '@/public/urlimg.png'
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';
const CaseMinePlatform = () => {
  return (
    <>
    <Navbar/>
    <div className="w-full">
      {/* Hero Section with Purple Overlay and Background Image */}
      <div 
        className="w-full relative h-[473px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/handclipper.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Purple overlay */}
        <div className="absolute inset-0 bg-[#6141DE] opacity-70"></div>
        
        <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
          <h1 className="text-white text-3xl font-bold text-center mb-6">Choose the URL for your profile</h1>
          
          <div className="flex w-full border border-white rounded-lg overflow-hidden p-2">
            <div className=" text-white p-2 rounded-l  flex items-center text-sm">
              www.casemine.com/lawyer/
            </div>
            <Input 
              placeholder="Your website handle" 
              className=" border-0 h-10 placeholder:text-white mr-2 text-white rounded-sm outline-white ring-white"
            />
            <Button className="bg-[#5D3FD3] hover:bg-purple-800 text-white text-sm rounded-r rounded-lg h-10 ">
              Create Profile Page
            </Button>
          </div>
          
          <div className="text-white text-left text-sm mt-2">
            Ex: www.casemine.com/lawyer/your-name
          </div>
        </div>
      </div>
      
      {/* Disclaimer Section */}
      <div className="w-full bg-[#D8E7FF] py-10">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">DISCLAIMER</h2>
          
          <p className="text-sm text-gray-800 leading-relaxed text-justify">
            <span className="text-purple-700 font-semibold">CaseMine</span> Commentary provides in-depth legal insights, case analyses, and state-specific legal research to help legal professionals, researchers, and students navigate complex legal landscapes. Our platform offers authoritative commentary, curated case law interpretations, and expert perspectives, ensuring accurate and efficient legal research. With a commitment to accessibility and precision, we empower users to stay informed and make well-founded legal decisions.
          </p>
        </div>
      </div>
      
      {/* Article Card Section */}
      <div className="w-full py-12 bg-white ">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row bg-white   ">
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 ">
              <Image 
                src={urlimg}
                alt="Legal documents and statue" 
                className="w-full  "
              />
            </div>
            
            {/* Right Side - Content */}
            <div className="w-full md:w-1/2 p-6  shadow-2xl">
              <h3 className="font-bold text-xl mb-3">Lorem Ipsum Lorem Ipsum Lorem Ipsum</h3>
              
              <p className="text-sm text-gray-800 mb-6">
                Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              
              <div className="text-xs text-gray-500">
                Content here, 16 9 April, 2025
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Border Line */}
      <div className="w-full h-px bg-gray-300"></div>
    </div>
    <Footer/>
    <Copyright/>
    
    </>
  );
};

export default CaseMinePlatform;