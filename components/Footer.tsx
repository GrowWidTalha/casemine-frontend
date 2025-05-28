// components/Footer.tsx
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import logo from '@/public/logo2.png';
import { useRouter } from 'next/navigation';

export default function Footer() {
    const router = useRouter()
  
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Logo and Contact */}
          <div className="col-span-1">
            <div className="mb-6">
              <Image 
              onClick={()=>{
                router.push('/')
              }}
                src={logo}
                alt="GoPro Logo" 
                className="mb-4"
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Eleanor Pena</h3>
            <p className="text-gray-400 mb-2">Know us better!</p>
            <div className="flex flex-col space-y-1">
              <Link href="/signup" className="text-gray-400 hover:text-white">
                Request a Demo
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                Watch Casemine overview
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                Videos
              </Link>
            </div>
          </div>

          {/* Column 2 - About Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-white mb-6">ABOUT US</h3>
            <div className="flex flex-col space-y-4">
              <Link href="/aboutus" className="flex items-center text-white hover:text-white">
                <ChevronRight className="h-4 w-4 mr-2" />
                Mission & Vision
              </Link>
              <Link href="/aboutus" className="flex items-center text-white hover:text-white">
                <ChevronRight className="h-4 w-4 mr-2" />
                Our Comapny
              </Link>
              <Link href="/aboutus" className="flex items-center text-white hover:text-white">
                <ChevronRight className="h-4 w-4 mr-2" />
                Our Projects
              </Link>
              <Link href="/aboutus" className="flex items-center text-white hover:text-white">
                <ChevronRight className="h-4 w-4 mr-2" />
                Our Team
              </Link>
            </div>
          </div>

          {/* Column 3 - Discover */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-white mb-6">DISCOVER</h3>
            <div className="flex flex-col space-y-4">
              <Link href="/ai_research" className="flex items-center text-white hover:text-white">
                <ChevronRight className="h-4 w-4 mr-2" />
                Projects & Research
              </Link>
              <Link href="/messages" className="flex items-center text-white hover:text-white">
                <ChevronRight className="h-4 w-4 mr-2" />
                Messages
              </Link>
              <Link href="/plan" className="flex items-center text-white hover:text-white">
                <ChevronRight className="h-4 w-4 mr-2" />
                Pricing
              </Link>
              <Link href="/recomendation_services" className="flex items-center text-white hover:text-white">
                <ChevronRight className="h-4 w-4 mr-2" />
                AttorneyIQ
              </Link>
            </div>
          </div>

          {/* Column 4 - Useful LinCaseIQks */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-white mb-6">Casemine Tools</h3>
            <div className="flex flex-col space-y-4">
              <Link href="/caseplus" className="flex items-center text-white hover:text-white">
                <ChevronRight className="h-4 w-4 mr-2" />
                Citation Codes
              </Link>
             
              <Link href="/choose_url" className="flex items-center text-white hover:text-white">
                <ChevronRight className="h-4 w-4 mr-2" />
                Judgment Search
              </Link>
              <Link href="/citation" className="flex items-center text-white hover:text-white">
                <ChevronRight className="h-4 w-4 mr-2" />
                Citation Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}