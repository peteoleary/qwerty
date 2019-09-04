import { Controller } from 'controllerim';

export class AppController extends Controller {
    constructor(comp) {
        super(comp);
        this.state = {
            token: null,
            client: null
        };
    }

    get_token() {
        return this.state.token;
    }

    set_token(value) {
        this.state.token  = value;
    }

    get_client() {
        return this.state.client;
    }

    set_client(value) {
        this.state.token  = value;
    }
}
