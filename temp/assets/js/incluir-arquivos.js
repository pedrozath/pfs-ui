function Subcategorias(options){
    var _this = this;
    this.options = options;
    this.selected_items = [];
    this.spawn();
    this.set_click_event();
}

Subcategorias.prototype = {
    spawn: function(){

        var _this = this;
        this.html_content = [];

        var column_cap = Math.floor(App.subcategory_items_sum/App.subcategory_columns);
        var current_column;

        var current_column_index = Math.floor(App.subcategory_item_counter/column_cap)
        var current_column = _this.options.parent_element.eq(current_column_index);
        var data_attr;

        this.options.items.forEach(function(item){
            data_attr = "data-business-unit=\""+_this.options.business_unit+"\""
            App.subcategory_item_counter++;

            _this.html_content.push([
                "<li>",
                "   <a href=\"#\" "+data_attr+">"+item.name+"</a>",
                (function(){
                    var output = [];
                    if(item.products.length > 0){
                        output.push("<ul>")
                        item.products.forEach(function(product){
                            App.subcategory_item_counter++;
                            output.push("   <li><a href=\"#\" "+data_attr+">"+product+"</a></li>");
                        });
                        output.push("</ul>");
                    }
                    return output.join("\n    ");
                }).call(this), 
                "</li>"
            ].join("\n"));

            var overflown_items = App.subcategory_item_counter - (current_column_index+1) * column_cap
            overflown_items = overflown_items > 0 ? overflown_items : 0
            App.subcategory_item_counter -= overflown_items;
        });

        // current_column.append(_this.html_content);
        $(".subcategorias > ul").eq(current_column_index).append(_this.html_content);
        this.html_entities = $("[data-business-unit=\""+this.options.business_unit+"\"]");
    },

    set_click_event: function(){
        var _this = this;
        this.html_entities.click(function(e){
            e.preventDefault();
            var item = $(e.currentTarget);
            if(item.hasClass("selected")){
                _this.remove(item);
            } else {
                _this.add(item);
            }                
        });
    },

    add: function(item){
        item.addClass("selected");
        this.selected_items.push(item.text())
        this.update_counter();
    },

    remove: function(item){
        item.removeClass("selected");
        var item_index = this.selected_items.indexOf(item.html())
        this.selected_items.splice(item_index, 1);
        this.update_counter();
    },

    list: function(){
        console.log(this.selected_items);
    },

    clear: function(){
        var _this = this;
        $.each(this.html_entities, function(index, item){
            _this.remove($(item));
        })
    },

    show: function(){
        this.html_entities.parent().show()
        var father_ul = this.html_entities.first().closest(".subcategorias > ul");
        
        father_ul.show()
    },

    hide: function(){
        var displayed_items = 0;
        var father_ul = this.html_entities.first().closest(".subcategorias > ul");

        this.html_entities.parent().hide();

        father_ul.find("li").each(function(){
            if($(this).css("display") !== "none") displayed_items++
        })

        if(displayed_items == 0) {
            father_ul.hide()
        }

        console.log(displayed_items);
    },

    update_counter: function(){
        this.options.counter.html(this.selected_items.length)
    }
}

function BusinessUnit(options) {
    this.options = options;
    this.name = options.name;
    this.spawn();
    this.spawn_subcategories();
    this.set_click_event();
}

