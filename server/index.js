/*
start server : 
1. npm install express nodemon
2. package.json file add this scripts: 
 "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
3. npm run dev
*/
const express = require("express");
const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors());

// Mock Data (with an invalid timestamp)
const activityLogs = [
  { userId: 1, timestamp: "2025-06-10T12:00:00Z" },
  { userId: 2, timestamp: "2025-06-08T09:00:00Z" },
  { userId: 1, timestamp: "2025-06-20T10:00:00Z" },
  { userId: 3, timestamp: "invalid-date" },
  { userId: 1, timestamp: "2025-06-24T10:00:00Z" },
  { userId: 2, timestamp: "2025-06-22T09:00:00Z" },
  { userId: 1, timestamp: "2025-06-23T08:00:00Z" },
  { userId: 1, timestamp: "2025-06-21T08:00:00Z" },
  { userId: 2, timestamp: "2025-06-22T09:00:00Z" },
  { userId: 1, timestamp: "2025-06-20T08:00:00Z" },
];

// Helper Function: To Filter and Count users
const getMostActiveUser = (logs) => {
  const now = new Date();
  const lastSevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

  const userActivityCount = {};

  for (const log of logs) {
    const date = new Date(log.timestamp);

    // Skip invalid dates
    if (isNaN(date)) continue;

    console.log("date: ", date);

    console.log("lastSevenDaysAgo: ", lastSevenDaysAgo);

    console.log("now: ", now);

    // Count only last 7 days if user is log in
    if (date >= lastSevenDaysAgo && date <= now) {
      const id = log.userId;
      userActivityCount[id] = (userActivityCount[id] || 0) + 1;
      // console.log("userActivityCount [", id, "]:", userActivityCount[id]);
    }
  }

  let topUser = null;
  let topCount = 0;

  for (const id in userActivityCount) {
    if (userActivityCount[id] > topCount) {
      topUser = Number(id);
      topCount = userActivityCount[id];
      console.log("topCount: ", topCount);
    }
  }

  return { userId: topUser, activityCount: topCount };
};

app.get("/", (req, res) => {
  res.json({
    message: "server start successfully",
  });
});

app.get("/most-active-user", (req, res) => {
  const result = getMostActiveUser(activityLogs);
  res.json({
    success: true,
    result,
  });
});

// Start Server command : npm run dev
app.listen(PORT, () => {
  console.log(`Server start running at http://localhost:${PORT}`);
});
