"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Eye, EyeOff, X } from "lucide-react";

const LAYERS = [
    { id: "food-pantries", name: "Food Pantries", color: "#B22222" },
    { id: "community-kitchens", name: "Community Kitchens", color: "#FFD700" },
    { id: "food-redistribution", name: "Food Redistribution Points", color: "#D3D3D3" },
    { id: "community-gardens", name: "Community Gardens", color: "#228B22" },
    { id: "ut-outpost", name: "UT Outpost", color: "#FF8C00" },
    { id: "grocery-stores", name: "Grocery Stores", color: "#87CEEB" },
    { id: "transportation-services", name: "Transportation Services", color: "#000080" },
    { id: "convenience-stores", name: "Convenience Stores", color: "#9932CC" },
    { id: "family-food-support", name: "Food Support for Families", color: "#FFDEAD" },
    { id: "seed-libraries", name: "Seed Libraries", color: "#A9A9A9" },
];

export default function MapComponent() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);

    //state to track which layers/resources are visible
    //sets all layers to visible by default
    const [visibleLayers, setVisibleLayers] = useState<Record<string, boolean>>(
        Object.fromEntries(LAYERS.map(layer => [layer.id, true]))
    );

    //state to track whether the learn more panel is open or closed
    const [panelOpen, setPanelOpen] = useState(false);

    //used to toggle visibility of layer/resource (turn it off or on)
    const toggleLayer = (id: string) => {
        setVisibleLayers(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    useEffect(() => {
        if (!mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: {
                version: 8,
                sources: {
                    osm: {
                        type: "raster",
                        tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
                        tileSize: 256,
                        attribution: "&copy; OpenStreetMap Contributors",
                        maxzoom: 19
                    }
                },
                layers: [{ id: "osm", type: "raster", source: "osm" }]
            },
            center: [-97.7431, 30.2849],
            zoom: 13,
        });

        map.current.on("load", async () => {
            if (!map.current) return;

            for (const layer of LAYERS) {
                try {
                    const response = await fetch(`/data/${layer.id}.json`);
                    const data = await response.json();

                    map.current.addSource(layer.id, { type: "geojson", data });

                    map.current.addLayer({
                        id: `${layer.id}-circle`,
                        type: "circle",
                        source: layer.id,
                        paint: {
                            "circle-radius": 8,
                            "circle-color": layer.color,
                            "circle-stroke-width": 2,
                            "circle-stroke-color": "#ffffff",
                        },
                    });

                    // Add popups
                    map.current.on("click", `${layer.id}-circle`, (e) => {
                        if (!e.features || !e.features[0]) return;
                        const feature = e.features[0];
                        const props = feature.properties as any;
                        const lngLat = (e as any).lngLat;

                        // Pan map so popup blurb fits on screen
                        map.current!.panTo(lngLat, { duration: 300 });

                        new maplibregl.Popup({ maxWidth: "300px" })
                            .setLngLat(lngLat)
                            .setHTML(`
                                    <div style="font-family: Georgia, serif; color: #1a1a1a; padding: 4px 2px;">
                                      <h3 style="font-size: 1rem; font-weight: 700; border-bottom: 1px solid #ccc; padding-bottom: 6px; margin-bottom: 8px;">${props.name || "Resource"}</h3>
                                      ${props.description ? `<p style="font-size: 0.85rem; margin-bottom: 8px; line-height: 1.4;">${props.description}</p>` : ""}
                                      ${props.Address ? `<p style="font-size: 0.8rem; margin-bottom: 4px;"><strong>Address:</strong> ${props.Address}</p>` : ""}
                                      ${props.Hours ? `<p style="font-size: 0.8rem; margin-bottom: 8px;"><strong>Hours:</strong> ${props.Hours}</p>` : ""}
                                      ${props.Website ? `<p style="margin-top: 10px;"><a href="${props.Website}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #e4fc94; color: #1a1a1a; font-family: Georgia, serif; font-size: 0.85rem; font-weight: 700; padding: 6px 14px; border-radius: 6px; text-decoration: none; border: 1.5px solid #c8e664; transition: background 0.2s;">Learn More →</a></p>` : ""}
                                    </div>
                                  `)
                            .addTo(map.current!);
                    });

                    // Change cursor on hover
                    map.current.on("mouseenter", `${layer.id}-circle`, () => {
                        map.current!.getCanvas().style.cursor = "pointer";
                    });
                    map.current.on("mouseleave", `${layer.id}-circle`, () => {
                        map.current!.getCanvas().style.cursor = "";
                    });
                } catch (error) {
                    console.error(`Error loading layer ${layer.id}:`, error);
                }
            }
        });

        return () => { map.current?.remove(); };
    }, []);

        //update map when layer visibility changes
        useEffect(() => {
            if (!map.current) return;
            for (const layer of LAYERS) {
                const visibility = visibleLayers[layer.id] ? "visible" : "none";
                if (map.current.getLayer(`${layer.id}-circle`)) {
                    map.current.setLayoutProperty(`${layer.id}-circle`, "visibility", visibility);
                }
            }
        }, [visibleLayers]);

        return (
            <div className="w-full h-full relative rounded-xl overflow-hidden shadow-lg border-2 border-primary/20">
                <div ref={mapContainer} className="w-full h-full" />


            {/* Learn More Button */}
            <button

                //open panel when button is clicked, or close it if it's already open
                onClick={() => {

                    if (panelOpen) {
                        setPanelOpen(false);
                    }
                    else {
                        setPanelOpen(true);
                    }
                }}

                style={{
                    position: "absolute",
                    bottom: "155px",
                    right: "16px",
                    backgroundColor: "#e4fc94",
                    color: "#1a1a1a",
                    fontFamily: "Georgia, serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    padding: "8px 76.5px",
                    borderRadius: "9px",
                    border: "1.5px solid #c8e664",
                    cursor: "pointer",
                    zIndex: 10,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
            >
                Learn More
            </button>

            {/* Slide-in Info Panel */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: panelOpen ? 0 : "-350px",
                    width: "330px",
                    height: "100%",
                    backgroundColor: "white",
                    zIndex: 20,
                    transition: "left 0.3s ease",
                    overflowY: "auto",
                    padding: "24px 20px",
                    boxShadow: panelOpen ? "4px 0 12px rgba(0,0,0,0.15)" : "none",
                    fontFamily: "Georgia, serif",
                    color: "#1a1a1a",
                    fontSize: "0.85rem",
                    lineHeight: "1.6",
                }}
            >
                {/* Close Button */}
                <button
                    onClick={() => setPanelOpen(false)}
                    style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#1a1a1a",
                    }}
                >
                    <X size={20} />
                </button>

                {/* Panel Content */}
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "12px", paddingRight: "24px" }}>
                    About This Map
                </h2>

                <p style={{ marginBottom: "16px" }}>
                    This interactive map highlights the various food resources available in and around UT Austin to alleviate the effects of food insecurity.
                </p>

                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "8px" }}>
                    Other Programs that Can Help
                </h3>
                <p style={{ marginBottom: "8px", fontStyle: "italic", fontSize: "0.8rem" }}>
                    Introducing SNAP, WIC, Fresh for Less Farmers Markets, Double Up Food Bucks, and More!
                </p>

                <p style={{ marginBottom: "16px" }}>
                    Need help accessing free groceries? Check out our{" "}
                    <a href="https://docs.google.com/document/d/13nLb7B-QnNZ6cIhCTdMHXwizMWp9QQ8kNPO3wpbNnv0/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
                        Resource Guide
                    </a>
                    , which provides a detailed list of federal and local programs that support low-income and pregnant/postpartum individuals. It includes application instructions and contact information to help you get started.
                </p>

                <p style={{ marginBottom: "16px" }}>
                    UT Outpost offers SNAP application assistance through one-on-one sessions with trained staff and student volunteers. These sessions walk you through the application process, help gather necessary documents, and answer questions to make applying easier. You can{" "}
                    <a href="https://deanofstudents.utexas.edu/sos/ut-outpost-snap-benefits.php" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
                        register for a SNAP session with UT Outpost here
                    </a>.
                </p>

                <p style={{ marginBottom: "16px" }}>
                    Join the UT Free Food channel to get alerts when leftover food is available after campus events! To join, click{" "}
                    <a href="https://my.utexas.edu/student/ut_free_food/index" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
                        here
                    </a>
                    . If you have a valid SNAP EBT card, you can also shop for SNAP-eligible groceries on Amazon, Amazon Fresh, and Whole Foods. No Prime membership is required. Plus, you qualify for Amazon Access, which offers exclusive savings, a 50% discount on Prime, and free grocery delivery on orders over $35 with a 90-day free trial (just $4.99/month after). You can add your EBT/SNAP card to Amazon using this{" "}
                    <a href="https://www.amazon.com/b?node=19097785011&linkCode=sl2&tag=thefreebieg0e-20&linkId=22769746c559732b6a566259362a47c0&language=en_US&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
                        link
                    </a>.
                </p>

                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "8px" }}>
                    Additional Resources Beyond UT Services
                </h3>
                <p style={{ marginBottom: "8px" }}>Explore these websites to discover other local support options not affiliated with UT ⬇️</p>
                <ul style={{ paddingLeft: "16px", marginBottom: "16px" }}>
                    <li style={{ marginBottom: "6px" }}>
                        <a href="https://www.findhelp.org/" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
                            https://www.findhelp.org/
                        </a>
                    </li>
                    <li style={{ marginBottom: "6px" }}>
                        <a href="https://unitedwayaustin.org/connectatx/" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
                            https://unitedwayaustin.org/connectatx/
                        </a>
                    </li>
                    <li style={{ marginBottom: "6px" }}>
                        <a href="https://www.centraltexasfoodbank.org/food-assistance/get-food" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
                            https://www.centraltexasfoodbank.org/food-assistance/get-food
                        </a>
                    </li>
                </ul>
            </div>

            {/* Legend */}

            <div className="absolute top-4 right-4 bg-white/90 p-4 rounded-lg shadow-md text-black text-xs max-h-[80%] overflow-y-auto z-10 block">
                <h4 className="font-bold mb-2 text-sm border-b pb-1">Map Legend</h4>
                <div className="flex flex-col gap-2">
                    {LAYERS.map((layer) => (
                        <div
                            key={layer.id}
                            className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-100 px-1 py-1 rounded"
                            onClick={() => toggleLayer(layer.id)}
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-3 h-3 rounded-full border border-black/20"
                                    style={{ backgroundColor: layer.color }}
                                ></span>
                                <span>{layer.name}</span>
                            </div>
                            <span style={{ color: visibleLayers[layer.id] ? "black" : "gray", marginLeft: "8px" }}>
                                {visibleLayers[layer.id] ? <Eye size={16} /> : <EyeOff size={16} />}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
