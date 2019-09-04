import { Controller } from 'controllerim';

import AuthServices from '../services/AuthServices.js'

export class SignupController extends Controller {
    constructor(comp) {
        super(comp);
        this.state = {

        };
    }

    doSignup (user_info) {
        // register_user(user_info)
    }
}
