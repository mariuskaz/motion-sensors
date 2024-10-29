import React, { useState, useEffect } from 'react';

const DeviceMotion = () => {
  // Saugome dabartinę ir bendrą „x“ akseleracijos reikšmę
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [totalXChange, setTotalXChange] = useState(0); // Bendras x pokytis

  useEffect(() => {
    const handleMotion = (event) => {
      const newX = event.acceleration.x ? event.acceleration.x.toFixed(2) : 0;

      // Apskaičiuojame pokytį ir pridėjome prie bendros vertės
      const xChange = Math.abs(newX - acceleration.x);

      setAcceleration((prev) => ({
        ...prev,
        x: newX
      }));
      
      // Atnaujiname bendrą „x“ pokytį
      setTotalXChange((prevTotal) => prevTotal + xChange);
    };

    window.addEventListener('devicemotion', handleMotion);

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [acceleration.x]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Acceleration</h2>
      <p>X: {acceleration.x}</p>
      <p>Y: {acceleration.y}</p>
      <p>Z: {acceleration.z}</p>

      <h2>Total X Change</h2>
      <p>{totalXChange.toFixed(2)}</p>
    </div>
  );
};
