import { Router } from '@profiscience/knockout-contrib';
import ko from 'knockout';

import AuthService from './../../services/AuthService';

class AuthViewModel {
    constructor () {
        this.email = ko.observable('');
        this.password = ko.observable('');
    }

    submitForm = async () => {
        try {
            const token = await AuthService.findUserByEmail(this.email(), this.password());
            if (token) {
                localStorage.setItem('userToken', token.token);
                localStorage.setItem('tokenValidity', token.valid_till);
                Router.update('/');
            }   
        } catch (err) {
            alert('Email or Password is invalid!');
        }
    }
}

export default AuthViewModel;