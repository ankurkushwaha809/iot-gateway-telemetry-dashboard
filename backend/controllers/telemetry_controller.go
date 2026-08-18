package controllers

import (
	"encoding/json"
	"net/http"

	"iot-gateway-telemetry/backend/services"
)

type TelemetryController struct {
	service *services.TelemetryService
}

func NewTelemetryController(
	service *services.TelemetryService,
) *TelemetryController {
	return &TelemetryController{
		service: service,
	}
}

func (c *TelemetryController) GetTelemetry(
	w http.ResponseWriter,
	r *http.Request,
) {
	w.Header().Set("Content-Type", "application/json")

	telemetry := c.service.GetTelemetry()

	if err := json.NewEncoder(w).Encode(telemetry); err != nil {
		http.Error(
			w,
			"Failed to encode telemetry",
			http.StatusInternalServerError,
		)

		return
	}
}
