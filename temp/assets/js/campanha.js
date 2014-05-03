$(function(){

    $(".imagem-campanha-btn").click(function(){
        $(this).parent().find("input.imagem-campanha").click();
    });

    $("input.imagem-campanha").fileupload({
        url: 'http://10.193.151.105:8080/pfs-web/userAdmin/upload',
        dataType: 'json',
        autoUpload: true,
        sequentialUploads: true,

        change: function(e, data){
            $(".imagem-campanha-btn").val(data.files[0].name);
        }
    });

    var filter = new Filter({
        rows: $(".lista-campanhas-user li ")
    });

    $("#busca").on("keyup", function(){
        filter.filter_by("nome", $(this).val());
    })

})