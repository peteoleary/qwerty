import { Controller } from 'controllerim';

import AuthServices, { AuthenticatedController } from '../services/AuthServices.js'

export class HomeController extends AuthenticatedController {

    static controllerName = 'HomeController'

    constructor(comp) {
        super(comp);
        this.state = {

        };
    }
}
