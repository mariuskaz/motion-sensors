import React, { useState, useEffect } from 'react';

const DeviceMotion= () => {
  const [distance, setDistance] = useState(0);
  const [prevPosition, setPrevPosition] = useState(null);

  // Haversine formulė atstumui tarp dviejų koordinačių skaičiuoti
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);
    const earthRadius = 6371e3; // Žemės spindulys metrais

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c; // Atstumas metrais
  };

  useEffect(() => {
    // Naudojame Geolocation API sekimui
    const handlePosition = (position) => {
      const { latitude, longitude } = position.coords;

      if (prevPosition) {
        // Apskaičiuojame atstumą tarp dabartinės ir ankstesnės vietos
        const segmentDistance = calculateDistance(
          prevPosition.latitude,
          prevPosition.longitude,
          latitude,
          longitude
        );

        setDistance((prevDistance) => prevDistance + segmentDistance);
      }

      setPrevPosition({ latitude, longitude });
    };

    const handleError = (error) => {
      console.error("Error fetching location:", error);
    };

    // Pradedame vietos stebėjimą
    const watchId = navigator.geolocation.watchPosition(handlePosition, handleError, {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    });

    // Sustabdyti stebėjimą komponentui atsijungus
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [prevPosition]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Distance Traveled</h1>
      <p>{(distance / 100).toFixed(2)} meters</p>
    </div>
  );
};

export default DeviceMotion;
