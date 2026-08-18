import React from "react";

function GatewayCard({ gatewayId, reading }) {
  const isOnline = reading?.status === "ONLINE";

  return (
    <div className="gateway-card">

      <div className="gateway-card-header">

        <div>
          <span className="gateway-label">
            GATEWAY
          </span>

          <h3>{gatewayId}</h3>
        </div>

        <span
          className={`gateway-status ${
            isOnline ? "online" : "offline"
          }`}
        >
          <span className="status-dot" />

          {reading?.status || "NO DATA"}
        </span>

      </div>

      <div className="metrics">

        <div className="metric">

          <span className="metric-icon">
            🌡️
          </span>

          <div>
            <span className="metric-label">
              TEMPERATURE
            </span>

            <strong>
              {reading
                ? `${reading.temperature.toFixed(2)}°C`
                : "--"}
            </strong>
          </div>

        </div>

        <div className="metric">

          <span className="metric-icon">
            💧
          </span>

          <div>
            <span className="metric-label">
              HUMIDITY
            </span>

            <strong>
              {reading
                ? `${reading.humidity.toFixed(2)}%`
                : "--"}
            </strong>
          </div>

        </div>

      </div>

      <div className="last-update">

        Last update:

        <span>
          {reading
            ? new Date(
                reading.timestamp
              ).toLocaleTimeString()
            : "--"}
        </span>

      </div>

    </div>
  );
}

export default GatewayCard;