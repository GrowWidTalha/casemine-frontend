import React from 'react';
import barbench from '@/public/barandbench.png'
import law260 from '@/public/law360.png'
import analyticsindia from '@/public/analyticsindia.png'
import biggerlaw from '@/public/biggerlawfirm.png'
import artifciallawer from '@/public/artificial-lawyer-logo 1.png'
import livelaw from '@/public/livelaw.png'
import forbes from '@/public/forbes.png'
import Image from 'next/image';


const LogoShowcase = () => {
  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* First row of logos */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center min-w-64 h-20 border border-gray-200">
            <Image src={barbench} alt="Bar and Bench" className="" />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center min-w-64 h-20 border border-[#5d3fd3]">
            <Image src={law260} alt="LAW360" className="" />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center min-w-64 h-20 border border-gray-200">
            <Image src={analyticsindia} alt="Analytics India Magazine" className="" />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center min-w-64 h-20 border border-gray-200">
            <Image src={biggerlaw} alt="BLF Bigger Law Firm" className="" />
          </div>
        </div>
        
        {/* Second row of logos */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center min-w-64 h-20 border border-[#5d3fd3]">
            <Image src={artifciallawer} alt="Artificial Lawyer" className="" />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center min-w-64 h-20 border border-gray-200">
            <Image src={livelaw} alt="Live Law" className="w-[40%]" />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center min-w-64 h-20 border border-[#5d3fd3]">
            <Image src={forbes} alt="Forbes" className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;