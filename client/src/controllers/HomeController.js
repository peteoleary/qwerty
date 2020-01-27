import { Controller } from 'controllerim';

import AuthServices from '../services/AuthServices.js'
import PageController from './PageController.js'

export class HomeController extends PageController {

    static controllerName = 'HomeController'

    constructor(comp) {
        super(comp);
        this.state = {

        };
    }
}
