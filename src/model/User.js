import ko from 'knockout';

import AuthService from './../services/AuthService';

class User {
    constructor (name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    save = async () => {
        const user = await AuthService.registerUser(this);
        if (user) {
            alert('User has been added successfully');
        } else {
            alert('Something went wrong while saving user!');
        }
    }
}

export default User;