class AuthService {
    static findUserByEmail = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                if (users) {
                    const user = users.find(user => user.email === email && user.password === password);
                    user ? resolve({
                            token: Math.random().toString(36).substr(2),
                            valid_till: new Date(Date.now() + (30 * 60 * 1000)).getTime()
                        }) : reject();
                } else {
                    reject();
                }
            }, 800);
        });
    }

    static registerUser = (user) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
                resolve(user);
            }, 800);
        });
    }
}

export default AuthService;