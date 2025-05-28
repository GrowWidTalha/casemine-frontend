import React from 'react';

import caseiq from '@/public/caseiq.png'
import amicus from '@/public/amicus 1.png'
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';


const LegalCitationInterface = () => {
  return (

    <>
    <Navbar/>
    <div className="max-w-6xl mx-auto p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl"><span className="text-[#5D3FD3] font-medium">Citation</span> Codes</h1>
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <div className="bg-purple-100 rounded-lg p-4">
            <h2 className="font-medium mb-2">Equivalent Citations</h2>
            <p className="text-[#5D3FD3]">Citation Codes</p>
          </div>
          
          <div className="border rounded-lg border-purple-200 p-4">
            <h2 className="font-medium mb-2">CASE NO.</h2>
            <p>Second Appeal No. 1129of 1923</p>
          </div>
          
          <div className="border rounded-lg border-purple-200 p-4">
            <h2 className="font-medium mb-2">JUDGES</h2>
            <p>Sulaiman .J</p>
          </div>
          
          <div className="border rounded-lg border-purple-200 p-4">
            <h2 className="font-medium mb-2">ACTS</h2>
            <p>No Acts</p>
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <div className="text-center">
              <Image src={caseiq} alt="CaseIQ Logo" className="mx-auto" />
              {/* <p className="font-bold mt-2">CASEIQ</p> */}
            </div>
            
            <div className="text-center">
              <Image src={amicus} alt="Amicus Logo" className="mx-auto" />
              {/* <p className="font-bold mt-2">AMICUS</p> */}
              {/* <p className="text-sm">(Powered by GPT)</p> */}
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-center">For Research Laws and practicing as lawyer must use <span className="text-[#5D3FD3] font-medium">NYAYMITRA</span> & <span className="text-[#5D3FD3] font-medium">CASEPULSE</span></p>
            
            <div className="flex justify-center mt-4">
            <button className="border border-[#5D3FD3] rounded-md px-6 py-2 text-[#5D3FD3] flex items-center">
                Do it now 
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-4">
          <div className="border rounded-lg border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Sheikh Jorhawan And Others v. Municipal Board, Gorakhpur</p>
                <p className="text-gray-600">Allahabad High Court</p>
                <p className="text-gray-500 text-sm mt-1">Apr 29, 1925</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-gray-600 mb-1">Subsequent References</div>
                <div className="bg-gray-100 p-2 rounded text-sm">
                  <p>CASEPULSE</p>
                  <p className="text-xs">(AI Recommendation)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold mb-4">CASEPULSE</h2>
            <p className="text-lg mb-8">User AI to get other relevant cases</p>
            <button className="bg-[#5D3FD3] text-white py-3 px-6 rounded-md">
              Run CASEPULSE on this judgement
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    <Copyright/>
    </>
  );
};

export default LegalCitationInterface;