"use client";
import { Suspense, useEffect, useState } from "react";
import balanceimg from "@/public/balanceimggraphicalview.png";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  BookOpen,
  Scale,
  Gavel,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import {
  CitationGraph,
  type ApiResponse as CitationApiResponse,
} from "@/components/citationNetworkGraph";
// Define types for our API response
interface CitationDetails {
  cited_by: string[];
  cites: string[];
  overruled_by: string[];
}

interface RelevantDocument {
  citation_details: CitationDetails;
  court_type: string;
  document_id: number;
  document_name: string;
  explanation: string;
  similarity_score: number;
  snippet: string;
}

interface ApiResponse {
  citation_legend: Record<string, string>;
  document_id: number;
  relevant_documents: RelevantDocument[];
  status: string;
  nodes?: any[]; // Add this line
}

interface DocumentResponse {
  document: {
    facts: string;
    filename: string;
    holding: string;
    id: number;
    issues: string;
    petitioner_arguments: string;
    respondent_arguments: string;
    reasoning: string;
  };
  status: string;
}

const LegalDocumentAppClient = () => {
  const [relevantData, setRelevantData] = useState<ApiResponse | null>(null);
  const [documentData, setDocumentData] = useState<DocumentResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("uploaded-document");
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const searchParams = useSearchParams();

  const documentId = searchParams.get("documentId");

  useEffect(() => {
    const fetcher = async () => {
      const cacheKey = `relevantData_${documentId}`;
      const cache = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      const oneHour = 60 * 60 * 1000; // 1 hour in ms

      // Check if cache is valid (less than 1 hour old)
      if (cache && cacheTimestamp) {
        const timestamp = Number.parseInt(cacheTimestamp);
        if (Date.now() - timestamp < oneHour) {
          const parsedData = JSON.parse(cache);
          setRelevantData(parsedData.relevantData);
          setDocumentData(parsedData.documentData);
          return;
        }
      }

      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (selectedCourt) params.append("court_types", selectedCourt);
        if (selectedYear) {
          params.append("start_year", selectedYear);
          params.append("end_year", selectedYear);
        }
        // Fetch relevant data
        const [relevantResponse, docResponse] = await Promise.all([
          fetch(
            process.env.NEXT_PUBLIC_BACKEND_URL +
              `/find-relevant-ai/${documentId}?${params.toString()}`
          ),
          fetch(
            process.env.NEXT_PUBLIC_BACKEND_URL + `/document/${documentId}`
          ),
        ]);

        if (!relevantResponse.ok) {
          throw new Error("Failed to fetch relevant data");
        }

        const relevant = await relevantResponse.json();
        const docData = docResponse.ok ? await docResponse.json() : null;

        // Update state
        setRelevantData(relevant);
        setDocumentData(docData);

        // Save to localStorage
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            relevantData: relevant,
            documentData: docData,
          })
        );
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally set error state here
      } finally {
        setLoading(false);
      }
    };

    if (documentId || selectedCourt || selectedYear) {
      fetcher();
    }
  }, [documentId, selectedCourt, selectedYear]);

  // Filter categories data
  const filterCategories = [
    { id: "practice-areas", label: "Practice Areas" },
    { id: "all-courts", label: "All Courts" },
    { id: "judge-iq", label: "Judge IQ" },
    { id: "other-filters", label: "Other Filters" },
  ];

  // Sub-filter data
  const subFilters = [
    { id: "uploaded-document", label: "Uploaded Document" },
    { id: "graphical-view", label: "Graphical View" },
    { id: "citations-found", label: "Citations Found" },
  ];

  // Bottom filters data
  const bottomFilters = [
    { id: "suggested-precedents", label: "Suggested Precedents" },
    { id: "suggested-arguments", label: "Suggested Arguments" },
    { id: "nyayamitra", label: "NYAYAMITRA", subLabel: "Powered by GPT4" },
  ];

  // Content sections data
  const contentSections = [
    {
      id: 1,
      title: "Lorem Ipsum Lorem Ipsum",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.",
      hasImage: true,
    },
    {
      id: 2,
      title: "Lorem Text",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
      author: "Lorem Ipsum",
      authorSubtext: "Lorem Ipsum simply",
      hasQuote: true,
      bgColor: "bg-purple-50",
    },
    {
      id: 3,
      title: "Lorem Text",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
      author: "Lorem Ipsum",
      authorSubtext: "Lorem Ipsum simply",
      hasQuote: true,
      bgColor: "bg-white",
    },
    {
      id: 4,
      title: "Lorem Text",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
      author: "Lorem Ipsum",
      authorSubtext: "Lorem Ipsum simply",
      hasQuote: true,
      bgColor: "bg-purple-50",
    },
  ];

  // Form fields
  const formFields = [
    { id: "first-name", label: "First Name", type: "text" },
    { id: "last-name", label: "Last Name", type: "text" },
    { id: "email", label: "Email Address *", type: "email" },
    { id: "phone", label: "Phone Number *", type: "tel" },
    { id: "subject", label: "Subject *", type: "text" },
    { id: "message", label: "Message", type: "textarea" },
  ];

  // Format the issues, arguments, and reasoning with proper line breaks
  const formatText = (text: string) => {
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-2">
        {line}
      </p>
    ));
  };

  // Render the document content
  const renderDocument = () => {
    if (!documentData) return <p>No document available</p>;

    const { document } = documentData;

    return (
      <div className="space-y-6">
        <div className="bg-purple-50 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-2 text-purple-900">
            {document.filename}
          </h2>
          <p className="text-sm text-gray-500">Document ID: {document.id}</p>
        </div>

        <Card>
          <CardHeader className="bg-purple-100">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> Facts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">{document.facts}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-purple-100">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-sm">{formatText(document.issues)}</div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="bg-blue-100">
              <CardTitle className="flex items-center gap-2 text-base">
                <ArrowRight className="h-5 w-5" /> Petitioner Arguments
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-sm">
                {formatText(document.petitioner_arguments)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-orange-100">
              <CardTitle className="flex items-center gap-2 text-base">
                <ArrowLeft className="h-5 w-5" /> Respondent Arguments
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-sm">
                {formatText(document.respondent_arguments)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="bg-green-100">
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" /> Reasoning
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-sm">{formatText(document.reasoning)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-yellow-100">
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5" /> Holding
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">{document.holding}</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderCitationsList = () => {
    if (!relevantData?.relevant_documents && !relevantData?.nodes)
      return <p className="text-center">No citations available</p>;

    // Handle the data structure from the snippet
    if (relevantData?.nodes) {
      return (
        <div className="space-y-4">
          {relevantData.nodes.map((doc, index) => (
            <div
              key={doc.id}
              id={`citation-${doc.id}`}
              className="p-4 border rounded-lg bg-white hover:border-purple-500 transition-colors"
            >
              <h3 className="font-semibold text-lg">{doc.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{doc.court_type}</p>
              <div
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{
                  __html: doc.snippet.substring(0, 150) + "...",
                }}
              />
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">
                  Similarity: {(doc.similarity_score * 100).toFixed(1)}%
                </Badge>
                {doc.year && doc.year !== "Unknown" && (
                  <Badge variant="outline">Year: {doc.year}</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Handle the original data structure
    if (relevantData?.relevant_documents) {
      return (
        <div className="space-y-4">
          {relevantData.relevant_documents.map((doc, index) => (
            <div
              key={doc.document_id}
              id={`citation-${doc.document_id}`}
              className="p-4 border rounded-lg bg-white hover:border-purple-500 transition-colors"
            >
              <h3 className="font-semibold text-lg">{doc.document_name}</h3>
              <p className="text-sm text-gray-600 mt-1">{doc.court_type}</p>
              <p className="text-sm mt-2">{doc.snippet}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">
                  Cites: {doc.citation_details.cites.length}
                </Badge>
                <Badge variant="outline">
                  Cited by: {doc.citation_details.cited_by.length}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <p className="text-center">No citations available</p>;
  };

  // Render the appropriate content based on the active tab
  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="border border-purple-300 rounded-sm h-80 p-4 bg-white flex items-center justify-center">
          <p>Loading...</p>
        </div>
      );
    }

    switch (activeTab) {
      case "uploaded-document":
        return renderDocument();
      case "graphical-view":
        return (
          <div className="border rounded-lg p-4 h-[calc(100vh-200px)]">
            {relevantData && (
              <CitationGraph
                response={relevantData as unknown as CitationApiResponse}
                onNodeClick={(nodeId) => {
                  const element = document.getElementById(`citation-${nodeId}`);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    element.classList.add("bg-yellow-100");
                    setTimeout(() => {
                      element.classList.remove("bg-yellow-100");
                    }, 2000);
                  }
                }}
              />
            )}
          </div>
        );
      case "citations-found":
        return (
          <div className="border rounded-lg p-4 h-[calc(100vh-200px)] overflow-y-auto">
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                Citations are now displayed on the right side panel
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 bg-white">
        {/* Top Navigation */}
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          {/* Practice Areas - Static */}
          <div className="flex-1 bg-[#fdcc55] text-black px-4 py-3 rounded-md font-medium text-center shadow-md">
            Practice Areas
          </div>

          {/* All Courts - Dropdown */}
          <div className="flex-1">
            <select
              value={selectedCourt}
              onChange={(e) => setSelectedCourt(e.target.value)}
              className="w-full bg-[#fdcc55] text-black px-4 py-3 rounded-md font-medium shadow-md"
            >
              <option value="">All Courts</option>
              <option value="Supreme Court">Supreme Court</option>
              <option value="High Court">High Court</option>
            </select>
          </div>

          {/* Judge IQ - Static */}
          <div className="flex-1 bg-[#fdcc55] text-black px-4 py-3 rounded-md font-medium text-center shadow-md">
            Judge IQ
          </div>

          {/* Other Filters - Year Dropdown */}
          <div className="flex-1">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-[#fdcc55] text-black px-4 py-3 rounded-md font-medium shadow-md"
            >
              <option value="">All Years</option>
              {Array.from({ length: 2025 - 2000 + 1 }, (_, i) => 2025 - i).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Sub Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {subFilters.map((filter) => (
            <button
              key={filter.id}
              className={`${
                activeTab === filter.id ? "bg-[#4D2DB7]" : "bg-[#5D3FD3]"
              } text-white px-4 py-2 rounded-md font-medium`}
              onClick={() => setActiveTab(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Document Visualization */}
          <div className="w-full md:w-3/5">{renderTabContent()}</div>

          {/* Citations List - Always show on the right side */}
          <div className="w-full md:w-2/5">
            <div className="bg-[#E4DDFF] p-6 rounded-sm h-full overflow-y-auto">
              <h3 className="text-center text-black font-bold mb-4">
                Citations Found
              </h3>
              {renderCitationsList()}
            </div>
          </div>
        </div>

        {/* Bottom Filters */}
        <div className="flex flex-wrap gap-2 mt-8">
          {bottomFilters.map((filter) => (
            <button
              key={filter.id}
              className="bg-[#5D3FD3] text-white px-6 py-2.5 rounded-md font-medium relative"
            >
              {filter.label}
              {filter.subLabel && (
                <div className="text-xs absolute -bottom-0 left-0 right-0 text-center text-purple-200">
                  {filter.subLabel}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="font-bold text-2xl mb-4">
              {contentSections[0].title}
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed">
              {contentSections[0].content}
            </p>
          </div>
          <div className="flex items-center justify-center overflow-hidden">
            <Image
              src={balanceimg || "/placeholder.svg"}
              alt="Legal scales"
              className=""
            />
          </div>
        </div>

        {/* Content Sections */}
        {contentSections.slice(1).map((section) => (
          <div
            key={section.id}
            className={`${section.bgColor} py-8 px-6 mb-8 flex flex-col md:flex-row gap-8`}
          >
            <div className="w-full md:w-2/3">
              <h3 className="font-bold text-2xl mb-4">{section.title}</h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                {section.content}
              </p>
            </div>
            {section.hasQuote && (
              <div className="w-full md:w-1/3 bg-white p-6 rounded-sm shadow-sm">
                <div className="relative">
                  <div className="text-red-600 text-4xl absolute -left-4 -top-4">
                    "
                  </div>
                  <p className="text-sm italic text-gray-800 mb-4">
                    {section.quote}
                  </p>
                  <div>
                    <p className="text-right text-sm font-semibold">
                      {section.author}
                    </p>
                    <p className="text-right text-xs text-gray-600">
                      {section.authorSubtext}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

const LegalDocumentApp = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LegalDocumentAppClient />
    </Suspense>
  );
};

export default LegalDocumentApp;
