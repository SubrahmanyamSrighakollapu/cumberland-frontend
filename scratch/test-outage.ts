import {
  getPublishedRoomBySlugServer,
  getAllPublishedRoomsServer,
  BackendUnavailableError,
} from "../src/utils/publicDataLoader";

async function testOutageHandling() {
  console.log("=== STARTING OUTAGE DISAMBIGUATION TEST ===");
  // Force backend URL to an unreachable port to simulate CMS API outage
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://127.0.0.1:59998/api";

  // Test 1: Room request during API outage
  try {
    await getPublishedRoomBySlugServer("deluxe-queen-room");
    console.log("[OUTAGE TEST 1] FAILED — Should have thrown BackendUnavailableError");
  } catch (e: any) {
    if (e.name === "BackendUnavailableError" || e instanceof BackendUnavailableError) {
      console.log(`[OUTAGE TEST 1] SUCCESS — Threw distinct BackendUnavailableError: "${e.message}"`);
    } else {
      console.log(`[OUTAGE TEST 1] FAILED — Unexpected error: ${e.name} ${e.message}`);
    }
  }

  // Test 2: Sitemap rooms list request during API outage
  try {
    await getAllPublishedRoomsServer();
    console.log("[OUTAGE TEST 2] FAILED — Should have thrown BackendUnavailableError");
  } catch (e: any) {
    if (e.name === "BackendUnavailableError" || e instanceof BackendUnavailableError) {
      console.log(`[OUTAGE TEST 2] SUCCESS — Threw distinct BackendUnavailableError: "${e.message}"`);
    } else {
      console.log(`[OUTAGE TEST 2] FAILED — Unexpected error: ${e.name} ${e.message}`);
    }
  }
}

testOutageHandling();
