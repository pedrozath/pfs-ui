function extend(source, destination, options){
    for(method in destination.prototype){
        source[method] = destination.prototype[method];
    }

    destination.call(source, source.options);
}