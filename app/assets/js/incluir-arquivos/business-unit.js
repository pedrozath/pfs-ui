function BusinessUnit(options) {
    this.options = options;
    this.name = options.name;
    this.id = options.id;
    this.spawn();
    this.spawn_subcategories();
    if(!this.options.editable) this.set_click_event();
    if(this.options.selected) this.select();
}

BusinessUnit.prototype = {
    spawn: function(){
        var _this = this;
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

        if(this.options.editable){
            this.html_entity.find(".footer p").hide();
            $(".all-business-units").hide();
            var nova_categoria = $('<p><a>Nova categoria</a></p>');
            nova_categoria.appendTo(this.html_entity.find(".footer")).on("click", function(e){
                e.preventDefault();
                e.stopPropagation();
                _this.subcategories.new();
            });
        }
    },

    spawn_subcategories: function(){
        this.subcategories = new Subcategorias({
            business_unit:  this,
            items:          this.options.subcategories,
            parent_element: $(".subcategorias .colunas-subcategorias"),
            counter:        this.html_entity.find(".subs-counter"),
            editable:       this.options.editable,
            selector:       "div"
        });
    },

    set_click_event: function(){
        var _this = this;
        this.html_entity.find("a").click(function(e){
            e.preventDefault();
            if(_this.selected){
                _this.deselect();
            } else {
                _this.select();
            }
        });
    },

    select: function(filter){
        // this.html_entity.siblings().removeClass("selected")
        if(typeof filter == "undefined") filter = true;
        this.selected = true;
        this.update_class();
        App.selected_business_unit = this.name;

        if(filter) { 
            this.hide_subcategories_from_all_business_units_except_the_selected_ones();
            $(".all-business-units").removeClass("selected")
        }

        this.show_subcategories();
    },

    deselect: function(filter){
        if(typeof filter == "undefined") filter = true;
        this.selected = false;
        this.update_class();
        this.html_entity.removeClass("selected");
        if(filter) this.hide_subcategories()
        // this.subcategories.clear();
        $(".all-business-units").removeClass("selected")
    },

    show_subcategories: function(){
        this.subcategories.show();
    },

    hide_subcategories: function(){
        this.subcategories.hide();
    },

    update_class: function(){
        if(this.selected){
            this.html_entity.addClass("selected")
        } else {
            this.html_entity.removeClass("selected")
        }
    },

    hide_subcategories_from_all_business_units_except_the_selected_ones: function(){
        $.each(App.business_units, function(index, business_unit){
            if(!business_unit.selected){
                business_unit.subcategories.hide();
            }
        });
    }

}
