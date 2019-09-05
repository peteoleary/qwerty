const axios = require('axios');

export default class AuthServices {

    constructor(app_controller) {
        // TODO: maybe check that this is indeed AppController?
        this.app_controller = app_controller
    }

    anonymous_header = () => {
        return {'Content-Type': 'application/json'}
    }

    authenticated_header = () => {
        return {
            'Content-Type': 'application/json',
            'access-token': this.app_controller.get_token(),
            'client': this.app_controller.get_client()
        }
    }

    reset_password = (email, redirect_url)  => {

        // sign in API call here
        return axios.post("/api/auth/password" ,{email:email, redirect_url:redirect_url}, {headers: this.anonymous_header()})
    }

    change_password = (token, password, password_confirmation, redirect_url_base) => {

        return axios.get(`/api/auth/password/edit?reset_password_token=${token}&redirect_url=${redirect_url_base}/api/auth/validate_token`, {headers: this.anonymous_header()}).then((resp) => {
            console.info(resp)

            this.app_controller.set_token(resp.headers['access-token'])
            this.app_controller.set_client(resp.headers.client)

            return axios.put('/api/auth/password', {password: password, password_confirmation: password_confirmation}, {headers: this.authenticated_header()})
        })
    }

    sign_in = (email, password) =>  {

        // sign in API call here
        if(email && password){

            return axios.post("/api/auth/sign_in" ,{email:email, password:password}, {headers: this.anonymous_header()})
                .then(function(resp){

                    this.app_controller.set_token(resp.headers['access-token'])
                    this.app_controller.set_client(resp.headers.client)

                    return Promise.resolve(resp.headers.client, resp.headers['access-token'])
                })
        }
        else {
            return Promise.reject(new Error('Please provide an email address and password'))
        }
    }

    register_user = (user_info) => {

        const {first_name, last_name, email, password, password_confirmation, skip_password_validation} = user_info

        // NOTE: you can pass in both skip_password_validation and password+password_confirm but the server will basically ignore the password

        // register API call here
        if(first_name && last_name && email && ((password && password_confirmation) || skip_password_validation)){

            return axios.post("/api/users",
                {first_name:first_name, last_name:last_name, email:email, password:password, password_confirmation: password_confirmation, skip_password_validation: skip_password_validation},
                {headers: this.anonymous_header()})
                .then(function(resp){

                    var attr = { id: resp.data.id,
                        uid:resp.data.uid,
                        email:resp.data.email,
                        first_name:resp.data.first_name,
                        last_name:resp.data.last_name
                    }

                    return Promise.resolve(attr)
                })
        }
        else {
            return Promise.reject(new Error('Please provide first_name, last_name, email, password+password_confirm or skip_password_validation'))
        }
    }
}