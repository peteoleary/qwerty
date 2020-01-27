import { Controller } from 'controllerim';
import AuthServices from "../services/AuthServices"

export default class PageController extends Controller {

    constructor(comp) {
        super(comp);
        this.state = {
            internal_redirect: null  // used to redirect OUT of this page/controller
        }
        this.app_controller = this.getParentController('AppController')
        this.auth_services = new AuthServices(this.app_controller)
    }

    isLoggedIn () {
        return this.app_controller.getToken().then((token) => {
            return this.app_controller.getClient().then((client) => {
                return client != null && token != null
            })
        })
    }
}