import axios from "axios";


class Api {
    private readonly BASE_URL:string = 'https://api.sampleapis.com/coffee/';
    protected api
    constructor() {
        this.api = axios.create(
            {baseURL: this.BASE_URL,
                headers: {'X-Custom-Header':'foobar'}}
        )
    }

}
export default Api
