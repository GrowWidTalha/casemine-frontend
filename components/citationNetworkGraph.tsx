// CitationGraph.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { InfoIcon } from "lucide-react";

// ——— API response types ———
export interface ApiResponse {
    citation_legend: Record<string, string>;
    document_id: number;
    relevant_documents: ApiDoc[];
    status: string;
}

export interface ApiDoc {
    citation_details: {
        cited_by: string[];
        cites: string[];
        overruled_by: string[];
    };
    court_type: "Supreme Court" | "High Court" | "Tribunals";
    document_id: number;
    document_name: string;
    explanation: string;
    similarity_score: number;
    snippet: string;
    year: string | number;
}

// ——— Internal node/link types for D3 ———
interface NodeData {
    id: number;
    name: string;
    court: string;
    year: number;
    size: number;
    citedBy: number[];
    cites: number[];
    overruledBy: number[];
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
}

interface LinkData {
    source: number | NodeData;
    target: number | NodeData;
    type: "cites" | "citedBy" | "overruledBy";
}

interface CitationGraphProps {
    response: ApiResponse;
    onNodeClick?: (nodeId: number) => void;
}

// ——— Court color map ———
const courtColorMap: Record<string, string> = {
    "Supreme Court": "#FFD700",
    "High Court": "#ADFF2F",
    Tribunals: "#90EE90",
    External: "#ccc",
};

// ——— Transform API response into D3 nodes & links ———
function transform(api: ApiResponse): { nodes: NodeData[]; links: LinkData[] } {
    const docs = api.relevant_documents;
    // console.log(docs)
    // Build exact lookup
    const nameToId: Record<string, number> = {};
    docs.forEach((d) => {
        nameToId[d.document_name] = d.document_id;
    });

    // Helper to map a citation string → a known document_id (exact or fuzzy)
    function resolveId(citationName: string): number | undefined {
        // 1. exact match
        if (nameToId[citationName] != null) return nameToId[citationName];
        // 2. fuzzy: does any docName appear inside the citation string?
        for (const [docName, id] of Object.entries(nameToId)) {
            if (
                citationName.includes(docName) ||
                docName.includes(citationName) // in case citationName is shorter
            ) {
                return id;
            }
        }
        // 3. no match
        return undefined;
    }

    // Build nodes
    const nodes: NodeData[] = docs.map((d) => {
        // console.log(d)
        const rawYear = typeof d.year === "string" ? parseInt(d.year, 10) : d.year;
        const yearNum = isNaN(rawYear as number)
            ? new Date().getFullYear()
            : (rawYear as number);
        const totalCites =
            d.citation_details.cites.length +
            d.citation_details.cited_by.length +
            d.citation_details.overruled_by.length;
        const size = totalCites <= 1 ? 4 : Math.sqrt(totalCites) * 5 + 10;

        return {
            id: d.document_id,
            name: d.document_name,
            court: d.court_type,
            year: yearNum,
            size,
            cites: [],
            citedBy: [],
            overruledBy: [],
        };
    });

    // Build links (and back‑fill node.cites / node.citedBy arrays)
    const links: LinkData[] = [];
    docs.forEach((d) => {
        const srcId = d.document_id;

        // outgoing cites
        d.citation_details.cites.forEach((nm) => {
            const tgt = resolveId(nm);
            if (tgt != null) {
                links.push({ source: srcId, target: tgt, type: "cites" });
                nodes.find((n) => n.id === srcId)!.cites.push(tgt);
            }
        });

        // incoming citedBy
        d.citation_details.cited_by.forEach((nm) => {
            const srcOfCite = resolveId(nm);
            if (srcOfCite != null) {
                links.push({ source: srcOfCite, target: srcId, type: "citedBy" });
                nodes.find((n) => n.id === srcId)!.citedBy.push(srcOfCite);
            }
        });

        // overruledBy
        d.citation_details.overruled_by.forEach((nm) => {
            const srcOfOverrule = resolveId(nm);
            if (srcOfOverrule != null) {
                links.push({ source: srcOfOverrule, target: srcId, type: "overruledBy" });
                nodes.find((n) => n.id === srcId)!.overruledBy.push(srcOfOverrule);
            }
        });
    });

    return { nodes, links };
}

