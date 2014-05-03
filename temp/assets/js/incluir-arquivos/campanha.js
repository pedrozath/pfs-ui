function Campanha(options){
    this.options = options;
    this.name = options.name;
    this.spawn();
    options.target_element
    extend(this, Selectable);
    if(this.options.selected) this.options.html_entities.find("a").click();
}

Campanha.prototype = {
    spawn: function(){
        var campanha_id = "campanhas-"+this.options.id

        html_content = [
            '<li id="'+campanha_id+'" data-id="'+this.options.id+'">',
            '    <a href="#">',
            '        <img src="'+this.options.img+'" alt="" />',
            '        <h2>'+this.options.name+'</h2>',
            '    </a>',
            '</li>'
        ].join("\n");

        this.options.parent_element.append(html_content);
        this.options.html_entities = $("#"+campanha_id);

    }
}