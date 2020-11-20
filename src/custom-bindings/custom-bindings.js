export default {
    setRoute: {
        update(element, valueAccessor, allBindings, viewModel, bindingContext) {
            const route = valueAccessor();
            const routeUnwrapped = ko.unwrap(route);
            element.onclick = () => bindingContext.$parents[0].changeCurrentPath(routeUnwrapped);
        }
    },  

    onLoad: {
        update(element, valueAccessor, allBindings, viewModel, bindingContext) {
            const value = valueAccessor();
            const valueUnwrapped = ko.unwrap(value);
            $(element).ready(() => {
                valueUnwrapped.call(viewModel);
            });
        }
    }
};