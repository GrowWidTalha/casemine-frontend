import { CitationGraph } from '@/components/citationNetworkGraph'
import React from 'react'

const apiResponse = {
    "citation_legend": {
        "incoming": "Cited by - Other cases that reference this document",
        "outgoing": "Cites - Cases that this document references",
        "overruled_by": "Overruled By - Cases that have overturned this document's ruling",
        "year": "Year - The year when this judgment was delivered"
    },
    "document_id": 47,
    "relevant_documents": [
        {
            "citation_details": {
                "cited_by": [],
                "cites": [
                    "Ram Lila Maidan Incident",
                    "Anuradha Bhasin v. Union of India",
                    "Babulal Parate v. State of Maharashtra",
                    "Feiner v. New York"
                ],
                "overruled_by": []
            },
            "court_type": "High Court",
            "document_id": 1,
            "document_name": "Article 226 in Constitution of India",
            "explanation": "The user document discusses the use of a writ of mandamus under Article 226 of the Constitution of India, which is the subject of the database article.",
            "similarity_score": 0.7,
            "snippet": "<h2 class=\"doc_title\">Article 226 in Constitution of India</h2>\n\n<section class=\"akn-section\" id=\"section_226\"><h3>226. Power of High Courts to issue certain writs</h3>\n<section class=\"akn-subsection\" id=\"section_226.1\"><span class=\"akn-num\"><a href=\"/doc/452476/\">(1)</a></span><span class=\"akn-cont...",
            "year": "2025"
        },
        {
            "citation_details": {
                "cited_by": [
                    "Unknown"
                ],
                "cites": [
                    "A.K. Gopalan v. The State of Madras",
                    "R.C. Cooper v. Union of India",
                    "Kharak Singh v. State of Uttar Pradesh",
                    "Maneka Gandhi v. Union of India",
                    "Olga Tellis v. Bombay Municipal Corporation"
                ],
                "overruled_by": [
                    "Unknown"
                ]
            },
            "court_type": "High Court",
            "document_id": 2,
            "document_name": "Article 21 in Constitution of India",
            "explanation": "The user document discusses judicial oversight of police action under Section 144 CrPC and its impact on fundamental rights, which aligns with the protections under Article 21 of the Indian Constitution regarding life and personal liberty.",
            "similarity_score": 0.7,
            "snippet": "<h2 class=\"doc_title\">Article 21 in Constitution of India</h2>\n\n<section class=\"akn-section\" id=\"section_21\"><h3>21. Protection of life and personal liberty</h3>\n<span class=\"akn-content\"><span class=\"akn-p\">No person shall be deprived of his life or personal liberty except according to procedure es...",
            "year": "2025"
        },
        {
            "citation_details": {
                "cited_by": [
                    "Ram Lila Maidan Incident",
                    "Anuradha Bhasin v. Union of India",
                    "Babulal Parate v. State of Maharashtra (AIR 1961 SC 884)"
                ],
                "cites": [
                    "State of U.P. v. Deoman Upadhyaya 1960",
                    "E.P. Royappa v. State of Tamil Nadu, 1974",
                    "S.G. Jaisinghani v. Union of India",
                    "Maneka Gandhi v. Union of India, 1978"
                ],
                "overruled_by": []
            },
            "court_type": "High Court",
            "document_id": 3,
            "document_name": "Article 14 in Constitution of India",
            "explanation": "The user document discusses judicial oversight of police action under Section 144 CrPC and cites principles of equality and non-arbitrariness, which are central to Article 14 in the database article.",
            "similarity_score": 0.7,
            "snippet": "<h2 class=\"doc_title\">Article 14 in Constitution of India</h2>\n\n<section class=\"akn-section\" id=\"section_14\"><h3>14. Equality before law</h3>\n<span class=\"akn-content\"><span class=\"akn-p\">The State shall not deny to any person equality before the law or the equal protection of the laws within the te...",
            "year": "2025"
        },
        {
            "citation_details": {
                "cited_by": [
                    "Ram Lila Maidan Incident",
                    "Anuradha Bhasin v. Union of India"
                ],
                "cites": [
                    "Brij Bhushan v State of Delhi",
                    "Romesh Thappar v State of Madras"
                ],
                "overruled_by": []
            },
            "court_type": "High Court",
            "document_id": 13,
            "document_name": "Article 19 in Constitution of India",
            "explanation": "The user document discusses judicial oversight of police action under Section 144 CrPC in relation to fundamental rights, which directly connects to Article 19's provisions on freedom of speech and assembly.",
            "similarity_score": 0.7,
            "snippet": "<h2 class=\"doc_title\">Article 19 in Constitution of India</h2>\n\n<section class=\"akn-section\" id=\"section_19\"><h3>19. Protection of certain rights regarding freedom of speech, etc.</h3>\n<section class=\"akn-subsection\" id=\"section_19.1\"><span class=\"akn-num\"><a href=\"/doc/1142233/\">(1)</a></span><span...",
            "year": "2025"
        },
        {
            "citation_details": {
                "cited_by": [
                    "Unknown"
                ],
                "cites": [
                    "Ram Lila Maidan Incident",
                    "Anuradha Bhasin v. Union of India",
                    "Babulal Parate v. State of Maharashtra",
                    "Feiner v. New York"
                ],
                "overruled_by": [
                    "Unknown"
                ]
            },
            "court_type": "High Court",
            "document_id": 15,
            "document_name": "Article 32 in Constitution of India",
            "explanation": "The user document discusses a writ of mandamus under Article 226, while the database article explains Article 32 which also includes mandamus as a remedy for enforcing fundamental rights, making them legally related.",
            "similarity_score": 0.7,
            "snippet": "<h2 class=\"doc_title\">Article 32 in Constitution of India</h2>\n\n<section class=\"akn-section\" id=\"section_32\"><h3>32. Remedies for enforcement of rights conferred by this Part</h3>\n<section class=\"akn-subsection\" id=\"section_32.1\"><span class=\"akn-num\"><a href=\"/doc/846967/\">(1)</a></span><span class...",
            "year": "2025"
        }
    ],
    "status": "Success"
}

const TestPage = async () => {
    return (
        <div
            className="relative border border-purple-300 rounded-sm h-[500px] bg-white overflow-auto"
            style={{ padding: 0 }}
        >

            {/* ForceGraph itself */}
            <div className="w-full h-full">
                {/* @ts-ignore */}
                <CitationGraph response={apiResponse} />
            </div>
        </div>
    )
}

export default TestPage
