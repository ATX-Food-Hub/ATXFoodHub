"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

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
                layers: [
                    {
                        id: "osm",
                        type: "raster",
                        source: "osm"
                    }
                ]
            },
            center: [-97.7431, 30.2849], // UT Austin center
            zoom: 13,
        });

        map.current.on("load", async () => {
            if (!map.current) return;

            for (const layer of LAYERS) {
                try {
                    const response = await fetch(`/data/${layer.id}.json`);
                    const data = await response.json();

                    map.current.addSource(layer.id, {
                        type: "geojson",
                        data: data,
                    });

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

                        new maplibregl.Popup()
                            .setLngLat((e as any).lngLat)
                            .setHTML(`
                <div class="p-2 text-black">
                  <h3 class="font-bold text-lg border-b mb-2">${props.name || "Resource"}</h3>
                  ${props.description ? `<p class="mb-2">${props.description}</p>` : ""}
                  ${props.Address ? `<p class="text-sm"><b>Address:</b> ${props.Address}</p>` : ""}
                  ${props.Hours ? `<p class="text-sm"><b>Hours:</b> ${props.Hours}</p>` : ""}
                  ${props.Website ? `<p class="mt-2"><a href="${props.Website}" target="_blank" class="text-blue-600 underline">Website</a></p>` : ""}
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

        return () => {
            map.current?.remove();
        };
    }, []);

    return (
        <div className="w-full h-full relative rounded-xl overflow-hidden shadow-lg border-2 border-primary/20">
            <div ref={mapContainer} className="w-full h-full" />

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/90 p-4 rounded-lg shadow-md text-black text-xs max-h-[80%] overflow-y-auto z-10 hidden sm:block">
                <h4 className="font-bold mb-2 text-sm border-b pb-1">Map Legend</h4>
                <div className="flex flex-col gap-2">
                    {LAYERS.map((layer) => (
                        <div key={layer.id} className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: layer.color }}></span>
                            <span>{layer.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
