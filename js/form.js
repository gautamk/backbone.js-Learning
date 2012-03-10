(function() {

  jQuery(function() {
    window.FormCollection = Backbone.Collection.extend({
      model: InputModel,
      attributes: {
        className: "",
        id: "",
        action: "",
        method: "post"
      },
      initialize: function() {
        this.attributes.id = _.uniqueId('form_');
        return this;
      },
      setMethod: function(method) {
        switch (method.toLowerCase()) {
          case "get":
          case "post":
          case "put":
          case "delete":
            break;
          default:
            return false;
        }
        this.attributes.method = method.toLowerCase();
        return this;
      },
      getMethod: function() {
        return this.attributes.method;
      }
    });
    window.FormView = Backbone.View.extend({
      tagName: 'span',
      className: 'backbone-form-container',
      templateSelector: '#form-template',
      initialize: function() {
        _.bindAll(this, 'render');
        this.template = _.template($(this.templateSelector).html());
        this.collection.bind('reset', this.render);
        return this;
      },
      render: function() {
        var $form, collection;
        this.$el.html(this.template(this.collection.attributes));
        collection = this.collection;
        $form = this.$el.find("#" + this.collection.attributes.id);
        this.collection.each(function(input) {
          var inputView;
          inputView = new InputView({
            model: input,
            collection: this.collection
          });
          return $form.append(inputView.render().$el);
        });
        this.$el.html($form);
        return this;
      }
    });
    return this;
  });

}).call(this);
