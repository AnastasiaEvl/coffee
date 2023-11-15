import Api from "./path";
import {IProduct} from "../Types/InterfaceProduct";

class ProductsApi extends Api {
    endpointHot ='hot'
    endpointCold = 'iced'

    async fetchHot(): Promise<IProduct[]>{
        const {data} = await this.api.get<IProduct[]>(this.endpointHot)
        return data
    }

    async fetchCold():Promise<IProduct[]>{
        const {data} = await this.api.get<IProduct[]>(this.endpointCold)
        return data
    }
}

export default new ProductsApi()
