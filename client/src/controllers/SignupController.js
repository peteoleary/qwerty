import PageController from './PageController.js';

export class SignupController extends PageController {

    static controllerName = 'SignupController'

    constructor(comp) {
        super(comp);

         // TODO: put this state into controller
         this.state = {
             ...{
            is_loading: false,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            confirmation_code: comp.query_params['confirmation_code'] || "",
            new_user: null
        }}
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.password_confirmation
        );
    }

    validateConfirmationForm() {
        return this.state.confirmation_code.length > 0;
    }

    doSignup (user_info) {
        return this.auth_services.registerUser(user_info)
    }

    doConfirmation (confirmation_code) {
        return this.auth_services.confirmUser(confirmation_code)
    }
}
