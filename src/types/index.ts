export interface Product {
    id: string;
    name: string;
    brand: string;
    category: "watches" | "glasses";
    price: number;
    description: string;
    features: string[];
    movement?: string;
    material?: string;
    image: string;
}
