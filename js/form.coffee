jQuery ->

    window.FormCollection = Backbone.Collection.extend({
        model:InputModel
        attributes:{
            className:""
            id:""
            action:""
            method:"post"
        }
        initialize:() ->
            @.attributes.id = _.uniqueId 'form_'
            @
        setMethod:(method) ->
            switch method.toLowerCase()
                when "get","post","put","delete" then break
                else return false
            @.attributes.method = method.toLowerCase()
            @
        getMethod:() ->
            # return
            @.attributes.method 
    })

    window.FormView = Backbone.View.extend({
        tagName         :'span'
        className       :'backbone-form-container'
        templateSelector:'#form-template'
        initialize: () ->
            _.bindAll @,'render'
            @.template = _.template $(@.templateSelector).html()
            @.collection.bind 'reset',@.render
            @

        render: () ->
            @.$el.html @.template @.collection.attributes
            collection = @.collection
            $form = @.$el.find("#"+@.collection.attributes.id)
            
            @.collection.each (input)->
                inputView = new InputView({
                    model:input,
                    collection:@.collection
                })
                $form.append(inputView.render().$el)
            @.$el.html($form)
            @

    })

    @