import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);

  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/most-active-user");
      setData(res.data.result);
      console.log("data: ", res.data.result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="App">
      <h1>📊 Most Active User</h1>
      {data ? (
        <div>
          <p>
            <strong>User ID:</strong> {data.userId}
          </p>
          <p>
            <strong>User Activity Count (last 7 days):</strong>{" "}
            {data.activityCount}
          </p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App;
