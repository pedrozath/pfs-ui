module.exports.register = function(Handlebars, options) {
    var fs = require("fs");
    var modal_html = fs.readFileSync(__dirname+"/../app/partials/modal.html").toString();

    var helpers = {
        modal: function(options){
            var context = { 
                options: options.hash, 
                buttons: options.hash.buttons.split(","), 
                contents: options.fn(this)
            }

            var output = Handlebars.compile(modal_html)(context);
            return new Handlebars.SafeString(output);
        }
    }

    // registra os helpers
    for (helper in helpers) {
        var fn = helpers[helper];
        Handlebars.registerHelper(helper, fn);
    }
}
