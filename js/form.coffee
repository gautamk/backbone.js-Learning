jQuery ->

    window.FormCollection = Backbone.Collection.extend({
        model:InputModel
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
            
            @

    })

    @