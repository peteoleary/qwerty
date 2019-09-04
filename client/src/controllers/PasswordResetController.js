import { Controller } from 'controllerim';

import AuthServices from '../services/AuthServices.js'

export class PasswordResetController extends Controller {
    constructor(comp) {
        super(comp);
        this.state = {

        };
    }

    doLogin (email, password) {
        // sign_in(email, password)
    }
}
