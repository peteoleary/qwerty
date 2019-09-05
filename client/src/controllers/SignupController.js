import { Controller } from 'controllerim';

import AuthServices from '../services/AuthServices.js'

export class SignupController extends Controller {

    static controllerName = 'SignupController'

    constructor(comp) {
        super(comp);
        this.state = {

        };
        this.auth_services = new AuthServices(this.parent)
    }

    do_signup (user_info) {
        return this.auth_services.register_user(user_info)
    }
}
