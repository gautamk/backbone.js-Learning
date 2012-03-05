(function() {

  jQuery(function() {
    window.InputForm = Backbone.Collection.extend({
      model: InputModel,
      url: '../js/forms.data.json'
    });
    window.InputFormView = Backbone.View.extend({
      tagName: 'form',
      attributes: {
        method: 'post',
        action: '',
        id: "",
        "class": ""
      },
      templateSelector: "#form-input-view-template",
      generate: function(content) {
        if (content == null) content = "";
        this.el = this.make(this.tagName, this.attributes, content);
        this.$el = $(this.el);
        return this;
      },
      inititilize: function() {
        _.bindAll(this, 'render');
        this.collection.bind('reset', this.render);
        return this;
      },
      render: function() {
        var collection, renderedContent;
        renderedContent = "";
        collection = this.collection;
        collection.each(function(ip) {
          var view;
          view = new InputView({
            model: ip,
            collection: collection
          });
          return renderedContent += view.render().$el.html();
        });
        this.generate(renderedContent);
        return this;
      }
    });
    return this;
  });

  jQuery(function() {
    window.inputForm = new InputForm();
    window.inputFormView = new InputFormView({
      collection: inputForm
    });
    inputForm.reset([
      {
        type: "text",
        className: "",
        container_className: "",
        id: "form_email",
        name: "email",
        value: "",
        placeholder: "Enter your Email",
        label: "email",
        error: ""
      }, {
        type: "password",
        className: "",
        container_className: "",
        id: "form_password",
        name: "password",
        value: "",
        placeholder: "Enter your Password",
        label: "Password",
        error: ""
      }, {
        type: "submit",
        className: "btn ",
        container_className: "",
        id: "form_submit",
        name: "submit",
        value: "Login",
        placeholder: "",
        label: "",
        error: ""
      }
    ]);
    return $("#container-div").html(inputFormView.render().$el);
  });

}).call(this);
