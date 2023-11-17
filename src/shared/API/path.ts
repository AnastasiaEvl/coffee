import axios from "axios";


class Api {
    private readonly BASE_URL:string = 'http://localhost:3042/';
    protected api
    constructor() {
        this.api = axios.create(
            {baseURL: this.BASE_URL,
                headers: {'X-Custom-Header':'foobar'}}
        )
    }

}
export default Api
