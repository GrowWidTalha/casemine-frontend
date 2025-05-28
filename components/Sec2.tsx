// pages/index.tsx
import Head from "next/head";
import Image from "next/image";
// import { CheckIcon } from '@heroicons/react/24/solid';
import { Check as CheckIcon } from "lucide-react";
import lawimage from "@/public/lawimage.png";
import manimg from "@/public/man img in law.png";
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="max-w-[1160px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 relative">
            <div className="rounded-lg overflow-hidden">
              <Image
                src={lawimage}
                alt="Legal scales of justice"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-1/2 space-y-6">
            {/* Badge */}
            <div className="inline-block">
              <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Legal research platform
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Meet Amicus – Your AI-Powered Legal Assistant
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600">
              Amicus, powered by CaseMine, is your AI-driven legal research
              companion, designed to simplify complex legal queries, provide
              intelligent case analysis, and save valuable time.
            </p>

            {/* Why Choose Section */}
            <div className="pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={manimg}
                    alt="Legal professional"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Why Choose Amicus?
                </h2>
              </div>
            </div>

            {/* Feature List */}
            <ul className="space-y-4 lg:ml-12">
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-600">
                  <strong className="font-medium text-gray-900">
                    Instant Case Recommendations
                  </strong>{" "}
                  – Get relevant precedents in seconds.
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-600">
                  <strong className="font-medium text-gray-900">
                    Smart Legal Insights
                  </strong>{" "}
                  – AI-powered analysis to strengthen your arguments.
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-600">
                  <strong className="font-medium text-gray-900">
                    Interactive Assistance
                  </strong>{" "}
                  – Ask legal queries and receive accurate responses.
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="ml-3 text-gray-600">
                  <strong className="font-medium text-gray-900">
                    Seamless Integration
                  </strong>{" "}
                  – Works across multiple legal databases.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
