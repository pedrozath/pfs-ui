function Selectable(options){
    if(!options.selected_items) this.selected_items = [];
    this.set_click_event();
    this.options.selector = this.options.selector || "a"
}

Selectable.prototype = {
    set_click_event: function(){
        var _this = this;
        this.options.html_entities.find(this.options.selector).click(function(e){
            e.preventDefault();
            var item = $(e.currentTarget);
            if(item.parent().hasClass("selected")){
                _this.deselect(item.parent());
            } else {
                _this.select(item.parent());
            }
        });
    },

    select: function(item){
        item.addClass("selected");
        var id = parseInt(item.attr("data-id"));
        if(this.selected_items.indexOf(id) < 0) this.selected_items.push(id)
        if(this.options.select_callback) this.options.select_callback.call(this, item);
    },

    deselect: function(item){
        item.removeClass("selected");
        var id = parseInt(item.attr("data-id"));
        var item_index = this.selected_items.indexOf(id);
        this.selected_items.splice(item_index, 1);
        if(this.options.deselect_callback) this.options.deselect_callback.call(this, item);
    },    
}

