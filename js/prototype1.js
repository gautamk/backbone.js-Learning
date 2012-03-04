(function($){
    window.InputModel = Backbone.Model.extend({
        defaults:{
            type            :"text",
            className       :"Default",
            id              :"",
            name            :"",
            value           :"",
            placeholder     :"Enter Text",
            label           :"Text",
            error           :"",
        }
    });

    window.InputView = Backbone.View.extend({
        tagName         :'span',
        className       :'backbone-input-container',
        templateSelector:'#input-view-template',
        initialize:function(){
            _.bindAll(this,'render'); // Refer http://documentcloud.github.com/underscore/#bindAll
            
            this.template = _.template($(this.templateSelector).html());
            this.model.bind('change',this.render);
        },
        render:function(){
            console.log("Reached Render",this.model.toJSON());
            var renderedContent = this.template(this.model.toJSON());
            this.$el.html(renderedContent);
            return this;
        }
    });

    $(document).ready(function(){
        ipm = new InputModel ({
            type          :"text",
            class         :"ASd",
            id            :"IDsomethign",
            name          :"SomeName",
            value         :"",
            placeholder   :"Enter Some Text",
            label         :"Text",
        });
        ipv = new InputView({
            model:ipm,
        });
        $("#container-div").append(ipv.render().el);
    });
})(jQuery);