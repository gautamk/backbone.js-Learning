(function() {

  jQuery(function() {
    window.InputModel = Backbone.Model.extend({
      defaults: {
        tagName: 'input',
        type: "text",
        className: "",
        container_className: '',
        id: "",
        name: "",
        value: "",
        placeholder: "Enter Text",
        label: "Text",
        error: ""
      },
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
      initialize: function() {
        /* Refer http://documentcloud.github.com/underscore/#bindAll
        */        _.bindAll(this, 'render');
        this.template = _.template($(this.templateSelector).html());
        return this.model.bind('change', this.render);
      },
      render: function() {
        var renderedContent;
        renderedContent = this.template(this.model.toJSON());
        this.$el.html(renderedContent);
        return this;
      }
    });
    return this;
  });

}).call(this);
