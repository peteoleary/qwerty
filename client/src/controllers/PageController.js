import { Controller } from 'controllerim';
import AuthService from "../services/AuthService"

export default class PageController extends Controller {

    constructor(comp) {
        super(comp);
        this.state = {
            internal_redirect: null  // used to redirect OUT of this page/controller
        }
        this.app_controller = this.getParentController('AppController')
        this.auth_services = new AuthService(this.app_controller)
    }

    handleChange = event => {
        this.state[event.target.id] = event.target.value
    }

    setRedirect(url) {
        this.state.internal_redirect = url
    }

    isLoggedIn () {
        return this.app_controller.getToken().then((token) => {
            return this.app_controller.getClient().then((client) => {
                return client != null && token != null
            })
        })
    }

    mustLogIn() {
        // TODO: move this logic to a concern for Components which require authentication
        this.isLoggedIn().then((logged_in) => {
            if (!logged_in) {
                this.controller.state.internal_redirect = '/login'
            }
        })
    }
}