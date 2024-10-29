import React, { useState, useEffect } from 'react';

const DeviceMotion = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [distance, setDistance] = useState({ x: 0, y: 0, z: 0 });
  const [lastTime, setLastTime] = useState(null);

  useEffect(() => {
    const handleMotion = (event) => {
      const currentTime = Date.now();

      // Tikriname, ar turime ankstesnį laiko žingsnį
      if (lastTime) {
        const deltaTime = (currentTime - lastTime) / 1000; // Laikas sekundėmis

        const newAcceleration = {
          x: event.acceleration.x || 0,
          y: event.acceleration.y || 0,
          z: event.acceleration.z || 0,
        };

        // Integruojame akseleraciją, kad gautume greitį
        const newVelocity = {
          x: velocity.x + newAcceleration.x * deltaTime,
          y: velocity.y + newAcceleration.y * deltaTime,
          z: velocity.z + newAcceleration.z * deltaTime,
        };

        // Integruojame greitį, kad gautume atstumą
        const newDistance = {
          x: distance.x + newVelocity.x * deltaTime,
          y: distance.y + newVelocity.y * deltaTime,
          z: distance.z + newVelocity.z * deltaTime,
        };

        setAcceleration(newAcceleration);
        setVelocity(newVelocity);
        setDistance(newDistance);
      }

      // Atnaujiname paskutinį laiko žingsnį
      setLastTime(currentTime);
    };

    window.addEventListener('devicemotion', handleMotion);

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [lastTime, velocity, distance]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Estimated Distance Traveled</h1>
      <p>X: {distance.x.toFixed(2)} meters</p>
      <p>Y: {distance.y.toFixed(2)} meters</p>
      <p>Z: {distance.z.toFixed(2)} meters</p>
    </div>
  );
};

export default DeviceMotion;
