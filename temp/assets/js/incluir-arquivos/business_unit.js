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
