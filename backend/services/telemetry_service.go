package services

import (
	"iot-gateway-telemetry/backend/models"
	"iot-gateway-telemetry/backend/repositories"
)

type TelemetryService struct {
	repository *repositories.TelemetryRepository
}

func NewTelemetryService(
	repository *repositories.TelemetryRepository,
) *TelemetryService {
	return &TelemetryService{
		repository: repository,
	}
}

func (s *TelemetryService) AddTelemetry(
	reading models.Telemetry,
) {
	s.repository.Add(reading)
}

func (s *TelemetryService) GetTelemetry() []models.Telemetry {
	return s.repository.GetAll()
}
