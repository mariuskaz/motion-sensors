import React, { useEffect, useState } from 'react';

const DeviceMotionDistance = () => {
    const [distance, setDistance] = useState(0);
    const [lastTimestamp, setLastTimestamp] = useState(Date.now());
    const [velocity, setVelocity] = useState(0);

    useEffect(() => {
        const handleMotionEvent = (event) => {
            const currentTime = Date.now();
            const timeInterval = (currentTime - lastTimestamp) / 1000; // Convert to seconds
            setLastTimestamp(currentTime);

            // Get acceleration in x direction (m/s²)
            const accelerationX = event.accelerationIncludingGravity?.x || 0;

            // Update velocity (v = u + at)
            const newVelocity = velocity + accelerationX * timeInterval;
            setVelocity(newVelocity);

            // Update distance (s = ut + 0.5at²)
            const newDistance = distance + (velocity * timeInterval) + (0.5 * accelerationX * Math.pow(timeInterval, 2));
            setDistance(newDistance);
        };

        // Check for device motion support
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', handleMotionEvent);
        } else {
            console.error("Device Motion is not supported");
        }

        return () => {
            window.removeEventListener('devicemotion', handleMotionEvent);
        };
    }, [lastTimestamp, velocity, distance]);

    return (
        <div>
            <h1>Distance Traveled on X-axis</h1>
            <p>{`Distance: ${distance.toFixed(2)} meters`}</p>
        </div>
    );
};

export default DeviceMotionDistance;