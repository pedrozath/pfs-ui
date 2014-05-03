function Destinatarios(options){
    this.options = options;
    this.name = options.name;
    this.set_click_event();
    if(!this.selected_items) this.selected_items = [];
}

Destinatarios.prototype = {
    set_click_event: function(){
        var _this = this;
        this.options.html_entities.click(function(e){
            var item = $(e.currentTarget);
            if(item.is(":checked")){
                _this.select(item);
            } else {
                _this.deselect(item);
            }
        });
    },

    select: function(item){
    	var id = parseInt(eval("item."+this.options.name_location_in_html));
        this.selected_items.push(id)
        if(this.options.select_callback) this.options.select_callback.call(this);
    },

    deselect: function(item){
    	var id = parseInt(eval("item."+this.options.name_location_in_html));
        var item_index = this.selected_items.indexOf(id)
        this.selected_items.splice(item_index, 1);
        if(this.options.select_callback) this.options.select_callback.call(this);
    }
}