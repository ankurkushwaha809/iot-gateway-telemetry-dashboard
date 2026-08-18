package generator

import (
	"math/rand"
	"time"

	"iot-gateway-telemetry/backend/models"
	"iot-gateway-telemetry/backend/services"
)

type TelemetryGenerator struct {
	service  *services.TelemetryService
	gateways []string
}

func NewTelemetryGenerator(
	service *services.TelemetryService,
) *TelemetryGenerator {
	return &TelemetryGenerator{
		service: service,
		gateways: []string{
			"gateway-01",
			"gateway-02",
			"gateway-03",
		},
	}
}

func (g *TelemetryGenerator) Start() {
	ticker := time.NewTicker(2 * time.Second)

	defer ticker.Stop()

	for {
		<-ticker.C

		g.generateReadings()
	}
}

func (g *TelemetryGenerator) generateReadings() {
	for _, gatewayID := range g.gateways {

		reading := models.Telemetry{
			GatewayID:   gatewayID,
			Temperature: randomTemperature(),
			Humidity:    randomHumidity(),
			Status:      randomStatus(),
			Timestamp:   time.Now().UTC().Format(time.RFC3339),
		}

		g.service.AddTelemetry(reading)
	}
}

func randomTemperature() float64 {
	return 20 + rand.Float64()*15
}

func randomHumidity() float64 {
	return 40 + rand.Float64()*40
}

func randomStatus() string {
	if rand.Float64() < 0.9 {
		return "ONLINE"
	}

	return "OFFLINE"
}
