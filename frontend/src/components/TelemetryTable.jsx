import React from "react";

function TelemetryTable({ readings }) {
  return (
    <div className="table-container">

      <table>

        <thead>
          <tr>
            <th>Gateway</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>

        <tbody>

          {readings.map((reading, index) => {

            const isOnline =
              reading.status === "ONLINE";

            return (
              <tr
                key={`${reading.gateway_id}-${reading.timestamp}-${index}`}
              >

                <td>
                  <span className="gateway-name">
                    {reading.gateway_id}
                  </span>
                </td>

                <td>
                  {reading.temperature.toFixed(2)}°C
                </td>

                <td>
                  {reading.humidity.toFixed(2)}%
                </td>

                <td>

                  <span
                    className={`table-status ${
                      isOnline
                        ? "online"
                        : "offline"
                    }`}
                  >
                    <span className="status-dot" />

                    {reading.status}
                  </span>

                </td>

                <td className="timestamp">
                  {new Date(
                    reading.timestamp
                  ).toLocaleString()}
                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}

export default TelemetryTable;