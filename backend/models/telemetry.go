package models

type Telemetry struct {
	GatewayID   string  `json:"gateway_id"`
	Temperature float64 `json:"temperature"`
	Humidity    float64 `json:"humidity"`
	Status      string  `json:"status"`
	Timestamp   string  `json:"timestamp"`
}
