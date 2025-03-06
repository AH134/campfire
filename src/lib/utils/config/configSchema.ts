import { z } from "zod";

export const ServiceItemSchema = z.object({
    name: z.string(),
    subtitle: z.string(),
    logo: z.string(),
    url: z.string(),
    target: z.string(),
});

export const DashboardServiceSchema = z.object({
    name: z.string(),
    icon: z.string(),
    items: z.array(ServiceItemSchema),
});

export const DashboardConfigSchema = z.object({
    services: z.array(DashboardServiceSchema),
});

export type ServiceItem = z.infer<typeof ServiceItemSchema>;
export type Service = z.infer<typeof DashboardServiceSchema>;
export type DashboardConfig = z.infer<typeof DashboardConfigSchema>;
