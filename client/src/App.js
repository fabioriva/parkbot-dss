import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Client from "./Client";
import Monitor from "./Monitor";

export default function App() {
  const [data, setData] = useState({ online: false, monitors: [] });

  useEffect(() => {
    const interval = setInterval(() => {
      Client.fetch((json) => setData(json));
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="App text-center">
      <Routes>
        {/* {data.monitors !== undefined && data.monitors.map((monitor, key) => console.log(key, monitor))} */}
        <Route path="/" element={<Navigate to="/a" />} />
        <Route
          path="a"
          element={<Monitor online={data.online} monitor={data.monitors[0]} />}
        />
        <Route
          path="b"
          element={<Monitor online={data.online} monitor={data.monitors[1]} />}
        />
        <Route
          path="c"
          element={<Monitor online={data.online} monitor={data.monitors[2]} />}
        />
      </Routes>
    </div>
  );
}
