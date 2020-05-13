const axios = require('axios');

export default class AuthService {

    constructor(app_controller) {
        // TODO: maybe check that this is indeed AppController?
        this.app_controller = app_controller
    }

    anonymous_header = () => {
        return {
            'Content-Type': 'application/json', 
            'Cache-Control': 'no-cache'
        }
    }

    authenticated_header = () => {
        var headers = Object.assign({
            'access-token': this.app_controller.state.token,
            'client': this.app_controller.state.client,
            'uid': this.app_controller.state.uid
        }, this.anonymous_header());

        console.log(headers)
        return headers;
    }

    authenticatedGet = (url) => {
        var that = this;
        return axios.get(url , {headers: this.authenticated_header()}).then(function(result) {
            that.app_controller.setCredentialsFromHeader(result.headers)
            return result
        })
    }

    authenticatedPost = (url, body) => {
        var that = this;
        return axios.post(url, body, {headers: this.authenticated_header()}).then(function(result) {
            that.app_controller.setCredentialsFromHeader(result.headers)
            return result
        })
    }

    confirmUser = (confirmation_token) => {
        return axios.get(`/api/auth/confirmation?confirmation_token=${confirmation_token}`)
    }

    resetPassword = (email, redirect_url)  => {
        return axios.post("/api/auth/password" ,{email:email, redirect_url:redirect_url}, {headers: this.anonymous_header()})
    }

    changePassword = (token, password, password_confirmation, redirect_url_base) => {

        const   that = this

        return axios.get(`/api/auth/password/edit?reset_password_token=${token}&redirect_url=${redirect_url_base}/api/auth/validate_token`, {headers: this.anonymous_header()}).then((resp) => {
            console.info(resp)

            that.app_controller.setCredentialsFromHeader(resp.headers)

            return axios.put('/api/auth/password', {password: password, password_confirmation: password_confirmation}, {headers: this.authenticated_header()})
        })
    }

    signIn = (email, password) =>  {

        // sign in API call here
        if(email && password){

            const   that = this

            return axios.post("/api/auth/sign_in" ,{email:email, password:password}, {headers: this.anonymous_header()})
                .then(function(resp){

                    that.app_controller.setCredentialsFromHeader(resp.headers)

                    return Promise.resolve(resp.headers.client, resp.headers['access-token'])
                })
        }
        else {
            return Promise.reject(new Error('Please provide an email address and password'))
        }
    }

    registerUser = (user_info) => {

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