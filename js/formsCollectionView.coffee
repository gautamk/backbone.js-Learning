jQuery ->
    window.InputForm = Backbone.Collection.extend ({
        model:InputModel
        url:'./'
    })

    window.InputFormView = Backbone.View.extend({
        tagName:'form'
        attributes:{
            method:'post'
            action:'./'
            id:""
            class:""
        }
        templateSelector:"#form-input-view-template"
        inititilize:->
            _.bindAll this , 'render'
            this.template = _.template jQuery(templateSelector).html()
            this.collection.bind 'reset' , this.render
            @
        render:->
            
    })

    @