// ——— CitationGraph component ———
export const CitationGraph: React.FC<CitationGraphProps> = ({ response, onNodeClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [graphData, setGraphData] = useState<{ nodes: NodeData[]; links: LinkData[] }>({
        nodes: [],
        links: [],
    });

    // Transform on new response
    useEffect(() => {
        const adapted = adaptRawToApi(response);
        // Then run your D3 preparation
        console.log(adapted)
        const data = transform(adapted);
        setGraphData(data);
    }, [response]);

    // Measure container


    useEffect(() => {
        const measure = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                });
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    // Draw + interact
    useEffect(() => {
        const { width, height } = dimensions;
        if (!width || !height || graphData.nodes.length === 0) return;

        const margin = { top: 20, right: 20, bottom: 70, left: 50 };
        const svg = d3.select(svgRef.current!).attr("width", width).attr("height", height);
        svg.selectAll("*").remove();

        // Arrowhead defs
        const defs = svg.append("defs");
        defs
            .append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "#aaa");

        defs
            .append("marker")
            .attr("id", "arrow-red")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "red");

        const g = svg.append("g");

        // X scale & axis
        const years = graphData.nodes.map((n) => n.year);
        const xScale = d3
            .scaleLinear()
            .domain([d3.min(years)! - 1, d3.max(years)! + 1])
            .range([margin.left, width - margin.right]);

        const xAxis = svg
            .append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")));
        xAxis.selectAll("text").attr("font-size", "12px").attr("font-weight", "bold");
        xAxis.select(".domain").attr("stroke-width", 2);
        xAxis.selectAll(".tick line").attr("y2", 6).attr("stroke-width", 1);

        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", height - 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .text("Year");

        // Links
        const linkElements = g
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graphData.links)
            .enter()
            .append("line")
            .attr("stroke", (d) => (d.type === "overruledBy" ? "red" : "#aaa"))
            .attr("stroke-width", 0.5)
            .attr("opacity", 0.6)
            .attr("marker-end", (d) =>
                d.type === "overruledBy" ? "url(#arrow-red)" : "url(#arrow)"
            );

        // Nodes
        const nodeElements = g
            .append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graphData.nodes)
            .enter()
            .append("circle")
            .attr("r", (d) => d.size)
            .attr("fill", (d) => courtColorMap[d.court] || courtColorMap.External)
            .attr("stroke", "#333")
            .attr("stroke-width", 1)
            .style("cursor", "pointer")
            .on("click", (event, d) => {
                if (onNodeClick) {
                    onNodeClick(d.id);
                }
            })
            .call(
                d3
                    .drag<SVGCircleElement, NodeData>()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            );

        // Tooltip
        const tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip-container")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("background", "#fff")
            .style("border", "1px solid #ddd")
            .style("padding", "8px")
            .style("border-radius", "4px")
            .style("box-shadow", "0 2px 10px rgba(0,0,0,0.1)")
            .style("pointer-events", "none")
            .style("z-index", "1000");

        // Hover logic
        nodeElements
            .on("mouseover", function (event, d) {
                tooltip
                    .html(`
            <strong>${d.name}</strong><br/>
            Year: ${d.year}<br/>
            Court: ${d.court}<br/>
            Cites: ${d.cites.length}<br/>
            Cited By: ${d.citedBy.length}<br/>
            Overruled By: ${d.overruledBy.length}
          `)
                    .style("visibility", "visible")
                    .style("left", event.pageX + 15 + "px")
                    .style("top", event.pageY - 28 + "px");

                const related = new Set<number>([d.id, ...d.cites, ...d.citedBy, ...d.overruledBy]);
                d3.select(this).attr("stroke", "#ff3e00").attr("stroke-width", 3);

                nodeElements
                    .filter((n) => !related.has(n.id))
                    .transition()
                    .duration(200)
                    .attr("opacity", 0.2);

                nodeElements
                    .filter((n) => n.id !== d.id && related.has(n.id))
                    .attr("stroke", "#ff3e00")
                    .attr("stroke-width", 2);

                linkElements
                    .transition()
                    .duration(200)
                    .attr("opacity", (l) => {
                        const s = typeof l.source === "object" ? l.source.id : l.source;
                        const t = typeof l.target === "object" ? l.target.id : l.target;
                        return s === d.id || t === d.id ? 1 : 0.1;
                    })
                    .attr("stroke-width", (l) => {
                        const s = typeof l.source === "object" ? l.source.id : l.source;
                        const t = typeof l.target === "object" ? l.target.id : l.target;
                        return s === d.id || t === d.id ? 2 : 0.5;
                    })
                    .attr("stroke", (l) => {
                        const s = typeof l.source === "object" ? l.source.id : l.source;
                        const t = typeof l.target === "object" ? l.target.id : l.target;
                        const base = s === d.id || t === d.id ? "#ff3e00" : "#aaa";
                        return l.type === "overruledBy" ? "red" : base;
                    });
            })
            .on("mousemove", (event) => {
                tooltip.style("left", event.pageX + 15 + "px").style("top", event.pageY - 28 + "px");
            })
            .on("mouseout", () => {
                tooltip.style("visibility", "hidden");
                nodeElements
                    .transition()
                    .duration(200)
                    .attr("opacity", 1)
                    .attr("stroke", "#333")
                    .attr("stroke-width", 1);
                linkElements
                    .transition()
                    .duration(200)
                    .attr("opacity", 0.6)
                    .attr("stroke", (l) => (l.type === "overruledBy" ? "red" : "#aaa"))
                    .attr("stroke-width", 0.5);
            });

        // Force simulation
        const simulation = d3
            .forceSimulation<NodeData>(graphData.nodes)
            .force(
                "link",
                d3.forceLink<NodeData, LinkData>().id((d) => d.id).links(graphData.links).distance(100)
            )
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("x", d3.forceX<NodeData>((d) => xScale(d.year)).strength(0.5))
            .force("y", d3.forceY<NodeData>(height / 2).strength(0.1))
            .force("collide", d3.forceCollide<NodeData>((d) => d.size + 5))
            .on("tick", ticked);

        function ticked() {
            linkElements
                .attr("x1", (l) => getPos(l.source, "x"))
                .attr("y1", (l) => getPos(l.source, "y"))
                .attr("x2", (l) => getPos(l.target, "x"))
                .attr("y2", (l) => getPos(l.target, "y"));

            nodeElements
                .attr("cx", (n) => clamp(n.x!, n.size, width))
                .attr("cy", (n) => clamp(n.y!, n.size, height - margin.bottom));
        }

        function getPos(val: number | NodeData, coord: "x" | "y") {
            return typeof val === "object" ? (val[coord] as number) : 0;
        }
        function clamp(val: number, r: number, max: number) {
            return Math.max(r, Math.min(max - r, val));
        }
        function dragstarted(event: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        function dragged(event: any) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        function dragended(event: any) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        // pre‑tick
        for (let i = 0; i < 100; i++) simulation.tick();
        ticked();

        return () => {
            tooltip.remove();
            simulation.stop();
        };
    }, [dimensions, graphData, onNodeClick]);

    return (
        <div ref={containerRef} className="relative w-full h-full">
            <svg ref={svgRef} className="absolute top-0 left-0 w-full h-full" />
            <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="text-blue-400 flex items-center gap-1">
                    <InfoIcon className="h-4 w-4" /> Legend
                </span>
                {/* Court colors */}
                {Object.entries(courtColorMap)
                    .filter(([k]) => k !== "External")
                    .map(([court, color]) => (
                        <div key={court} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                            <span className="text-sm">{court}</span>
                        </div>
                    ))}

                {/* Outgoing arrow */}
                <div className="flex items-center gap-2">
                    <svg width="20" height="8">
                        <defs>
                            <marker
                                id="legend-out"
                                viewBox="0 -5 10 10"
                                refX="10"
                                refY="0"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto"
                            >
                                <path d="M0,-5L10,0L0,5" fill="#333" />
                            </marker>
                        </defs>
                        <line
                            x1="0"
                            y1="4"
                            x2="20"
                            y2="4"
                            stroke="#333"
                            strokeWidth="1"
                            markerEnd="url(#legend-out)"
                        />
                    </svg>
                    <span className="text-sm">Cites (outgoing)</span>
                </div>

                {/* Incoming arrow */}
                <div className="flex items-center gap-2">
                    <svg width="20" height="8">
                        <defs>
                            <marker
                                id="legend-in"
                                viewBox="0 -5 10 10"
                                refX="10"
                                refY="0"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto"
                            >
                                <path d="M0,-5L10,0L0,5" fill="#333" />
                            </marker>
                        </defs>
                        <line
                            x1="20"
                            y1="4"
                            x2="0"
                            y2="4"
                            stroke="#333"
                            strokeWidth="1"
                            markerEnd="url(#legend-in)"
                        />
                    </svg>
                    <span className="text-sm">Cited by (incoming)</span>
                </div>

                {/* Overruled arrow */}
                <div className="flex items-center gap-2">
                    <svg width="20" height="8">
                        <defs>
                            <marker
                                id="legend-red"
                                viewBox="0 -5 10 10"
                                refX="10"
                                refY="0"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto"
                            >
                                <path d="M0,-5L10,0L0,5" fill="red" />
                            </marker>
                        </defs>
                        <line
                            x1="0"
                            y1="4"
                            x2="20"
                            y2="4"
                            stroke="red"
                            strokeWidth="1"
                            markerEnd="url(#legend-red)"
                        />
                    </svg>
                    <span className="text-sm">Overruled By</span>
                </div>
            </div>
        </div>
    );
};


