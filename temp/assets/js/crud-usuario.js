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
    sumir_ou_mostrar_background();
    spawn_business_units_and_subcategories();

    // var filter = new Filter({
    //     rows: $(".usuarios tbody tr")
    // });

    // $("#busca").on("keyup", function(){
    //     filter.filter_by("nome", $(this).val());
    // })

})