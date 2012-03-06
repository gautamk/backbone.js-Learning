(function() {

  jQuery(function() {
    window.InputModel = Backbone.Model.extend({
      defaults: {
        tagName: 'input',
        type: "text",
        className: "Default",
        container_className: '',
        id: "",
        name: "",
        value: "",
        placeholder: "Enter Text",
        label: "Text",
        error: ""
      }
    });
    return window.InputView = Backbone.View.extend({
      tagName: 'span',
      className: 'backbone-input-container',
      templateSelector: '#input-view-template',
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
  });

}).call(this);
