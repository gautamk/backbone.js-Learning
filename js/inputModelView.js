(function($){
    window.InputModel = Backbone.Model.extend({
        defaults:{
            type                :"text",
            className           :"Default",
            container_className :'',
            id                  :"",
            name                :"",
            value               :"",
            placeholder         :"Enter Text",
            label               :"Text",
            error               :"",
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
            var renderedContent = this.template(this.model.toJSON());
            this.$el.html(renderedContent);
            return this;
        }
    });

})(jQuery);