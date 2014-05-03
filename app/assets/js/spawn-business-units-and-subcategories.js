spawn_business_units_and_subcategories = function(editable){
    App.subcategory_items_sum = 0;

    Data.business_units.forEach(function(business_unit){
        business_unit.subcategories.forEach(function(subcategory){

            App.subcategory_items_sum += subcategory.products.length+1;
        })
    })

    App.subcategory_columns = 4
    App.subcategory_item_counter = 0;

    App.business_units = [];

    Data.business_units.forEach(function(business_unit){
        business_unit.parent_element = $("#business-units");
        if(App.data_input.business_units.indexOf(business_unit.id) > -1){
            business_unit.selected = true;
        }

        if(editable=="editable") business_unit.editable = true;

        App.business_units.push(new BusinessUnit(business_unit));
    });

    App.data_input.subcategorias.forEach(function(subcategory_id){
        $("#subcategoria-"+subcategory_id+" > div").click();
    });

    $(".all-business-units").click(function(e){
        e.preventDefault();
        App.business_units.forEach(function(business_unit){
            business_unit.select();

            business_unit.show_subcategories();
            $(e.currentTarget).addClass("selected")
        });
    });
}