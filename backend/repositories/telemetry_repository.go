package repositories

import (
	"sync"

	"iot-gateway-telemetry/backend/models"
)

type TelemetryRepository struct {
	readings []models.Telemetry
	maxSize  int
	mu       sync.RWMutex
}

func NewTelemetryRepository(maxSize int) *TelemetryRepository {
	return &TelemetryRepository{
		readings: make([]models.Telemetry, 0, maxSize),
		maxSize:  maxSize,
	}
}

func (r *TelemetryRepository) Add(reading models.Telemetry) {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.readings = append(r.readings, reading)

	if len(r.readings) > r.maxSize {
		r.readings = r.readings[len(r.readings)-r.maxSize:]
	}
}

func (r *TelemetryRepository) GetAll() []models.Telemetry {
	r.mu.RLock()
	defer r.mu.RUnlock()

	result := make([]models.Telemetry, len(r.readings))

	copy(result, r.readings)

	return result
}
