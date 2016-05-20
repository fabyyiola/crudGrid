function executePlugin(methods, method, options, selfElement) {
    if (methods[method]) {
        if (options == null) options = {};
        options.self = selfElement;
        return methods[method](options);
    } else if (typeof method === 'object' || !method) {
        if (method == null) {
            method = {};
        }
        method.self = selfElement;
        return methods.init(method);
    } else {
        msg = "The method " + method + " its not handled.";
        throw ({ message: msg, stack: msg });
    }
}
