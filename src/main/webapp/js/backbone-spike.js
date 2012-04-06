// Trying to connect Backbone to ajax server
(function($) {
    // stub sync function.
    // Backbone.sync = function(method, model, success, error) {
    //     success();
    // };

    App = Backbone.Router.extend({
        routes: {
            "/": "listItems",
            "list": "listItems"
        },
        //initialize: function (options) {},
        listItems: function () {
            var productsList = new ListView({
                "container": $('#theBeans'),
                "collection": items
            });
            items.deferred.done(function () {
                productsList.render();
            });
        }
    });

    var Entity = Backbone.Model.extend({

    });

    var Resource = Backbone.Model.extend({
        url: '/rest/hello/bean',
        defaults: {
            entity: null,
            links: null
        },
        initialize: function() {
        },
        parse: function(response) {
        	response.entity = new Entity(response.entity);
        	return response;
        }
    });


    var ResourceList = Backbone.Collection.extend({
        model: Resource,
        url: '/rest/hello/bean',

        initialize: function() {
//            this.fetch({
//                success: this.fetchSuccess,
//                error: this.fetchError
//            });
//            this.deferred = new $.Deferred();
        },
        deferred: Function.constructor.prototype,
        fetchSuccess: function(collection, response) {
            collection.deferred.resolve();
        },
        fetchError: function(collection, response) {
            throw new Error("Products fetch did get collection from API");
        }

    });

    var EntityView = Backbone.View.extend({
    	tagName: 'ul',
    	render: function() {
    		var theView = this;
    		$(this.el).html("");
            _(this.model.toJSON()).each(function(val, key) {
            	$(theView.el).append('<li class="entitykey" id="' + key + '">' + key + ": "+ val + '</li>');
            });
            return this;
    	}
    });

    var ResourceView = Backbone.View.extend({
        tagName: 'li',
        // name of tag to create
        events: {
            'click span.delete': 'remove'
        },
        initialize: function() {
            _.bindAll(this, 'render', 'unrender', 'remove');
            // every function that uses 'this' as the current object should be in here
            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
        },

        render: function() {
        	$(this.el).html("");
        	var entityView = new EntityView({model: new Entity(this.model.get('entity').toJSON())});
            $(this.el).append(entityView.render().el);
            $(this.el).append('<span class="delete">[delete]</span>');
            return this;
            // for chainable calls, like .render().el
        },

        unrender: function() {
            $(this.el).remove();
        },

        remove: function() {
            this.model.destroy();
        }


    });

    var ListView = Backbone.View.extend({
        el: $('body'),
        // attaches `this.el` to an existing element.
        events: {
            'click button#add': 'addResource'
        },

        initialize: function() {
            _.bindAll(this, 'render', 'addResource', 'appendResource');
            // remember: every function that uses 'this' as the current object should be in here
            this.collection = new ResourceList();
            this.collection.bind('add', this.appendResource);
            // collection event binder
            this.counter = 0;
            // total number of Resources added thus far
            this.render();
        },


        render: function() {
            $(this.el).append("<button id='add'>Add list item</button>");
            $(this.el).append("<ul></ul>");
            _(this.collection.models).each(function(item) {
                // in case collection is not empty
                self.appendResource(item);
            }, this);
        },


        addResource: function() {
            this.counter++;
            // this.collection.fetch();
            var item = new Resource();
            item.fetch();
            this.collection.add(item);
            // add item to collection; view is updated via event 'add'
        },

        appendResource: function(item) {
            var itemView = new ResourceView({
                model: item
            });
            $('ul', this.el).append(itemView.render().el);
        }

    });

    items = new ResourceList();


    var listView = new ListView();
})(jQuery);