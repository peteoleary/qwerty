import { Controller } from 'controllerim'

export class AppController extends Controller {

    static controllerName = 'AppController'

    constructor(comp) {
        super(comp);

        // get state from localStorage
        this.state = {
            token: localStorage.getItem('token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
            env: comp.env
        }
    }


    getToken() {
        return (this.state.token);
    }

    getUid() {
        return (this.state.uid);
    }

    getClient() {
        return (this.state.client);
    }

    setToken(value) {
        this.state.token  = value;
        localStorage.setItem('token', this.state.token);
    }

    setUid(value) {
        this.state.uid  = value;
        localStorage.setItem('uid', this.state.uid);
    }

    setClient(value) {
        this.state.client  = value;
        localStorage.setItem('client', this.state.client);
    }

    getEnv(key) {
        return this.state.env[key]
    }
}
