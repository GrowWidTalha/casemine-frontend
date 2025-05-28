import React from 'react';
import cited from '@/public/citedby.png'
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';
const LegalCitationDetailPage = () => {
  return (
    <>
    <Navbar/>
    <div className="max-w-6xl mx-auto p-4 font-sans bg-white relative">
      {/* Cited By Section */}
      <div className='flex justify-between items-start gap-4 flex-col md:flex-row'>

      <div className="mb-8  w-fit">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[#5D3FD3] text-lg font-medium">Cited By</h2>
          <button className="bg-yellow-400 text-black px-4 py-1 rounded-md text-sm">Visualize</button>
        </div>
        
        <div className="border border-gray-200 rounded-md p-4">
          <p className="text-sm text-gray-600 mb-3">Showing top 2 of 2</p>
          
          {/* Citation 1 */}
          <div className="flex mb-4">
            <div className="w-8 h-8 rounded-full bg-[#5D3FD3] text-white flex items-center justify-center mr-3">L</div>
            <div>
              <p className="font-medium">Sheikh Jorhawan And Others v. Municipal Board, Gorakhpur</p>
              <p className="text-gray-600 text-sm">Allahabad High Court</p>
            </div>
          </div>
          
          {/* Citation 2 */}
          <div className="flex">
            <div className="w-8 h-8 rounded-full bg-[#5D3FD3] text-white flex items-center justify-center mr-3">L</div>
            <div>
              <p className="font-medium">Sheikh Jorhawan And Others v. Municipal Board, Gorakhpur</p>
              <p className="text-gray-600 text-sm">Allahabad High Court</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" ">
        <div className="border border-gray-200 rounded-md p-4">
          <div className="flex justify-between">
            <div>
              <p className="font-medium text-sm">Sheikh Jorhawan And Others v. Municipal Board, Gorakhpur</p>
              <p className="text-gray-600 text-xs">Allahabad High Court</p>
              <p className="text-gray-500 text-xs mt-1">Apr 29, 1925</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-xs mb-1">Subsequent References</p>
              <div className="bg-gray-100 p-1 rounded text-xs">
                <p className="font-medium">CASEPULSE</p>
                <p className="text-[10px]">(AI Recommendation)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      {/* Top Case Header */}
      <div className="flex justify-between flex-wrap items-start mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Cited in:</p>
          <h1 className="text-2xl font-bold mb-1">Municipal Board <span className="font-normal">vs.</span> Shiam Lal</h1>
          <div className="flex items-center">
            <p className="text-[#5D3FD3] text-sm">Allahabad High Court</p>
            <span className="mx-2 text-gray-400">|</span>
            <p className="text-gray-600 text-sm">Dec 1945</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <span className="bg-[#5D3FD3] text-white px-3 py-1 text-sm rounded-md">Supreme Court</span>
          <span className="bg-[#5D3FD3] text-white px-3 py-1 text-sm rounded-md">High Court</span>
          <span className="bg-[#5D3FD3] text-white px-3 py-1 text-sm rounded-md">Tribunal</span>
        </div>
      </div>
      
      {/* Case Content */}
      <div className="space-y-4 mb-6">
        <p className="text-gray-800">
          Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the 
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
          electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s with the release 
          of Letraset sheets containing Lorem ipsum passages, and more recently with desktop publishing software
        </p>
        
        <p className="text-gray-800">
          Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the 
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
          electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s with the release 
          of Letraset sheets containing Lorem ipsum passages, and more recently with desktop publishing software
          Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the 
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type 
          and scrambled it to make a type specimen book. It has.
        </p>
        
        <p className="text-gray-800">
          Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the ind-
          ustry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled 
          it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 
          typesetting, remaining essentially.
        </p>
      </div>
      
      {/* Legal Image */}
      <div className="mb-4">
        <Image 
          src={cited} 
          alt="Legal gavel and books" 
          className="w-full "
        />
      </div>
      
      {/* Right side citation box that appears in original image */}
      
    </div>
    <Footer/>
    <Copyright/>
    </>
  );
};

export default LegalCitationDetailPage;