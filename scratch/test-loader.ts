import {
  getPublishedRoomBySlugServer,
  getAllPublishedRoomsServer,
  BackendUnavailableError,
} from "../src/utils/publicDataLoader";

async function runLoaderTests() {
  console.log("=== STARTING PUBLIC DATA LOADER CONTRACT AUDIT ===");

  // Test 1: Published room retrieval
  try {
    const room = await getPublishedRoomBySlugServer("deluxe-queen-room");
    console.log(
      `[TEST 1] Published room fetch -> Slug: ${room?.slug || "null"}, Name: ${
        room?.name || "null"
      }`
    );
  } catch (e: any) {
    console.log(`[TEST 1] Published room fetch error: ${e.message}`);
  }

  // Test 2: Missing or unpublished room
  try {
    const room = await getPublishedRoomBySlugServer("non-existent-slug-xyz-999");
    console.log(
      `[TEST 2] Missing/Unpublished room fetch -> Result: ${
        room === null ? "SUCCESS (Returned null for 404)" : room
      }`
    );
  } catch (e: any) {
    console.log(`[TEST 2] Error: ${e.message}`);
  }

  // Test 3: Paginated published rooms list
  try {
    const rooms = await getAllPublishedRoomsServer();
    console.log(
      `[TEST 3] Paginated rooms list fetch -> Total published rooms retrieved: ${rooms.length}`
    );
  } catch (e: any) {
    console.log(`[TEST 3] Rooms list error: ${e.message}`);
  }

  // Test 4: Simulated network / API failure
  try {
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://127.0.0.1:59999/invalid-api";
    await getPublishedRoomBySlugServer("test");
    console.log("[TEST 4] FAILED — Should have thrown BackendUnavailableError");
  } catch (e: any) {
    if (e.name === "BackendUnavailableError" || e instanceof BackendUnavailableError) {
      console.log(
        `[TEST 4] Backend outage simulation -> SUCCESS (Threw distinct error: ${e.message})`
      );
    } else {
      console.log(`[TEST 4] Threw error: ${e.name} - ${e.message}`);
    }
  }
}

runLoaderTests();
