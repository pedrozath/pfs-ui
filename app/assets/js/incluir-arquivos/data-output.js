data_output = function(){     
    output = {
        files: [],
        business_units: [],
        subcategories: [],
        campanhas: [],
        destinatarios: {}
    }

    output.files = App.files;

    console.log(App.business)
    App.business_units.forEach(function(business_unit){
        if(business_unit.selected) {
            output.business_units.push(business_unit.id);

            business_unit.subcategories.selected_items.forEach(function(subcategory_id){
                output.subcategories.push(subcategory_id);
            })
        }
    });

    App.campanhas.forEach(function(campanha){
        output.campanhas.push(campanha.selected_items[0]);
    })

    App.destinatarios.forEach(function(destinatarios){
        output.destinatarios[destinatarios.name] = destinatarios.selected_items;
    })

    return output;
}

