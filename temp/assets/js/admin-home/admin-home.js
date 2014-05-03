
$(function(){
    filter = new Filter({
        rows: $("#uploaded-files tbody tr")
    });

    sumir_ou_mostrar_background();

    // ---------------------------------------------------------------------

    var filtrar_por_campanha = $("#filtrar-por-campanha");

    var campanhas = [];
    var campanhas_html = ["<option value=\"\">Selecione uma Campanha</option>"];

    $("[data-filter-criteria=\"campanha\"]").each(function(){
        var campanha = $(this).text();
        if(campanhas.indexOf(campanha) < 0) {
            campanhas.push(campanha);
            campanhas_html.push("<option value=\""+campanha+"\">"+campanha+"</option>")
        }
    })

    filtrar_por_campanha.html(campanhas_html.join("\n"));

    filtrar_por_campanha.change(function(){
        filter.filter_by("campanha", $(this).find(":selected").val());
    });

    $("#selecionar-todos-os-arquivos").click(function(e){
        e.preventDefault();
        $(".check input").click();
    })

    // $("[data-selected]").click(function(){
    //     var check = $(this).find(".check");
    //     if(eval($(this).attr("data-selected"))){
    //         $(this).attr("data-selected", "false");
    //         check.html("")
    //     } else {
    //         $(this).attr("data-selected", "true");
    //         check.html("<span class=\"glyphicon glyphicon-ok\"></span>")
    //     }
    // });

});