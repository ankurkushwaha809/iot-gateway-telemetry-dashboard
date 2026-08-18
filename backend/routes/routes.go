package routes

import (
	"net/http"

	"iot-gateway-telemetry/backend/controllers"
)

func RegisterRoutes(
	mux *http.ServeMux,
	controller *controllers.TelemetryController,
) {
	mux.HandleFunc(
		"/api/telemetry",
		controller.GetTelemetry,
	)
}
