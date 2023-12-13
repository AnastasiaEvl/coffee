import {IProduct} from "./IProduct";

export interface IBasket {
    title?: string
    0?: IProduct | undefined
    1?: number
    image: string
}
