export interface Cat {
    id: string;
    url: string;
    breeds?: {
        name?: string;
        origin?: string;
        weight?: { metric: string; imperial: string };
    }[];
}
