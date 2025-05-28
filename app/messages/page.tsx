"use client"
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Copyright from '@/components/Copyright';

const EmailInterface = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
    <Navbar/>
    <div className="flex h-screen px-4 py-10 bg-white relative">
      {/* Sidebar Toggle Button (Shown only before md) */}
      <button
        className="md:hidden absolute top-6 left-7 bg-[#5D3FD3] text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <div
        className={`absolute inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
          <h2 className="text-lg font-medium">Messages</h2>
          {/* Close button for small screens */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <div className="bg-[#5D3FD3] text-white py-2 px-4">
            <span>Inbox</span>
          </div>
          <div className="py-2 px-4 text-gray-600">
            <span>Sent</span>
          </div>
        </div>
      </div>

      {/* Overlay for small screens when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 border border-gray-200 rounded-md overflow-hidden md:ml-4">
        {/* Toolbar */}
        <div className="flex justify-end p-2 border-b border-gray-200">
          <Button
            variant="outline"
            className="bg-[#5D3FD3] text-white hover:bg-purple-700"
          >
            <span className="mr-1">+</span> New Message
          </Button>
        </div>

        {/* Message area */}
        <div className="p-4">
          <div className="border border-gray-200 rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <span className="text-gray-500">
              There are no messages in the selected folder.
            </span>
            <X className="h-4 w-4 text-gray-400 mt-2 sm:mt-0" />
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    <Copyright/>
    </>
  );
};

export default EmailInterface;