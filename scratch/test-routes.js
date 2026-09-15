const http = require("http");

const BASE_URL = "http://localhost:3000";

const routesToTest = [
  { path: "/", expectedStatus: 200, name: "Homepage" },
  { path: "/rooms", expectedStatus: 200, name: "Rooms Listing" },
  { path: "/rooms/deluxe-queen-room", expectedStatus: 200, name: "Published Room" },
  { path: "/rooms/non-existent-slug-xyz", expectedStatus: 404, name: "Unknown Room Slug" },
  { path: "/robots.txt", expectedStatus: 200, name: "Robots TXT" },
  { path: "/sitemap.xml", expectedStatus: 200, name: "Sitemap XML" },
  { path: "/location", expectedStatus: 308, name: "Legacy Redirect /location" },
  { path: "/activities", expectedStatus: 308, name: "Legacy Redirect /activities" },
  { path: "/meeting", expectedStatus: 308, name: "Legacy Redirect /meeting" },
  { path: "/meeting-room", expectedStatus: 308, name: "Legacy Redirect /meeting-room" },
  { path: "/group", expectedStatus: 308, name: "Legacy Redirect /group" },
  { path: "/admin/login", expectedStatus: 200, name: "Admin Login" },
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http
      .get(BASE_URL + route.path, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          const pass = res.statusCode === route.expectedStatus;
          const location = res.headers.location || "";
          const hasNoIndex = body.includes('name="robots"') && body.includes("noindex");
          resolve({
            name: route.name,
            path: route.path,
            status: res.statusCode,
            expected: route.expectedStatus,
            location,
            hasNoIndex,
            pass,
          });
        });
      })
      .on("error", (err) => {
        resolve({
          name: route.name,
          path: route.path,
          error: err.message,
          pass: false,
        });
      });
  });
}

async function runAll() {
  console.log("=== STARTING HTTP ROUTE AUDIT ===");
  for (const route of routesToTest) {
    const result = await checkRoute(route);
    const statusText = result.pass ? "SUCCESS" : "FAILED";
    console.log(
      `[${statusText}] ${result.name} (${result.path}) -> Received HTTP ${result.status} (Expected ${result.expected})${
        result.location ? " Location: " + result.location : ""
      }${result.hasNoIndex ? " [Contains noindex]" : ""}`
    );
  }
}

runAll();
