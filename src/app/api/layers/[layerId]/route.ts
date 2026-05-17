import { NextRequest, NextResponse } from "next/server";

const UMAP_BASE = "https://umap.openstreetmap.fr/en/datalayer/1178661";

// uMap layer UUID for each map layer ID
const UMAP_LAYERS: Record<string, string> = {
    "food-pantries":           "7177b5ee-7dd2-48f3-96ae-11b4ef249cf3",
    "community-kitchens":      "7db596fe-7beb-4ed8-a74a-4603a68199df",
    "food-redistribution":     "53530a60-3761-4221-819f-dcf601d2eac1",
    "community-gardens":       "368987e1-04e4-4e7d-826e-103f18e00cf7",
    "ut-outpost":              "a47b4430-3932-4f14-be76-605260f1b7bb",
    "grocery-stores":          "a135fb5f-154c-44f6-b2b6-e485f9b9976b",
    "transportation-services": "29cc88f3-12ce-4039-a000-edc8f7ef2eee",
    "convenience-stores":      "5bbd4471-708c-47e3-ba92-468e7f1bfe38",
    "family-food-support":     "de484d71-13e7-4c53-8228-1f94e22bf507",
    "seed-libraries":          "c249b229-b382-475e-a836-d224f6a2a351",
};

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ layerId: string }> }
) {
    const { layerId } = await params;
    const uuid = UMAP_LAYERS[layerId];

    if (!uuid) {
        return NextResponse.json({ error: "Unknown layer" }, { status: 404 });
    }

    try {
        const res = await fetch(`${UMAP_BASE}/${uuid}/`, { cache: "no-store" });
        if (!res.ok) throw new Error(`uMap responded with ${res.status}`);
        const geojson = await res.json();
        return NextResponse.json(geojson);
    } catch (err) {
        console.error(`uMap fetch failed for ${layerId}:`, err);
        return NextResponse.json(
            { error: "Failed to fetch layer data" },
            { status: 502 }
        );
    }
}
