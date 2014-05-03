function Filter(options){
    this.criterias = {};
    for(key in options){
        this[key] = options[key];
    }
}

Filter.prototype = {

    filter_by: function(name, value){
        this.criterias[name] = value;
        this.filter();
    },

    filter: function(){
        var _this = this;
        this.rows.show();
        this.rows.each(function(index, row){
            var row = $(row);
            for(criteria in _this.criterias){
                if(_this.it_doesnt_match(criteria, _this.criterias[criteria], row)){
                    row.hide();
                }
            }
        });
    },

    it_doesnt_match: function(criteria, value, row){
        var criteria_value = row.find("[data-filter-criteria=\""+criteria+"\"]").text();
        return criteria_value.match(new RegExp(".*"+value+".*", "i")) == null;
    }

}
