import { Controller } from 'controllerim'

export class AppController extends Controller {

    static controllerName = 'AppController'

    constructor(comp) {
        super(comp);

        // get state from localStorage
        this.state = {
            token: localStorage.getItem('token'),
            client: localStorage.getItem('client')
        };

        // TODO: get ENV from server/Webpack
        this.env = {
            'REACT_APP_URL': 'http://localhost:3000'
        }
    }


    getToken() {
        return Promise.resolve(this.state.token);
    }

    setToken(value) {
        this.state.token  = value;
        localStorage.setItem('token', this.state.token);
    }

    getClient() {
        return Promise.resolve(this.state.client);
    }

    setClient(value) {
        this.state.client  = value;
        localStorage.setItem('client', this.state.client);
    }

    getEnv(key) {
        return this.env[key]
    }
}
