App = {
    files: [],
    business_units: [],
    campanhas: [],
    subcategorias: [],
    destinatarios: []
}

App.data_input = {
    files: [],
    business_units: [],
    campanhas: [],
    subcategorias: [],
    destinatarios: []
}

$(function(){
    spawn_business_units_and_subcategories("editable");
    console.log(data_output());
})