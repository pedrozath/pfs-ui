function Subcategorias(options){
    var _this = this;
    this.options = options;

    this.remove_btn = '<a href="#" title="Remover item" class="remover-btn"><img src="/assets/images/btn-remover.png" alt=""></a>';
    this.add_btn = '<a href="#" title="Adicionar item" class="adicionar-btn"><img src="assets/images/btn-adicionar.png" alt=""></a>';
    this.business_unit_icon = '<img style="width:20px;height:20px;margin-right:10px;border-radius:5px" src="../assets/images/icon-'+_this.options.business_unit.name.toLowerCase()+'.png" alt="" />'
    
    this.spawn();
    options.html_entities = this.html_entities;
    
    if(!this.options.editable){
        options.select_callback = function(item){_this.interaction_callback(item, "select")}
        options.deselect_callback = function(item){_this.interaction_callback(item, "deselect")}
        extend(this, Selectable);
    } else {
        
        this.html_entities.each(function(){
            _this.add_remove_on_click($(this).find("> div > .remover-btn"), $(this));
            _this.add_rename_on_click($(this));
        });

        this.html_entities.not("[data-parent-id]").each(function(){
            _this.add_new_inside_on_click($(this).find("> div > .adicionar-btn"), $(this));
        });
    }

}

Subcategorias.prototype = {
    spawn: function(){

        var _this = this;
        this.html_content = [];

        var column_cap = Math.floor(App.subcategory_items_sum/App.subcategory_columns);
        
        var remove_btn = (function(){
            var output = "";
            if(this.options.editable){
                var output = _this.remove_btn
            }
            return output;
        }).call(this);

        var add_btn = (function(){
            var output = "";
            if(this.options.editable){
                var output = this.add_btn;
            }
            return output;
        }).call(this)

        var content_editable = (function(){
            var output = "";
            if(this.options.editable){
                // var output = "contenteditable=\"true\"";
            }
            return output;
        }).call(this)

        var current_column;

        var current_column_index = Math.floor(App.subcategory_item_counter/column_cap)
        var current_column = _this.options.parent_element.eq(current_column_index);
        var data_attr;

        this.options.items.forEach(function(item){
            data_attr = "data-business-unit=\""+_this.options.business_unit.name+"\""
            var data_id = "data-id=\""+item.id+"\""
            App.subcategory_item_counter++;

            var subcategoria_id = "subcategoria-"+item.id;

            _this.html_content.push([
                "<li id="+subcategoria_id+" "+data_id+" href=\"#\" "+data_attr+">",
                "   <div "+content_editable+">"+this.business_unit_icon+"<span class=\"name\">"+item.name+"</span>"+add_btn+remove_btn+"</div>",
                (function(){
                    var output = [];
                    if(item.products.length > 0){
                        output.push("<ul>")
                        item.products.forEach(function(product){
                            var data_id = "data-id=\""+product.id+"\""
                            App.subcategory_item_counter++;
                            var id = "id=\"subcategoria-"+product.id+"\"";
                            var parent_id = "data-parent-id=\""+subcategoria_id+"\"";
                            output.push("   <li "+id+" "+[data_attr, parent_id, data_id].join(" ")+"><div>"+this.business_unit_icon+"<span class=\"name\">"+product.name+"</span>"+remove_btn+"</div></li>");
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
        this.options.parent_element.eq(current_column_index).append(_this.html_content);
        this.html_entities = $("[data-business-unit=\""+this.options.business_unit.name+"\"]");

    },

    add_remove_on_click: function(remove_btn, item){
        remove_btn.on("click", function(e){
            e.preventDefault();
            e.stopPropagation();
            if(confirm("Tem certeza que deseja remover este item? Esta ação não poderá ser desfeita.")){
                item.slideUp(function(){
                    item.remove();
                });
            }
        })
    },

    add_new_inside_on_click: function(adicionar_btn, item){
        var _this = this;
        adicionar_btn.on("click", function(e){
            e.preventDefault();
            e.stopPropagation();
            _this.new_inside(item);
        })
    },

    add_rename_on_click: function(item){
        var _this = this;
        item.on("click", function(e){
            e.preventDefault();
            e.stopPropagation();
            _this.rename(item);
        });
    },

    rename: function(item){
        item.find("> div > .name").html(
            (function(){
                var new_value = prompt("Digite o novo nome desta categoria (ou deixe em branco para manter inalterado)");
                if(new_value == "" || new_value == null) {
                    return item.find("> div > .name").text();
                } else {
                    return new_value
                }
            }).call(this)
        );
    },

    interaction_callback: function(item, type_of_event){
        var _this = this;
        this.update_counter();
        var has_parent = item.is("[data-parent-id]");
        var selected_children = $("[data-parent-id=\""+item.attr("id")+"\"].selected");
        var has_children = selected_children.size() > 0

        if(has_parent){
            var parent_id = item.attr("data-parent-id");
            var parent_subcategory = $("#"+parent_id);
        }

        if(type_of_event == "select"){
            this.options.business_unit.select(false);
            if(has_parent) this.select(parent_subcategory);
        } 

        if(type_of_event == "deselect"){
            if(has_parent && $("[data-parent-id=\""+parent_id+"\"].selected").size() == 0){
                this.deselect(parent_subcategory);
            }

            if(has_children){
                selected_children.each(function(){
                    _this.deselect($(this));
                })
            }
        }

    },

    new: function(){
        var item = $("<li><div>"+this.business_unit_icon+"<span class=\"name\">Nova categoria</span>"+this.add_btn+this.remove_btn+"</div></li>").appendTo(this.options.parent_element.children().last());
        this.add_remove_on_click(item.find("> div > .remover-btn"), item);
        this.add_new_inside_on_click(item.find("> div > .adicionar-btn"), item);
        this.add_rename_on_click(item);
        this.rename(item);
    },

    new_inside: function(item){
        var new_item = $("<li><div>"+this.business_unit_icon+"<span class=\"name\">Nova categoria</span>"+this.remove_btn+"</div></li>").appendTo(this.options.parent_element.children().last());
        if(item.find("ul").size() <= 0) item.append("<ul></ul>");
        new_item = new_item.appendTo(item.find("ul"));
        this.add_remove_on_click(new_item.find("> div > .remover-btn"), new_item);
        this.add_new_inside_on_click(new_item.find("> div > .adicionar-btn"), item);
        this.add_rename_on_click(new_item);
        this.rename(new_item);
    },

    clear: function(){
        var _this = this;
        $.each(this.html_entities, function(index, item){
            _this.remove($(item));
        })
    },

    show: function(){
        this.html_entities.parent().show()
        var father_ul = this.html_entities.first().closest("ul.colunas-subcategorias");
        
        father_ul.show()
    },

    hide: function(){
        var displayed_items = 0;
        var father_ul = this.html_entities.first().closest("ul.colunas-subcategorias");

        this.html_entities.parent().hide();

        father_ul.find("li").each(function(){
            if($(this).css("display") !== "none") displayed_items++
        })

        if(displayed_items == 0) {
            father_ul.hide()
        }

    },

    update_counter: function(){
        this.options.counter.html(this.selected_items.length)
    }
}
