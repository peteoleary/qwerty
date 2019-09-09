import { Controller } from 'controllerim';

import {AuthenticatedController, AuthServices} from '../services/AuthServices.js'

export class SignupController extends AuthenticatedController {

    static controllerName = 'SignupController'

    constructor(comp) {
        super(comp);

        this.state = {
        };
    }

    doSignup (user_info) {
        return this.auth_services.registerUser(user_info)
    }

    doConfirmation (confirmation_code) {
        return this.auth_services.confirmUser(confirmation_code)
    }
}
