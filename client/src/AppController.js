import { Controller } from 'controllerim'

export class AppController extends Controller {

    static controllerName = 'AppController'

    constructor(comp) {
        super(comp);
        this.state = {
            token: null,
            client: null
        };

        // TODO: get ENV from server/Webpack
        this.env = {
            'REACT_APP_URL': 'http://localhost:3000'
        }
    }

    getToken() {
        return this.state.token;
    }

    setToken(value) {
        this.state.token  = value;
    }

    getClient() {
        return this.state.client;
    }

    setClient(value) {
        this.state.token  = value;
    }

    getEnv(key) {
        return this.env[key]
    }
}
