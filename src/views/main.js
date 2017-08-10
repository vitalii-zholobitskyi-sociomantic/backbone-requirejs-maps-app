define(
    [
        'jquery',
        'underscore',
        'backbone',
        'views/controlPanel',
        'views/map',
        'views/streetImages',
        'text!../../templates/app.html'
    ], function( $, _, Backbone, ControlPanel, Map,
        StreetImages, appTemplate )
        {
        return Backbone.View.extend(
            {
                el : 'body',

                _template : _.template( appTemplate ),

                initialize : function()
                {
                    this.subViews = {};

                    this.subViews.controlPanel = new ControlPanel(
                        {
                            model : this.model
                        } );

                    this.subViews.map = new Map(
                        {
                            model : this.model
                        } );

                    this.subViews.streetView = new StreetImages(
                        {
                            model : this.model
                        } );

                    this.on( 'render', this.onRender );

                    this.listenTo( this.subViews.controlPanel,
                        'input:submitted',
                        function()
                        {
                            this.displayMap();
                            this.clearViewStreet();
                        } );

                    this.listenTo( this.subViews.map,
                        'map:clicked',
                        this.displayStreetView );
                },

                onRender : function()
                {
                    this.$( '#app' ).prepend(
                        this.subViews.controlPanel.render().el,
                        this.subViews.map.render().el,
                        this.subViews.streetView.render().el
                    );

                    this.subViews.streetView.setVisible( false );
                },

                displayMap : function()
                {
                    this.subViews.map.loadMap();
                },

                clearViewStreet : function()
                {
                    this.subViews.streetView.clear();
                },

                displayStreetView : function( map, position )
                {
                    this.subViews.streetView.setVisible( true );
                    this.subViews.streetView.load( map, position );
                },

                render : function()
                {
                    var html = this._template;

                    this.$el.html( html );

                    this.trigger( 'render' );

                    return this;
                }
            } );
    }
);