import React from 'react';
import balance from '@/public/aboutusbalance.png'
import man from '@/public/man with box.png'
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';
const CaseMineLanding = () => {
  return (
    <>
    <Navbar/>
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        <div className="hidden md:block md:w-1/3  ">
          
              <Image src={man} alt="" className='abolute bottom-0' />
        </div>
        
        <div className="w-full md:w-2/3">
          <h2 className="text-4xl font-bold mb-4">About <span className="text-purple-600">CaseMine</span></h2>
          <p className="text-gray-800">
            <span className="text-purple-600 font-medium">CaseMine</span> Commentary provides in-depth legal insights, case 
            analyses, and state-specific legal research to help legal 
            professionals, researchers, and students navigate complex legal 
            landscapes. Our platform offers authoritative commentary, 
            curated case law interpretations, and expert perspectives, 
            ensuring accurate and efficient legal research. With a 
            commitment to accessibility and precision, we empower users 
            to stay informed and make well-founded legal decisions.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/3 order-2 md:order-1">
          <Image 
            src={balance} 
            alt="Legal scales and gavel with law books" 
            className="w-full "
          />
        </div>
        
        <div className="w-full md:w-2/3 order-1 md:order-2">
          <div className="bg-purple-600 text-white text-sm font-medium py-1 px-4 rounded-full inline-block mb-4">
            Legal research platform
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Committed to Delivering the <span className="text-purple-600">Best Features</span> in Every Aspect
          </h2>
          <p className="text-gray-800 mb-4">
            Our goal is to revolutionize legal research by providing 
            comprehensive, state-specific case law commentary and 
            expert insights. We aim to enhance accessibility, accuracy, and 
            efficiency, enabling legal professionals, researchers, and 
            students to make informed decisions with confidence.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-sm font-medium py-1 px-4 rounded-full">
            Contact us
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    <Copyright/>
    </>
  );
};

export default CaseMineLanding;