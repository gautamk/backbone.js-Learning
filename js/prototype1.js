(function($){
    window.InputModel = Backbone.Model.extend({
        defaults:{
            "type"          :"text",
            "className"     :"",
            "id"            :"",
            "name"          :"",
            "value"         :"",
            "placeholder"   :"Enter Text",
            "label"         :"Text",
        }
    });

    window.InputView = Backbone.View.extend({
        templateCode:$("#input-view-template").html(),
        tagName:'span',
        initialize:function(){
            _.bindAll(this,"render");
            this.model.bind('change',this.render);
            this.template = _.template(this.templateCode);
        },
        render:function(){
            var renderedContent = this.template(this.model.toJSON());
            this.$el.html(renderedContent);
            this.className = this.model.get("className");
            return this;
        },
        input:function(){
            return this.$el.children('input');
        },
        inputType:function(input_type){
            if(input-type == undefined){
                return this.model.get('type');
            }
            this.model.set('type',input_type);
        },

        /*
            Returns if a check box or radio button is checked
        */
        isChecked:function(){

            switch(this.model.get('type')){
                case "radio"     :
                case "checkbox"  :
                    return this.input().is(':checked');
                default:
                    return false;
            }
        },
        getValue:function(){
            switch(this.model.get('value')){
                default         :
                case 'text'     :
                case 'number'   :
                case 'password' : return this.input().val();

                case 'checkbox' :
                case 'radio'    : return this.isChecked();
            }
        }
    });

    $(document).ready(function(){
        ipt = new InputModel ({
            "type"          :"text",
            "className"     :"ASd",
            "id"            :"IDsomethign",
            "name"          :"SomeName",
            "value"         :"",
            "placeholder"   :"Enter Text",
            "label"         :"Text",
        });
        ipv = new InputView({
            model:ipt,
        });
        $("#container-div").html(ipv.render().el);
    });
})(jQuery);