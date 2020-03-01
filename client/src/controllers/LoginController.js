import PageController  from './PageController.js';

export class LoginController extends PageController {

    static controllerName = 'LoginController'

    constructor(comp) {
        super(comp);
        this.state = {
            ...{
                email: "",
                password: "",
                did_confirm: comp.query_params['did_confirm']
            }
        };
    }

    doLogin (email, password) {
        return this.auth_services.signIn(email, password)
    }
}
