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
        <div className="max-w-4xl mx-auto font-sans text-sm leading-normal">
      {/* Top citation box */}
      <div className="border border-gray-300 mb-5">
        <div className="flex">
          <div className="p-3 flex-grow">
            <p className="mb-0">Sheikh Jorhawan And Others v. Municipal Board, Gorakhpur</p>
            <p className="text-gray-600 mb-0">Allahabad High Court</p>
            <p className="text-purple-500 text-sm mb-0">Apr 29, 1925</p>
          </div>
          <div className="border-l border-gray-300 p-3 w-64">
            <div className="flex">
              <div className="flex-grow">
                <p className="mb-0">Subsequent References</p>
              </div>
              <div className="text-right">
                <p className="mb-0">CASEPULSE</p>
                <p className="text-xs text-gray-500 mb-0">(AI Recommendation)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cited in section */}
      <div className="mb-5">
        <p className="text-[#5D3FD3] mb-1">Cited in:</p>
        <h1 className="text-2xl font-bold mb-0">Municipal Board <span className="font-normal">vs.</span> Shiam Lal</h1>
        <p className="text-[#5D3FD3] mb-3">Allahabad High Court <span className="text-gray-600">(08 Dec 1936)</span></p>
      </div>

      {/* Paragraphs with numbers */}
      <div className="mb-8">
        <div className="flex mb-6">
          <span className="font-bold mr-2 flex-shrink-0">1.</span>
          <p className="m-0">
            Lorem ipsum is simply dummy text of the printing and typesetting 
            industry. Lorem ipsum has been the 
            industry's standard dummy text ever since the 1500s, when an unknown 
            printer took a galley of type and 
            scrambled it to make a type specimen book. It has survived not only five 
            centuries, but also the leap into 
            electronic typesetting, remaining essentially unchanged. It was 
            popularised in the 1960s with the release 
            of Letraset sheets containing Lorem ipsum passages, and more recently 
            with desktop publishing software
          </p>
        </div>

        <div className="flex mb-6">
          <span className="font-bold mr-2 flex-shrink-0">2.</span>
          <p className="m-0">
            Lorem ipsum is simply dummy text of the printing and typesetting 
            industry. Lorem ipsum has been the 
            industry's standard dummy text ever since the 1500s, when an unknown 
            printer took a galley of type and 
            scrambled it to make a type specimen book. It has survived not only five 
            centuries, but also the leap into 
            electronic typesetting, remaining essentially unchanged. It was 
            popularised in the 1960s with the release 
            of Letraset sheets containing Lorem ipsum passages, and more recently 
            with desktop publishing software
          </p>
        </div>

        <div className="flex mb-6">
          <span className="font-bold mr-2 flex-shrink-0">3.</span>
          <p className="m-0">
            Lorem ipsum is simply dummy text of the printing and typesetting 
            industry. Lorem ipsum has been the 
            industry's standard dummy text ever since the 1500s, when an unknown 
            printer took a galley of type and 
            scrambled it to make a type specimen book. It has survived not only five 
            centuries, but also the leap into 
            electronic typesetting, remaining essentially unchanged. It was 
            popularised in the 1960s with the release 
            of Letraset sheets containing Lorem ipsum passages, and more recently 
            with desktop publishing software
          </p>
        </div>

        <div className="flex mb-6">
          <span className="font-bold mr-2 flex-shrink-0">4.</span>
          <p className="m-0">
            Lorem ipsum is simply dummy text of the printing and typesetting 
            industry. Lorem ipsum has been the 
            industry's standard dummy text ever since the 1500s, when an unknown 
            printer took a galley of type and 
            scrambled it to make a type specimen book. It has survived not only five 
            centuries, but also the leap into 
            electronic typesetting, remaining essentially unchanged. It was 
            popularised in the 1960s with the release 
            of Letraset sheets containing Lorem ipsum passages, and more recently 
            with desktop publishing software
          </p>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="border-t border-gray-300 mt-8"></div>
    </div>
      </div>
    </div>
    <Footer/>
    <Copyright/>
    </>
  );
};

export default LegalCitationInterface;