import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Hammer from '@/public/hammerimg_2.png'
import Image from 'next/image';
const LegalDocumentApp = () => {
  // Filter categories data
  const filterCategories = [
    { id: 'practice-areas', label: 'Practice Areas' },
    { id: 'all-courts', label: 'All Courts' },
    { id: 'judge-iq', label: 'Judge IQ' },
    { id: 'other-filters', label: 'Other Filters' }
  ];

  // Sub-filter data
  const subFilters = [
    { id: 'graphical-view', label: 'Graphical View' },
    { id: 'citations-found', label: 'Citations Found' }
  ];

  // Bottom filters data
  const bottomFilters = [
    { id: 'suggested-precedents', label: 'Suggested Precedents' },
    { id: 'suggested-arguments', label: 'Suggested Arguments' },
    { id: 'nyayamitra', label: 'NYAYAMITRA', subLabel: 'Powered by GPT4' }
  ];

  // Form fields
  const formFields = [
    { id: 'first-name', label: 'First Name', type: 'text' },
    { id: 'last-name', label: 'Last Name', type: 'text' },
    { id: 'email', label: 'Email Address *', type: 'email' },
    { id: 'phone', label: 'Phone Number *', type: 'tel' },
    { id: 'subject', label: 'Subject *', type: 'text' },
    { id: 'message', label: 'Message', type: 'textarea' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      {/* Top Navigation */}
      <div className="flex flex-wrap justify-between gap-4 mb-8">
        {filterCategories.map((category) => (
          <div
            key={category.id}
            className="flex-1 bg-[#FFB400] text-black px-4 py-3 rounded-md font-medium text-center shadow-md border border-yellow-400"
          >
            {category.label}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="w-full md:w-3/5">
        <div className='flex flex-wrap sm:justify-between items-center'>

          <h2 className="text-2xl font-bold mb-2">Uploaded Documents</h2>
          
          <div className="flex gap-2 mb-4">
            {subFilters.map((filter) => (
              <button
                key={filter.id}
                className="bg-[#5D3FD3] text-white px-4 py-1 rounded-md text-sm"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

          <p className="mb-4 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
            Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
            unknown printer took a galley of type and scrambled it to make a type specimen 
            book. It has survived not only five centuries, but also the leap into electronic.
          </p>

          <div className="mb-6">
            <Image 
              src={Hammer} 
              alt="Legal scales and gavel" 
              className="w-full  object-cover"
            />
          </div>

          <h2 className="text-xl font-bold mb-4">Uploaded Document</h2>
          
          <p className="mb-6 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
            Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
            unknown printer took a galley of type and scrambled it to make a type specimen 
            book. It has survived not only five centuries, but also the leap into electronic Lorem 
            Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
            has been the industry's standard dummy text ever since the 1500s, when an 
            unknown printer took a galley of type and scrambled it to make a type specimen 
            book. It has survived not only five centuries, but also the leap into electronic.
          </p>

          <div className="bg-[#c6b8fe] p-4 mb-6 relative">
            <div className="text-red-600 text-6xl absolute -top-4 left-1/2 transform -translate-x-1/2 ">"</div>
            <p className="pl-6 text-sm italic">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
              Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
              unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries, but also the leap into electronic typesetting.
            </p>
            <div className="text-center mt-2">
              <p className="font-bold text-sm">Lorem Ipsum</p>
              <p className="text-xs">Lorem Ipsum alias 12</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <Button className="bg-[#5D3FD3] hover:bg-purple-700 text-white">Edit Document</Button>
            <Button className="bg-white border border-gray-300 text-black hover:bg-gray-100">Print</Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-2/5">
          <div className="bg-[#E4DDFF] p-6 rounded-sm">
            <h3 className="text-center text-black font-bold mb-4">Do Contact If Face Any Issue?</h3>
            <form className="space-y-3">
              {formFields.map((field) => (
                <div key={field.id}>
                  {/* <label className="block text-sm text-gray-700 mb-1">{field.label}</label> */}
                  {field.type === 'textarea' ? (
                    <Textarea
                    placeholder={field.label}
                      className="w-full border border-gray-200 rounded-sm h-24 bg-white"
                    />
                  ) : (
                    <Input 
                      type={field.type}
                      placeholder={field.label}
                      className="w-full border border-gray-200 rounded-sm bg-white" 
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-center">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase px-6">Send</Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Filters */}
      <div className="flex justify-end gap-2 mt-6">
        {bottomFilters.map((filter) => (
          <button
            key={filter.id}
            className="bg-[#5D3FD3] text-white px-4 py-2 rounded-md text-sm relative"
          >
            {filter.label}
            {filter.subLabel && (
              <div className="text-[9px] absolute bottom-0 left-0 right-0 text-center text-purple-200">
                {filter.subLabel}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LegalDocumentApp;