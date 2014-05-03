var sumir_ou_mostrar_background = function(){
    var campo_busca = $("#busca");
    var original_background_css = campo_busca.css("background-image");
    var busca_css_before_focus = {backgroundImage: "none"};
    var busca_css_after_focus = {backgroundImage: original_background_css};

    campo_busca.focus(function(){
        campo_busca.css(busca_css_before_focus);
    });

    campo_busca.blur(function(){
        if(campo_busca.val() == "") campo_busca.css(busca_css_after_focus);
    });
}