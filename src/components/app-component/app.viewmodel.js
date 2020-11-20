import ko from 'knockout';

class AppViewModel {
    constructor (params) {
        this.message = params.message || 'Hello World!';
        this.currentPath = ko.observable('/');
    } 

    changeCurrentPath(pathToUpdate) {
        this.currentPath(pathToUpdate);
    }
}

export default AppViewModel;