import { Controller } from 'controllerim';

import {AuthenticatedController, AuthServices} from '../services/AuthServices.js'

export class LoginController extends AuthenticatedController {

    static controllerName = 'LoginController'

    constructor(comp) {
        super(comp);
        this.state = {

        };
    }

    doLogin (email, password) {
        return this.auth_services.signIn(email, password)
    }
}
