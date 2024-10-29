import React, { useState, useEffect } from 'react';

const DeviceMotion = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [rotationRate, setRotationRate] = useState({ alpha: 0, beta: 0, gamma: 0 });

  useEffect(() => {
    const handleMotion = (event) => {
      setAcceleration({
        x: event.acceleration.x.toFixed(2),
        y: event.acceleration.y.toFixed(2),
        z: event.acceleration.z.toFixed(2),
      });

      setRotationRate({
        alpha: event.rotationRate.alpha.toFixed(2),
        beta: event.rotationRate.beta.toFixed(2),
        gamma: event.rotationRate.gamma.toFixed(2),
      });
    };

    window.addEventListener('devicemotion', handleMotion);

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, []);

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
