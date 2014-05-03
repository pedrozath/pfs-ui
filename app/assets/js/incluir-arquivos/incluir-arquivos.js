App = {};

App.data_input = {
    files: [],
    business_units: [],
    campanhas: [],
    subcategorias: [],
    destinatarios: []
}

$(function(){
    // Envios de arquivos

    App.files = [];
    App.file_index = 0;
    App.canceled_files = 0;

    activate_or_deactivate_enviar_button = function(){
        var botoes = $("#enviar").add("#visualizar");
        if(App.files.length !== App.file_index - App.canceled_files){
            botoes.attr("disabled", "disabled");
        } else {
            botoes.removeAttr("disabled");
        }
    }

    $("#upload-de-arquivos-btn").click(function(e){
        e.preventDefault();
        $("#upload-de-arquivos").click();
    });
    

    App.data_input.files.forEach(function(file){
        var file_index = App.files.length
        file.my_id = App.file_index;

        var file_row = [
            '<tr id="file-'+file.my_id+'">',
            '    <td class="filename" contenteditable="true">'+file.name+'</td>',
            '    <td></td>',
            '    <td class="status"></td>',
            '    <td></td>',
            '</tr>'
        ].join("\n");


        App.files.push(file);

        $(file_row).appendTo(".uploading-files tbody").keyup(function(){
            App.files[file_index].name = $(this).text()
        });
        App.file_index++;
    })

    $("#upload-de-arquivos").fileupload({

        url: 'http://10.193.151.105:8080/pfs-web/userAdmin/upload',
        dataType: 'json',
        autoUpload: true,
        sequentialUploads: true,

        change: function(e, data){
            data.files.forEach(function(file){
                file.my_id = App.file_index;

                var file_row = [
                    '<tr id="file-'+file.my_id+'">',
                    '    <td class="filename" contenteditable="true">'+file.name+'</td>',
                    '    <td>'+Math.round(file.size/(1024))+'KB</td>',
                    '    <td class="status">Carregando</td>',
                    '    <td><a class="delete" href="#" data-delete-file>&times;</a></td>',
                    '</tr>'
                ].join("\n");

                $(".uploading-files tbody").append(file_row)
            });

            activate_or_deactivate_enviar_button();
            App.file_index++;
        },

        done: function(e, data){
            data.files.forEach(function(file, index){
                var database_file = data.jqXHR.responseJSON.file;
                var file_row = $("#file-"+file.my_id);

                file_row.find(".status").html("Sucesso");
                file_row.find(".delete").attr("data-delete-file", database_file.id);
                file_row.attr("data-id", database_file.id);

                var file_index = App.files.length
                App.files.push(database_file);

                file_row.find(".filename").keyup(function(){
                    App.files[file_index].name = $(this).text()
                });
            });

            $("[data-delete-file]").click(function(e){
                App.canceled_files++;
                e.preventDefault();
                var id = parseInt($(this).attr("data-delete-file"));
                App.files.forEach(function(file, index){
                    if(file.id == id) App.files.splice(index, 1);
                })
                $("[data-id=\""+id+"\"").remove();
            })

            activate_or_deactivate_enviar_button();
        }
    });

    spawn_business_units_and_subcategories();

    // $(".all-business-units").click();

    // Campanhas

    App.campanhas = [];

    Data.campanhas.forEach(function(campanha){
        campanha.parent_element = $("#campanhas");
        if(App.data_input.campanhas.indexOf(campanha.id) > -1){
            campanha.selected = true;
        }
        App.campanhas.push(new Campanha(campanha));
    });

    // Destinatarios

    App.destinatarios = []

    $("[data-destinatarios]").each(function(){
        var division = $(this);
        var division_name = division.attr("data-destinatarios");
        
        App.destinatarios.push(
            new Destinatarios({
                name                  : division_name,
                html_entities         : division.find("input"),
                division              : division,
                name_location_in_html : "val()",
                selected_items        : App.data_input.destinatarios[division_name]
            })
        )
    });

    for (division in App.data_input.destinatarios){
        App.data_input.destinatarios[division].forEach(function(id){
            $("[data-destinatarios=\""+division+"\"] [value=\""+id+"\"]").click();
        })
    }




    // a:Button Click Open/Close
    /* 
        .btn-click           -> Open/Close Trigger
        .action-open         -> Action
        .action-targetid-ID  -> Target
        
        Usage example:

        <div id="CONTENT-click">
            <a href="#" class="btn-click action-open action-targetid-CONTENT"></a>
        </div>
        <div id="CONTENT" class="row" style="display:none;">
            <a href="#" class="btn-click action-close action-targetid-CONTENT">/a>
        </div>
    */

    $('.btn-click').each(function(index,element){
        if($(this).hasClass('action-open')){
            $(this).click(function(e){
                e.preventDefault();
                target = (($(this).attr('class').split(' '))[2]).split('-')[2];
                $('#'+target+'-click').slideUp();
                $('#'+target).slideDown()
            })
        } else {
            $(this).click(function(e){
                e.preventDefault();
                target = (($(this).attr('class').split(' '))[2]).split('-')[2];
                $('#'+target+'-click').slideDown();
                $('#'+target).slideUp()
            })
        }
    });

    
    validate = function(){
        return true;
    }


    $("#visualizar").click(function(){
        $("#resumo").html(html_resumo());
    });

    $("#enviar").click(function(){
        if(validate()){
            console.log(data_output());
        }

    })

});