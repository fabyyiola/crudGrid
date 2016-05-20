//function to define if the plugin is being intialized or executing a method
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
//function to evaluate if a variable has 1 or N children variables declared
function isSet(obj, path) {
    var res = false;
    if (path == null) {
        if (obj != null) {
            res = true;
        }
    } else {
        var strEval = "try{if(obj." + path + " != null){res = true}}catch(ex){}";
        eval(strEval);
    }
    return res;
}
