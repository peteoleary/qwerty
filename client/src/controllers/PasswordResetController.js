import { Controller } from 'controllerim';

import AuthServices from '../services/AuthServices.js'

import PageController from './PageController.js'

export class PasswordResetController extends PageController {

    static controllerName = 'PasswordResetController'

    constructor(comp) {
        super(comp);
        
        this.state = {
            ...{
                email: ''
            }
        }
    }

    validateForm() {
        return this.state.email.length > 0;
    }

    // TODO: this handleChange should be in a the base class or a mixin
    handleChange = event => {
        this.state[event.target.id] = event.target.value
    }

    handleSubmit = event => {
        event.preventDefault();
        this.doPasswordReset(this.state.email, `${this.app_controller.getEnv('REACT_APP_URL')}/user/change_password`)
            .catch((error) => {
                this.alert.error(error.message)
            })
    }

    doPasswordReset (email, redirect_url) {
        return this.auth_services.resetPassword(email, redirect_url)
    }
}