BusinessUnit.prototype = {
    spawn: function(){
        html_content = [
            '<li id="bu-'+this.options.name+'">',
            '    <a href="#">',
            '        <h2>'+this.options.name+'</h2>',
            '        <div class="content">',
            '            <img src="../assets/images/icon-'+this.options.name.toLowerCase()+'.png" alt="" />',
            '        </div>',
            '        <div class="footer">',
            '           <p>Subs Sel.: <span class="subs-counter">0</span></p>',
            '        </div>',
            '    </a>',
            '</li>'
        ].join("\n");

        $(".all-business-units").before(html_content);
        this.html_entity = $("#bu-"+this.options.name);
    },

    spawn_subcategories: function(){
        this.subcategories = new Subcategorias({
            business_unit:  this.options.name,
            items:          this.options.subcategories,
            parent_element: $(".subcategorias > ul"),
            counter:        this.html_entity.find(".subs-counter")
        });
    },

    set_click_event: function(){
        var _this = this;
        this.html_entity.find("a").click(function(e){
            e.preventDefault();
            if($(e.currentTarget).parent().hasClass("selected")){
                _this.deselect();
            } else {
                _this.select();
            }
        });
    },

    select: function(){
        this.html_entity.siblings().removeClass("selected")
        this.html_entity.addClass("selected");
        this.deselect_subcategories_from_all_business_units();
        this.subcategories.show();
        App.selected_business_unit = this.name;
    },

    deselect: function(){
        this.html_entity.removeClass("selected");
        // this.subcategories.clear();
        this.subcategories.hide();
    },

    deselect_subcategories_from_all_business_units: function(){
        $.each(App.business_units, function(index, business_unit){
            business_unit.subcategories.hide();
        });
    }

}

$(function(){
    $(".btn-procurar").click(function(e){
        e.preventDefault()
        $("#upload-de-arquivos").click()
    });

    $("#upload-de-arquivos").fileupload({

        url: 'http://localhost:8080/pfs-web/userAdmin/upload',
        dataType: 'json',
        autoUpload: true,
        sequentialUploads: true,

        change: function(e, data){
            $.each(data.files, function(index, file){
                var file_row = [
                    '<tr id="file-'+index+'">',
                    '    <td>'+file.name+'</td>',
                    '    <td>'+Math.round(file.size/(1024))+'KB</td>',
                    '    <td class="status">Carregando</td>',
                    '    <td><a href="#"><img src="#" alt="" /></a></td>',
                    '</tr>'
                ].join("\n");

                $(".uploading-files tbody").append(file_row);
            });
        },

        done: function(e, data){
            $.each(data.files, function(index, file){
                $("#file-"+index+" .status").html("Sucesso")
            });
        }

    });
        
    App = {};

    App.bu_data = [
        {
            name: "HE",  
            subcategories: [
                {name: "TVs", products: []},
                {name: "TVs OLED", products: ["Curved OLED", "Gallery"]},
                {name: "TVs ULTRA HD", products: []},
                {name: "TVs 3D", products: []},
                {name: "TVs Smart", products: []},
                {name: "TVs LED", products: []},
                {name: "TVs LCD", products: []},
                {name: "TVs Plasma", products: []},
                {name: "MINI E MICRO SYSTEMS", products: ["Micro systems", "Mini systems"]}
            ] 
        },

        { 
            name: "IT",  
            subcategories: [
                {name: "Notebooks", products: []},
                {name: "Monitores", products: ["Monitores LED", "Monitores LCD", "Monitores IPS"]}
            ] 
        },

        {
            name: "MC",
            subcategories: [
                {name: "Smartphone", products: []}
            ]
        },
        
        {
            name: "HA",
            subcategories: [
                {name: "Geladeiras", products: []}
            ]
        }
    ]


    App.subcategory_items_sum = 0;

    App.bu_data.forEach(function(business_unit){
        business_unit.subcategories.forEach(function(subcategory){
            App.subcategory_items_sum += subcategory.products.length+1;
        })
    })

    App.subcategory_columns = 4
    App.subcategory_item_counter = 0;

    App.business_units = [];

    $.each(App.bu_data, function(index, business_unit){
        App.business_units.push(
            new BusinessUnit({
                name           :business_unit.name,
                subcategories  :business_unit.subcategories,
                parent_element :$("#business-units")
            })
        );
    });

    $(".all-business-units").click(function(e){
        e.preventDefault();
        $.each(App.business_units, function(index, business_unit){
            business_unit.deselect();
            business_unit.subcategories.show();
            $(e.currentTarget).addClass("selected")
        });
    })

});