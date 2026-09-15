import http from "http";
import { getAllPublishedRoomsServer } from "../src/utils/publicDataLoader";

// Create a local mock server on port 5999 to test multi-page API pagination contracts
const mockRooms = [
  { id: "1", slug: "deluxe-queen-room", name: "Deluxe Queen Room", price: 160 },
  { id: "2", slug: "deluxe-twin-room", name: "Deluxe Twin Room", price: 175 },
  { id: "3", slug: "family-room", name: "Family Room", price: 210 },
  { id: "4", slug: "business-single-room", name: "Business Single Room", price: 145 },
  { id: "5", slug: "executive-suite", name: "Executive Suite", price: 280 },
];

const mockServer = http.createServer((req, res) => {
  const u = new URL(req.url || "", `http://${req.headers.host}`);
  if (u.pathname === "/api/rooms") {
    const limitParam = parseInt(u.searchParams.get("limit") || "50", 10);
    const offsetParam = parseInt(u.searchParams.get("offset") || "0", 10);

    // Simulate backend server capping max page size to 2 records per request
    const effectiveLimit = Math.min(limitParam, 2);
    const batch = mockRooms.slice(offsetParam, offsetParam + effectiveLimit);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        data: {
          items: batch,
          total: mockRooms.length,
          limit: effectiveLimit,
          offset: offsetParam,
        },
      })
    );
    return;
  }
  res.writeHead(404);
  res.end();
});

async function testPaginationContract() {
  mockServer.listen(5999, async () => {
    console.log("=== MULTI-PAGE PAGINATION CONTRACT TEST STARTING ===");
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://127.0.0.1:5999/api";

    try {
      const rooms = await getAllPublishedRoomsServer();
      console.log(`[PAGINATION TEST] Total rooms retrieved across paginated requests: ${rooms.length}`);
      console.log(`[PAGINATION TEST] Slugs collected: ${rooms.map((r) => r.slug).join(", ")}`);
      if (rooms.length === 5) {
        console.log("[PAGINATION TEST] SUCCESS — All 5 paginated records retrieved across multi-page fetch!");
      } else {
        console.log(`[PAGINATION TEST] FAILED — Expected 5 rooms but received ${rooms.length}`);
      }
    } catch (e: any) {
      console.log(`[PAGINATION TEST] Error: ${e.message}`);
    } finally {
      mockServer.close();
    }
  });
}

testPaginationContract();