// ——— Raw → ApiResponse adapter ———
function adaptRawToApi(raw: any): ApiResponse {
    const {
        citation_legend,
        document_id,
        status = "ok",
        // if you have a top-level `nodes` array, grab it; otherwise we'll
        // re-use any link objects with an `id` field as doc entries
        nodes: rawNodes,
        links: rawLinks = [],
    } = raw;

    // 1. Gather all doc entries
    const docEntries: any[] = Array.isArray(rawNodes)
        ? rawNodes
        : rawLinks.filter((l: any) => l.id != null);

    // 2. Gather all the relations
    const relationEntries: any[] = rawLinks.filter((l: any) => l.relation != null);

    // 3. Seed a map from doc ID → ApiDoc
    const idToDoc: Record<number, ApiDoc> = {};
    docEntries.forEach((d: any) => {
        idToDoc[d.id] = {
            document_id: d.id,
            document_name: d.name,
            court_type: d.court_type as ApiDoc["court_type"],
            explanation: d.explanation,
            similarity_score: d.similarity_score,
            snippet: d.snippet,
            year: d.year,
            citation_details: {
                cites: [],
                cited_by: [],
                overruled_by: [],
            },
        };
    });

    // 4. Make sure every source/target in relations has at least a stub
    function ensureDoc(id: number) {
        if (!idToDoc[id]) {
            idToDoc[id] = {
                document_id: id,
                document_name: `Doc ${id}`,
                court_type: "Tribunals",   // or "External"
                explanation: "",
                similarity_score: 0,
                snippet: "",
                year: "Unknown",
                citation_details: { cites: [], cited_by: [], overruled_by: [] },
            };
        }
    }

    // 5. Walk the relations and fill in citation_details
    relationEntries.forEach((rel: any) => {
        const { relation, source, target } = rel;
        ensureDoc(source);
        ensureDoc(target);

        const src = idToDoc[source];
        const tgt = idToDoc[target];

        switch (relation) {
            case "cites":
                src.citation_details.cites.push(tgt.document_name);
                tgt.citation_details.cited_by.push(src.document_name);
                break;
            case "cited_by":
                src.citation_details.cited_by.push(tgt.document_name);
                tgt.citation_details.cites.push(src.document_name);
                break;
            case "overruled_by":
                // target was overruled by source
                tgt.citation_details.overruled_by.push(src.document_name);
                break;
        }
    });

    // 6. Return a fully-formed ApiResponse
    return {
        citation_legend,
        document_id,
        status,
        relevant_documents: Object.values(idToDoc),
    };
}
