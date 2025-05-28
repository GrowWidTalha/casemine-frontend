"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { searchArticles } from "@/lib/api-service"
import { Loader2 } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import Copyright from "@/components/Copyright"

interface SearchResult {
    id: number
    name: string
    snippet: string
    match_type: string
}

const SearchResultsClient = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get("q")
    const [results, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [totalMatches, setTotalMatches] = useState(0)

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                const response = await searchArticles(query)
                if (response.status === "Success") {
                    setResults(response.results)
                    setTotalMatches(response.total_matches)
                } else {
                    setError("Failed to fetch results")
                }
            } catch (err) {
                setError("An error occurred while fetching results")
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [query])

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex min-h-[60vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                </div>
            )
        }

        if (error) {
            return (
                <div className="flex min-h-[60vh] items-center justify-center">
                    <p className="text-red-500">{error}</p>
                </div>
            )
        }

        if (!query) {
            return (
                <div className="flex min-h-[60vh] items-center justify-center">
                    <p className="text-gray-500">Please enter a search query</p>
                </div>
            )
        }

        if (results.length === 0) {
            return (
                <div className="flex min-h-[60vh] items-center justify-center">
                    <p className="text-gray-500">No results found for "{query}"</p>
                </div>
            )
        }

        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Search Results for "{query}"
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Found {totalMatches} matching results
                    </p>
                </div>

                <div className="space-y-6">
                    {results.map((result) => (
                        <div
                            key={result.id}
                            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <h2 className="mb-2 text-xl font-semibold text-gray-900">
                                {result.name}
                            </h2>
                            <p className="mb-4 text-sm text-gray-600">{result.match_type}</p>
                            <div
                                className="prose prose-sm text-gray-700"
                                dangerouslySetInnerHTML={{ __html: result.snippet }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50">
                {renderContent()}
            </main>
            <Footer />
            <Copyright />
        </>
    )
}

const SearchResults = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResultsClient />
        </Suspense>
    )
}

export default SearchResults;
