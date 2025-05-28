// App.tsx
"use client";
import React, { useState } from 'react';
import { Search, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';
import avatar from '@/public/avatar3.png'
import Image from 'next/image';
function App() {
  const [journalSearch, setJournalSearch] = useState('');
  const [journalOptions, setJournalOptions] = useState([
    'AIR',
    'AIR ALD',
    'AIR ALL',
    'AIR AP',
    'AIR ASSAM',
    'AIR ASSAM & NGLD',
    'AIR BHOPAL'
  ]);

  const [yearSearch, setYearSearch] = useState('');
  const [volumeSearch, setVolumeSearch] = useState('');
  const [pageSearch, setPageSearch] = useState('');

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center  min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto w-full">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="text-indigo-600">Citation</span> Code Search
        </h1>

        {/* Search Form */}
        <div className='w-full overflow-x-auto'>

        <div className="border border-gray-300 mb-8 min-w-[700px]">
          {/* Headers */}
          <div className="grid grid-cols-4 border-b border-gray-300">
            <div className="p-3 text-center font-medium border-r border-gray-300">Journal</div>
            <div className="p-3 text-center font-medium border-r border-gray-300">Year</div>
            <div className="p-3 text-center font-medium border-r border-gray-300">Volume</div>
            <div className="p-3 text-center font-medium">Page</div>
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-4">
            {/* Journal */}
            <div className="border-r border-gray-300">
              <div className="p-2 relative">
                <div className="flex items-center border border-gray-300 rounded">
                  <input
                    type="text"
                    placeholder="Search"
                    className="p-2 w-full outline-none"
                    value={journalSearch}
                    onChange={(e) => setJournalSearch(e.target.value)}
                  />
                  <button className="p-2 text-rose-500">
                    <Search size={18} />
                  </button>
                </div>
                <div className="mt-2 max-h-56 overflow-y-auto">
                  {journalOptions.map((journal, index) => (
                    <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                      {journal}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Year */}
            <div className="border-r border-gray-300">
              <div className="p-2">
                <div className="flex items-center border border-gray-300 rounded">
                  <input
                    type="text"
                    placeholder="Search"
                    className="p-2 w-full outline-none"
                    value={yearSearch}
                    onChange={(e) => setYearSearch(e.target.value)}
                  />
                  <button className="p-2 text-rose-500">
                    <Search size={18} />
                  </button>
                </div>
                <div className="mt-2 h-56"></div>
              </div>
            </div>

            {/* Volume */}
            <div className="border-r border-gray-300">
              <div className="p-2">
                <input
                  type="text"
                  className="p-2 w-full border border-gray-300 rounded outline-none"
                  value={volumeSearch}
                  onChange={(e) => setVolumeSearch(e.target.value)}
                />
                <div className="mt-2 h-56"></div>
              </div>
            </div>

            {/* Page */}
            <div>
              <div className="p-2">
                <div className="flex items-center border border-gray-300 rounded">
                  <input
                    type="text"
                    placeholder="Search"
                    className="p-2 w-full outline-none"
                    value={pageSearch}
                    onChange={(e) => setPageSearch(e.target.value)}
                  />
                  <button className="p-2 text-rose-500">
                    <Search size={18} />
                  </button>
                </div>
                <div className="mt-2 h-56"></div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Why Choose Amicus Section */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image src={avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-3">Why Choose Amicus?</h2>
            
            <div className="space-y-2">
              <div className="flex gap-2">
                <Check size={18} className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  <span className="font-medium">Instant Case Recommendations</span> – Get relevant precedents in seconds.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Check size={18} className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  <span className="font-medium">Smart Legal Insights</span> – AI-powered analysis to strengthen your arguments.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Check size={18} className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  <span className="font-medium">Interactive Assistance</span> – Ask legal queries and receive accurate responses.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Check size={18} className="text-green-600 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  <span className="font-medium">Seamless Integration</span> – Works across multiple legal databases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    <Copyright/>
    </>
  );
}

export default App;