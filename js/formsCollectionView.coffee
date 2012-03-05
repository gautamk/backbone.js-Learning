jQuery ->
    window.InputForm = Backbone.Collection.extend ({
        model:InputModel
        url:'../js/forms.data.json'
    })

    window.InputFormView = Backbone.View.extend({
        tagName:'form'
        attributes:{
            method:'post'
            action:''
            id:""
            class:""
        }
        templateSelector:"#form-input-view-template"
        generate:(content="")->
            @.el = @.make(@.tagName,@.attributes,content)
            @$el=$(@el)
            @

        inititilize:->
            _.bindAll @ , 'render'
            #@.template = _.template jQuery(templateSelector).html()
            @.collection.bind 'reset' , @.render
            @
        render:->
            renderedContent=""
            collection = @.collection
            collection.each (ip)->

                view = new InputView {
                    model:ip
                    collection:collection
                }
                
                renderedContent += view.render().$el.html()
            @.generate renderedContent
            @
    })

    @

jQuery ->
    window.inputForm = new InputForm()
    window.inputFormView = new InputFormView({collection:inputForm})
    inputForm.reset [
        {
            type                :"text",
            className           :"",
            container_className :"",
            id                  :"form_email",
            name                :"email",
            value               :"",
            placeholder         :"Enter your Email",
            label               :"email",
            error               :""
        },
        {
            type                :"password",
            className           :"",
            container_className :"",
            id                  :"form_password",
            name                :"password",
            value               :"",
            placeholder         :"Enter your Password",
            label               :"Password",
            error               :""
        },
        {
            type                :"submit",
            className           :"btn ",
            container_className :"",
            id                  :"form_submit",
            name                :"submit",
            value               :"Login",
            placeholder         :"",
            label               :"",
            error               :""
        }
    ]

    $("#container-div").html inputFormView.render().$el