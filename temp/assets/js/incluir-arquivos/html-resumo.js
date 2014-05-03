html_resumo = function(){
    var output = [
        '<h3>Arquivos enviados</h3>',
        '<ul>',

        (function(){
            var output = [];
            App.files.forEach(function(file){
                output.push("<li>"+file.name+"<li>")
            });
            return output.join("    \n")
        }).call(this),

        '</ul>',

        "<h3>BUs selecionadas</h3>",

        "<ul>",

        (function(){
            var output = [];
            App.business_units.forEach(function(business_unit){
                if(business_unit.selected) output.push("<li>"+business_unit.name+"<li>")
            });
            return output.join("    \n")
        }).call(this),

        "</ul>",

        "<h3>Subcategorias selecionadas</h3>",

        "<ul>",

        (function(){
            var output = [];
            App.business_units.forEach(function(business_unit){
                if(business_unit.selected){
                    business_unit.subcategories.selected_items.forEach(function(subcategory_id){
                        output.push("<li>"+$("#subcategoria-"+subcategory_id + " > a").text()+"<li>")
                    });
                }
            });
            return output.join("    \n")
        }).call(this),

        "</ul>",

        "<h3>Campanhas selecionadas</h3>",

        "<ul>",

        (function(){
            var output = [];
            App.campanhas.forEach(function(campanha){
                if(campanha.selected_items.length > 0) output.push("<li>"+campanha.name+"<li>")
            });
            return output.join("    \n")
        }).call(this),

        "</ul>",

        "<h3>Destinatários</h3>",

        (function(){
            var output = [];
            App.destinatarios.forEach(function(division){
                output.push("<h4>"+division.name+"</h4>");
                output.push("<ul>");
                division.selected_items.forEach(function(destinatario_id){
                    destinatario_checkbox = division.options.html_entities.filter("[value=\""+destinatario_id+"\"]").first();
                    console.log(destinatario_checkbox);
                    destinatario_name = destinatario_checkbox.parent().prev().text();
                    output.push("<li>"+destinatario_name+"</li>")
                });
                output.push("</ul>");
            });
            return output.join("    \n");
        }).call(this),

    ].join("\n")
    return output;
}
