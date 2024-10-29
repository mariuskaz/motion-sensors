import React, { useState, useEffect } from 'react';

const DeviceMotion = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const motionThreshold = 2;

  useEffect(() => {
    const handleMotion = (event) => {
      // Apskaičiuokite pokyčio dydį
      const newAcceleration = {
        x: event.acceleration.x ? event.acceleration.x : 0,
        y: event.acceleration.y ? event.acceleration.y : 0,
        z: event.acceleration.z ? event.acceleration.z : 0,
      };

      // Patikriname, ar pasikeitimas viršija nustatytą slenkstį
      const isSignificantMotion = 
        Math.abs(newAcceleration.x - acceleration.x) > motionThreshold ||
        Math.abs(newAcceleration.y - acceleration.y) > motionThreshold ||
        Math.abs(newAcceleration.z - acceleration.z) > motionThreshold

      // Atnaujinkite tik jei yra reikšmingas judesys
      if (isSignificantMotion) {
        setAcceleration(a => {  
          return {
            x: a.x + newAcceleration.x,
            y: a.y + newAcceleration.y,
            z: a.z + newAcceleration.z,
          }
        });
      }
    };

    window.addEventListener('devicemotion', handleMotion);

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [acceleration, motionThreshold]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Device Motion Data</h1>
      <h2>Acceleration</h2>
      <p>X: {acceleration.x}</p>
      <p>Y: {acceleration.y}</p>
      <p>Z: {acceleration.z}</p>
    </div>
  );
};

export default DeviceMotion;
