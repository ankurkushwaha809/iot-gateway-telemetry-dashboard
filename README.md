# IoT Gateway Telemetry Mini-Dashboard

An end-to-end, lightweight, and modern IoT Gateway Telemetry monitoring dashboard built for the **Red Neuron Lab Pvt. Ltd.** technical assessment. 

The application consists of a **Go (Golang)** backend that simulates real-time device telemetry data and serves it via a REST API, and a **React (Vite)** frontend dashboard that visualizes the gateway statuses, temperatures, humidities, and live readings in a clean, professional user interface.

---

## 🚀 Key Features

* **Real-time Gateway Status**: Visual cards indicating the online/offline status, current temperatures, and humidity levels for active gateways (`gateway-01`, `gateway-02`, and `gateway-03`).
* **Live Telemetry Table**: Chronological table displaying incoming telemetry payloads, updated in real-time.
* **Auto-Cleaning Buffer (FIFO)**: The backend automatically caps in-memory storage to the latest 30 readings (configurable) to prevent memory bloating.
* **Background Telemetry Generator**: A non-blocking background goroutine that simulates realistic telemetry fluctuations every 2 seconds.
* **Responsive Web Design**: Clean, dark-themed responsive layout optimized for all device viewports.
* **Dockerized Setup**: Multi-container setup configuration using Docker and Docker Compose.

---

## 🛠️ Technology Stack

* **Backend**: Go (Golang) v1.22+, `net/http` standard library, `github.com/rs/cors` for handling cross-origin requests.
* **Frontend**: React.js, Vite, Vanilla CSS.
* **Containerization**: Docker, Docker Compose.

---

## 📁 Repository Structure

```text
├── backend/
│   ├── config/          # Configurations (ports, limits)
│   ├── controllers/     # API request handlers (JSON encoders)
│   ├── generator/       # Background Goroutine generating mock device data
│   ├── models/          # Structures & schemas (Telemetry struct)
│   ├── repositories/    # In-memory storage with mutex lock thread safety
│   ├── routes/          # Endpoints mapping (/api/telemetry)
│   ├── services/        # Business logic layer
│   ├── Dockerfile       # Container build instructions for backend
│   └── main.go          # Application setup, wiring, & HTTP listener
│
├── frontend/
│   ├── src/
│   │   ├── components/  # GatewayCards, TelemetryTable, etc.
│   │   └── ...
│   ├── Dockerfile       # Container build instructions for frontend
│   └── ...
│
└── docker-compose.yml   # Multi-container orchestra definition
```

---

## ⚙️ Getting Started

You can run the application either using **Docker Compose**  or **manually**.

### Option A: Running with Docker Compose

Make sure you have Docker and Docker Compose installed on your system.

1. **Clone the repository** (or navigate to the workspace root):
   ```bash
   git clone https://github.com/ankurkushwaha809/iot-gateway-telemetry-dashboard.git
   cd iot-gateway-telemetry-dashboard
   ```

2. **Spin up the containers**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   * **Frontend Dashboard**: [http://localhost:5173](http://localhost:5173)
   * **Backend API**: [http://localhost:8080/api/telemetry](http://localhost:8080/api/telemetry)

---

### Option B: Running Manual Setup (Without Docker)

Ensure you have **Go (v1.22+)** and **Node.js (v18+)** installed.

#### 1. Setup Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   go mod tidy
   ```
3. Run the Go server:
   ```bash
   go run main.go
   ```
   *The backend will start listening at `http://localhost:8080`.*

#### 2. Setup Frontend
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the Node packages:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:5173](http://localhost:5173) in your browser.*

---

## 🔒 Concurrency & Thread Safety

The backend utilizes `sync.RWMutex` (Read-Write Mutex) in the repository layer to guarantee safe concurrent reads and writes. Since the data generator goroutine writes telemetry data asynchronously while incoming REST API calls read data concurrently, the mutex prevents data race conditions and ensures memory safety.
