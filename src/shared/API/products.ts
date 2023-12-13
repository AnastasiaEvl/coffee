import Api from "./path";
import {IProduct} from "../../core/types/IProduct";

class ProductsApi extends Api {
    endpointHot ='coffee'
    endpointCold = 'cold'
    endpointTea = 'tea'

    async fetchHot(): Promise<IProduct[]>{
        const {data} = await this.api.get<IProduct[]>(this.endpointHot)
        return data
    }

    async fetchCold():Promise<IProduct[]>{
        const {data} = await this.api.get<IProduct[]>(this.endpointCold)
        return data
    }

    async fetchTea():Promise<IProduct[]>{
        const {data} = await this.api.get<IProduct[]>(this.endpointTea)
        return data
    }
}

export default new ProductsApi()
