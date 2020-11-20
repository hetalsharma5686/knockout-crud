import ko from 'knockout';
import { Router } from '@profiscience/knockout-contrib';

import User from './../../model/User';

class SignupViewModel {
    constructor() {
        this.name = ko.observable('').extend({
            required: 'Name is required!'
        });
        this.email = ko.observable('').extend({
            required: 'Email is required!',
            throttle: 500,
            pattern: {
                value: /^[a-zA-Z0-9]+(._[a-zA-Z0-9]+)*\@[a-zA-Z]{2,10}\.[a-zA-Z]{2,5}$/,
                message: 'Inavlid Email!'
            }
        });
        this.password = ko.observable('');
        this.confirmPassword = ko.observable('').extend({
            throttle: 800
        });

        this.confirmPassword.hasError = ko.observable();
        this.confirmPassword.validationMessage = ko.observable();

        this.isValid = ko.pureComputed(() => {
            if ((this.name.hasError() !== undefined && this.name.hasError() === false) &&
                (this.email.hasError() !== undefined && this.email.hasError() === false) &&
                (this.confirmPassword.hasError() !== undefined && this.confirmPassword.hasError() === false)) {
                return true;
            }
            return false; 
        });

        this.confirmPassword.subscribe((newValue) => {
            if (newValue !== this.password()) {
                this.confirmPassword.hasError(true);
                this.confirmPassword.validationMessage('Password does not match!');
            } else {
                this.confirmPassword.hasError(false).validationMessage('');
            }
        });
    }

    addUser = async () => {
        const user = new User(this.name(), this.email(), this.password());
        await user.save();
        Router.update('/login');
    }
}

export default SignupViewModel;