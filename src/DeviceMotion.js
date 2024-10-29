import React, { useState, useEffect } from 'react';

const DeviceMotion = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [rotationRate, setRotationRate] = useState({ alpha: 0, beta: 0, gamma: 0 });

  // Nustatykite slenkstį, kuris nustato reikšmingą judesį (pvz., 1.5)
  const motionThreshold = 2;

  useEffect(() => {
    const handleMotion = (event) => {
      // Apskaičiuokite pokyčio dydį
      const newAcceleration = {
        x: event.acceleration.x ? event.acceleration.x.toFixed(2) : 0,
        y: event.acceleration.y ? event.acceleration.y.toFixed(2) : 0,
        z: event.acceleration.z ? event.acceleration.z.toFixed(2) : 0,
      };

      const newRotationRate = {
        alpha: event.rotationRate.alpha ? event.rotationRate.alpha.toFixed(2) : 0,
        beta: event.rotationRate.beta ? event.rotationRate.beta.toFixed(2) : 0,
        gamma: event.rotationRate.gamma ? event.rotationRate.gamma.toFixed(2) : 0,
      };

      // Patikriname, ar pasikeitimas viršija nustatytą slenkstį
      const isSignificantMotion = 
        Math.abs(newAcceleration.x - acceleration.x) > motionThreshold ||
        Math.abs(newAcceleration.y - acceleration.y) > motionThreshold ||
        Math.abs(newAcceleration.z - acceleration.z) > motionThreshold ||
        Math.abs(newRotationRate.alpha - rotationRate.alpha) > motionThreshold ||
        Math.abs(newRotationRate.beta - rotationRate.beta) > motionThreshold ||
        Math.abs(newRotationRate.gamma - rotationRate.gamma) > motionThreshold;

      // Atnaujinkite tik jei yra reikšmingas judesys
      if (isSignificantMotion) {
        setAcceleration(newAcceleration);
        setRotationRate(newRotationRate);
      }
    };

    window.addEventListener('devicemotion', handleMotion);

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [acceleration, rotationRate, motionThreshold]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Device Motion Data</h1>
      <h2>Acceleration</h2>
      <p>X: {acceleration.x}</p>
      <p>Y: {acceleration.y}</p>
      <p>Z: {acceleration.z}</p>

      <h2>Rotation Rate</h2>
      <p>Alpha: {rotationRate.alpha}</p>
      <p>Beta: {rotationRate.beta}</p>
      <p>Gamma: {rotationRate.gamma}</p>
    </div>
  );
};

export default DeviceMotion;
