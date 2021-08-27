export class PizzaOrder {
    Crust: string;
    Flavor: string;
    Order_ID: number;
    Size: string;
    Table_No: number;
    Timestamp?: string;
    pizzaSize?: string;
}

export class OrderAuth {
    username: string;
    password: string;
}

export enum Size {
    M = "Medium",
    L = "Large",
    R = "Regular"
}
