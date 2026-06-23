import { Server } from 'socket.io';
import { DroneTelemetry } from '../schemas';

const generateDroneData = (id: string): DroneTelemetry => {
  return {
    id,
    batteryLevel: Math.max(0, 100 - Math.random() * 20), // 80-100%
    speed: Math.floor(Math.random() * 60) + 20, // 20-80 km/h
    altitude: Math.floor(Math.random() * 200) + 50, // 50-250m
    status: Math.random() > 0.8 ? 'DELIVERING' : 'IN_TRANSIT',
    coordinates: {
      lat: 40.7128 + (Math.random() - 0.5) * 0.1,
      lng: -74.0060 + (Math.random() - 0.5) * 0.1
    },
    timestamp: Date.now()
  };
};

export const startMockStream = (io: Server) => {
  console.log('🚀 Starting 60Hz Mock Data Stream over WebSockets...');
  
  // 60Hz means 60 updates per second, which is ~16.6ms interval
  // We'll simulate 5 active drones
  const droneIds = ['DRN-001', 'DRN-002', 'DRN-003', 'DRN-004', 'DRN-005'];
  
  setInterval(() => {
    const data = droneIds.map(id => generateDroneData(id));
    io.emit('telemetry_stream', data);
  }, 1000 / 60); // 60 FPS
};
