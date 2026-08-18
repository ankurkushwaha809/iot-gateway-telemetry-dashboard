import React, { useCallback, useEffect, useState } from "react";
import GatewayCard from "./components/GatewayCard";
import TelemetryTable from "./components/TelemetryTable";
import "./App.css";

const API_URL = "http://localhost:8080/api/telemetry";

const GATEWAYS = [
  "gateway-01",
  "gateway-02",
  "gateway-03",
];

function App() {
  const [telemetry, setTelemetry] = useState([]);
  const [selectedGateway, setSelectedGateway] = useState("ALL");
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTelemetry = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch telemetry");
      }

      const data = await response.json();

      setTelemetry(data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry();

    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      fetchTelemetry();
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchTelemetry, isPaused]);

  const getLatestReading = (gatewayId) => {
    const gatewayReadings = telemetry.filter(
      (item) => item.gateway_id === gatewayId
    );

    if (gatewayReadings.length === 0) {
      return null;
    }

    return gatewayReadings[gatewayReadings.length - 1];
  };

  const filteredTelemetry =
    selectedGateway === "ALL"
      ? telemetry
      : telemetry.filter(
          (item) => item.gateway_id === selectedGateway
        );

  const latestReadings = [...filteredTelemetry]
    .sort(
      (a, b) =>
        new Date(b.timestamp) -
        new Date(a.timestamp)
    )
    .slice(0, 10);

  return (
    <div className="app">

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">IoT MONITORING</p>

          <h1>Gateway Telemetry Dashboard</h1>

          <p className="subtitle">
            Real-time monitoring of IoT gateway sensor data
          </p>
        </div>

        <div className="connection-status">
          <span
            className={`status-dot ${
              error ? "offline" : "online"
            }`}
          />

          {error ? "Backend Offline" : "Backend Connected"}
        </div>
      </header>

      {/* Error */}
      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      {/* Gateway Cards */}
      <section className="metrics-section">

        <div className="section-heading">
          <div>
            <h2>Gateway Status</h2>

            <p>
              Current telemetry for each gateway
            </p>
          </div>
        </div>

        <div className="gateway-grid">

          {GATEWAYS.map((gateway) => (
            <GatewayCard
              key={gateway}
              gatewayId={gateway}
              reading={getLatestReading(gateway)}
            />
          ))}

        </div>
      </section>

      {/* Controls */}
      <section className="controls">

        <div className="filter-control">
          <label htmlFor="gateway">
            Gateway
          </label>

          <select
            id="gateway"
            value={selectedGateway}
            onChange={(e) =>
              setSelectedGateway(e.target.value)
            }
          >
            <option value="ALL">
              All Gateways
            </option>

            {GATEWAYS.map((gateway) => (
              <option
                key={gateway}
                value={gateway}
              >
                {gateway}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`pause-button ${
            isPaused ? "resume" : ""
          }`}
          onClick={() =>
            setIsPaused((previous) => !previous)
          }
        >
          {isPaused
            ? "▶ Resume Live Updates"
            : "Ⅱ Pause Live Updates"}
        </button>

      </section>

      {/* Historical Table */}
      <section className="table-section">

        <div className="section-heading">

          <div>
            <h2>Latest Readings</h2>

            <p>
              Showing the latest 10 telemetry readings
            </p>
          </div>

          {!isPaused && (
            <div className="live-indicator">
              <span />
              LIVE
            </div>
          )}

        </div>

        {loading ? (
          <div className="empty-state">
            Loading telemetry...
          </div>
        ) : latestReadings.length === 0 ? (
          <div className="empty-state">
            No telemetry available
          </div>
        ) : (
          <TelemetryTable
            readings={latestReadings}
          />
        )}

      </section>

      {/* Footer */}
      <footer>
        <span>
          IoT Gateway Telemetry
        </span>

        <span>
          Polling interval: 2 seconds
        </span>
      </footer>

    </div>
  );
}

export default App;