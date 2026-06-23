import { z } from 'zod';

export const DroneTelemetrySchema = z.object({
  id: z.string(),
  batteryLevel: z.number(),
  speed: z.number(),
  altitude: z.number(),
  status: z.enum(['IN_TRANSIT', 'DELIVERING', 'IDLE', 'ERROR']),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  timestamp: z.number()
});

export type DroneTelemetry = z.infer<typeof DroneTelemetrySchema>;
