// pages/index.tsx
import Image from 'next/image';
import Link from 'next/link';
// import { ArrowRightIcon } from '@heroicons/react/24/solid';
import image1 from '@/public/sec3image1.png'
import image2 from '@/public/sec3image2.png'
import avatar1 from '@/public/avatar 1.png'
import avatar2 from '@/public/avatar2.png'

export default function Home() {
  return (
    <div className="shadow-2xl">
      {/* Hero section with exact 603px height */}
      <div className="bg-[#d6e1ff] md:h-[603px] w-full relative">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row ">
          {/* Left side content */}
          <div className="md:w-[71%] z-10">
            {/* Purple badge */}
            <div className="inline-block mb-8">
              <span className="bg-[#5d3fd3] text-white px-6 py-2 rounded-full text-sm font-medium">
                Your AI-Powered Legal Assistant
              </span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Smarter Legal Research with AI-Driven Insights
            </h1>
            
            {/* Subheading */}
            <p className="text-gray-700 mb-12 max-w-lg">
              Leverage advanced AI to streamline case research, enhance argumentation with court language, and visualize case linkages like never before.
            </p>
            
            {/* Testimonials section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* First testimonial */}
              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0">
                  <Image 
                    src={avatar1} 
                    alt="Guy Hawkins" 
                    width={48} 
                    height={48} 
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Guy Hawkins</h3>
                  <p className="text-gray-600 text-sm">
                    CaseMine revolutionized my legal research, saving hours while improving accuracy!
                  </p>
                </div>
              </div>
              
              {/* Second testimonial */}
              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0">
                  <Image 
                    src={avatar2} 
                    alt="Darlene Robertson" 
                    width={48} 
                    height={48} 
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Darlene Robertson</h3>
                  <p className="text-gray-600 text-sm">
                    In-depth insights and AI-powered search make CaseMine an essential tool for legal professionals.
                  </p>
                </div>
              </div>
            </div>
            
            {/* CTA button */}
            <Link href="/signup" className="inline-flex items-center bg-[#ffb400] hover:bg-yellow-500 text-gray-900 font-medium px-6 py-3 rounded-sm transition-colors">
              Get Started Today
              {/* <ArrowRightIcon className="ml-2 h-5 w-5" /> */}
            </Link>
          </div>
          
          {/* Right side images */}
          <div className="hidden md:block md:w-1/2 relative">
            {/* Main image - Lawyer with documents */}
         
              <Image 
                src={image1} 
                alt="Lawyer with documents" 
                className="rounded-md object-cover"
              />
            
            
            {/* Bottom right image - Law book */}
            <div className="absolute right-14 -bottom-9">
              <Image 
                src={image2} 
                alt="Law book" 
                width={200} 
                height={150}
                className="rounded-md object-cover w-40"
              />
            </div>
            
          
            
          </div>
        </div>
      </div>
    </div>
  );
}