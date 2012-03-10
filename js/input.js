(function() {

  jQuery(function() {
    window.InputModel = Backbone.Model.extend({
      defaults: {
        tagName: "input",
        type: "text",
        className: "",
        container_className: "",
        id: "",
        name: "",
        value: "",
        placeholder: "",
        label: "",
        error: ""
      },
      idAttribute: 'attributes.id',
      initialize: function() {
        this.attributes.id = _.uniqueId('form_input_');
        return this;
      },
      /* override this method for custom validation
      */
      customValidate: function(attrs) {},
      validate: function(attrs) {
        /* Checking if input or textarea 
        and if type is text radio or checkbox
        */        switch (attrs.tagName) {
          case "input":
          case "textarea":
            break;
          default:
            return "Invalid tagName";
        }
        switch (attrs.type) {
          case "text":
          case "radio":
          case "checkbox":
          case "hidden":
            break;
          default:
            return "Invalid type";
        }
        return this.customValidate(attrs);
      }
    });
    window.InputView = Backbone.View.extend({
      tagName: 'span',
      className: 'backbone-input-container',
      templateSelector: '#input-template',
      events: {},
      valueChanged: function() {
        this.model.attributes.value = this.$inputElement.val();
        console.log(this.$inputElement.val());
        return this;
      },
      initialize: function() {
        _.bindAll(this, 'render');
        this.template = _.template($(this.templateSelector).html());
        this.model.bind('change', this.render);
        this.events["change #" + this.model.get('id')] = "valueChanged";
        this.delegateEvents();
        return this;
      },
      render: function() {
        var renderedContent;
        renderedContent = this.template(this.model.toJSON());
        this.$el.html(renderedContent);
        this.$inputElement = this.$el.find("#" + this.model.get('id'));
        console.log(this.$inputElement);
        this.delegateEvents();
        return this;
      }
    });
    return this;
  });

}).call(this);
