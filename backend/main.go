package main

import (
	"log"
	"net/http"

	"github.com/rs/cors"

	"iot-gateway-telemetry/backend/config"
	"iot-gateway-telemetry/backend/controllers"
	"iot-gateway-telemetry/backend/generator"
	"iot-gateway-telemetry/backend/repositories"
	"iot-gateway-telemetry/backend/routes"
	"iot-gateway-telemetry/backend/services"
)

func main() {

	// -----------------------------
	// Repository
	// -----------------------------

	telemetryRepository :=
		repositories.NewTelemetryRepository(
			config.MaxTelemetryReadings,
		)

	// -----------------------------
	// Service
	// -----------------------------

	telemetryService :=
		services.NewTelemetryService(
			telemetryRepository,
		)

	// -----------------------------
	// Controller
	// -----------------------------

	telemetryController :=
		controllers.NewTelemetryController(
			telemetryService,
		)

	// -----------------------------
	// Routes
	// -----------------------------

	mux := http.NewServeMux()

	routes.RegisterRoutes(
		mux,
		telemetryController,
	)

	// -----------------------------
	// Telemetry Generator
	// -----------------------------

	telemetryGenerator :=
		generator.NewTelemetryGenerator(
			telemetryService,
		)

	go telemetryGenerator.Start()

	// -----------------------------
	// CORS
	// -----------------------------

	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5173",
		},
		AllowedMethods: []string{
			"GET",
			"OPTIONS",
		},
		AllowedHeaders: []string{
			"Content-Type",
		},
	})

	handler := corsHandler.Handler(mux)

	// -----------------------------
	// Server
	// -----------------------------

	address :=
		config.ServerHost + ":" + config.ServerPort

	log.Println("=================================")
	log.Println("IoT Telemetry Backend")
	log.Println("=================================")
	log.Println("Server:", "http://"+address)
	log.Println("API:", "http://"+address+"/api/telemetry")
	log.Println("=================================")

	err := http.ListenAndServe(
		address,
		handler,
	)

	if err != nil {
		log.Fatal(err)
	}
}
