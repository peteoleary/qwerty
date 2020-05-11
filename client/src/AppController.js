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

    setLocalStorage(key, value) {
        // clear the key completely if value is null
        
        if (value) {
            localStorage.setItem(key, value)
            // console.log(`setLocalStorage setting ${key}`)
        } else {
            localStorage.removeItem(key);
            // console.log(`setLocalStorage clearing ${key}`)
        }
    }

    setToken(value) {
        this.state.token  = value;
        this.setLocalStorage('token', value)
    }

    setUid(value) {
        this.state.uid  = value;
        this.setLocalStorage('uid', value)
    }

    setClient(value) {
        this.state.client  = value;
        this.setLocalStorage('client', value)
    }

    setCredentialsFromHeader(headers) {

        if (this.state.client == headers.client && !headers['access-token']){
            // console.log(`setCredentialsFromHeader skipping`)
            return;
        }

        this.setToken(headers['access-token'])
        this.setClient(headers.client)
        this.setUid(headers.uid)
    }

    getEnv(key) {
        return this.state.env[key]
    }
}
