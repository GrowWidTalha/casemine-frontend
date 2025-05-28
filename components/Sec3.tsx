// pages/index.tsx
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>AI-Powered Legal Research & Case Management</title>
        <meta name="description" content="Legal research and case management platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-[1160px] mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Legal Research &<br />
            Case Management
          </h1>
          <p className="max-w-3xl mx-auto text-gray-600">
            Streamline your legal workflow with intelligent search, case visualization, and efficient
            management—powered by AI for accuracy and speed.
          </p>
        </div>

        {/* Top Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* AMICUS */}
          <div className="flex flex-col">
            <h2 className="text-xl font-medium text-indigo-600 mb-4">AMICUS</h2>
            <p className="text-gray-700 text-justify max-w-xs ">
              AMICUS is an AI-powered legal assistant that streamlines research, strengthens
              arguments, and simplifies case management. Stay ahead with smart,
              precise legal insights.
            </p>
          </div>

          {/* CaseIQ */}
          <div className="flex flex-col">
            <h2 className="text-xl font-medium text-indigo-600 mb-4">CaseIQ</h2>
            <p className="text-gray-700 text-justify max-w-xs">
              CaseIQ delivers precise legal search results, while CiteTEXT enhances
              arguments with court language. Case Visualization maps case connections,
              and Case Management streamlines hearings and workflows.
            </p>
          </div>

          {/* CiteTEXT */}
          <div className="flex flex-col">
            <h2 className="text-xl font-medium text-indigo-600 mb-4">CiteTEXT</h2>
            <p className="text-gray-700 text-justify max-w-xs">
              Strengthen arguments with court ing CiteTEXT, uncover case law patterns
              with Case Visualization, and streamline hearings and workflows with Case
              Management.
            </p>
          </div>
        </div>

        {/* Bottom Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {/* Case Visualization */}
          <div className="flex flex-col md:mx-auto">
            <h2 className="text-xl font-medium text-indigo-600 mb-4">Case Visualization</h2>
            <p className="text-gray-700 text-justify max-w-xs">
              Convert relationships into insights by easily mapping linkages between case
              laws. Discover details, nuances or patterns not visible using traditional
              search approaches. Prioritize relevant case laws from thousands of search
              results by taking a holistic view.
            </p>
          </div>

          {/* Case Management */}
          <div className="flex flex-col md:mx-auto">
            <h2 className="text-xl font-medium text-indigo-600 mb-4">Case Management</h2>
            <p className="text-gray-700 text-justify max-w-xs">
              Easily manage the increasing number of hearings as well as multiplicity of client
              requirements in a single location using a convenient interface. Effortlessly
              allocate tasks among your colleagues, associates, and interns, track workflow
              and measure progress.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}