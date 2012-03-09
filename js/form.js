(function() {

  jQuery(function() {
    window.FormCollection = Backbone.Collection.extend({
      model: InputModel
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
        return this;
      }
    });
    return this;
  });

}).call(this);
