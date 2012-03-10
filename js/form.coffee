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

        isValidMethod:(method) ->
            switch method.toLowerCase()
                when "get","post","put","delete" then return true
                else return false
        setMethod:(method) ->
            @.attributes.method = method.toLowerCase() if isValidMethod(method) is true
            @
        getMethod:() ->
            # return
            @.attributes.method
        setClassName:(className) ->
            @.attributes.className = className unless className is undefined
            @
        getClassName:() ->
            # return
            @.attributes.className
        setAction:(action) ->
            @.attributes.action = action unless action is undefined
            @
        getAction:() ->
            # return
            @.attributes.action

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