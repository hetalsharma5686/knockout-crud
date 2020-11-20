export default {
    required(target, msg) {
        target.hasError = ko.observable();
        target.validationMessage = ko.observable();

        //define a function to do validation
        const validate = (newValue) => {
            target.hasError(newValue !== '' ? false : true);
            target.validationMessage(newValue ? "" : msg || "This field is required");
        }

        //initial validation
        // validate(target());

        //validate whenever the value changes
        target.subscribe(validate);

        //return the original observable
        return target;
    },

    pattern(target, options) {
        target.hasError = ko.observable();
        target.validationMessage = ko.observable();

        target.subscribe((newValue) => {
            if (newValue && newValue !== '') {
                if (!newValue.match(options.value)) {
                    target.hasError(true);
                    target.validationMessage(options.message);
                } else {
                    target.hasError(false).validationMessage('');
                }
            }
        });

        return target;
    }
}