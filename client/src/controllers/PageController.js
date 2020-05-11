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

    logout() {
        this.app_controller.setToken(null)
        this.app_controller.setClient(null)
        this.app_controller.setUid(null)
    }

    isLoggedIn () {
                return this.app_controller.state.token != null && this.app_controller.state.client != null
    }

    wrapPromiseResult(promise) {
        return promise.then(result => {
            return result
        }).catch(error => {
            this.logout()
            return error
        })
    }

    mustLogIn() {
        // TODO: move this logic to a concern for Components which require authentication
            if (!this.isLoggedIn()) {
                this.state.internal_redirect = '/login'
            }
    }
}