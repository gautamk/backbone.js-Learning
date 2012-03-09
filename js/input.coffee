jQuery ->
    window.InputModel = Backbone.Model.extend({
        defaults:{
            tagName             :'input'
            type                :"text"
            className           :""
            container_className :''
            id                  :""
            name                :""
            value               :""
            placeholder         :"Enter Text"
            label               :"Text"
            error               :""
        }

        initialize:() ->
            # Set a Unique Id to Every input element
            @.attributes.id = _.uniqueId 'form_input_'
            @

        ### override this method for custom validation
        ###
        customValidate:(attrs) ->
            return

        validate:(attrs) ->
            ### Checking if input or textarea 
            and if type is text radio or checkbox
            ###
            switch attrs.tagName
                when "input","textarea" then break
                else return "Invalid tagName"

            switch attrs.type
                when "text","radio","checkbox" then break
                else return "Invalid type"

            return @.customValidate attrs
    })

    window.InputView = Backbone.View.extend({
        tagName         :'span'
        className       :'backbone-input-container'
        templateSelector:'#input-template'
        initialize:() ->
            ### Refer http://documentcloud.github.com/underscore/#bindAll 
            ###
            _.bindAll @,'render' ; 
            @.template = _.template $(@.templateSelector).html();
            @.model.bind 'change',@.render;
        
        render:() ->
            renderedContent = @.template @.model.toJSON();
            @.$el.html renderedContent;
            # return this
            @
    })

    @