jQuery ->
    window.InputModel = Backbone.Model.extend({
        defaults:{
            tagName             :'input'
            type                :"text"
            className           :"Default"
            container_className :''
            id                  :""
            name                :""
            value               :""
            placeholder         :"Enter Text"
            label               :"Text"
            error               :""
        }
    });

    window.InputView = Backbone.View.extend({
        tagName         :'span'
        className       :'backbone-input-container'
        templateSelector:'#input-view-template'
        initialize:() ->
            ### Refer http://documentcloud.github.com/underscore/#bindAll ###
            _.bindAll @,'render' ; 
            
            @.template = _.template $(@.templateSelector).html();
            @.model.bind 'change',@.render;
        
        render:() ->
            renderedContent = @.template @.model.toJSON();
            @.$el.html renderedContent;
            return @;
        
    });

