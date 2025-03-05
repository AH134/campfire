export type DashboardConfig = {
    services: Service[];
};

export type Service = {
    name: string;
    icon: string;
    items: Item[];
};

export type Item = {
    name: string;
    subtitle: string;
    logo: string;
    url: string;
};
