define(
    [   'jquery',
        'underscore',
        'backbone',
        'text!../../templates/map.html'
    ],
    function( $, _, Backbone, mapTemplate )
    {
        return Backbone.View.extend(
            {
                _template : _.template( mapTemplate ),

                loadMap : function()
                {
                    var self = this;

                    if ( !( this.model.get( 'latitude' )
                        && this.model.get( 'longitude' ) ) )
                    {
                        this.hideMap();
                        return;
                    }

                    var position =
                        new google.maps.LatLng(
                            this.model.get( 'latitude' ),
                            this.model.get( 'longitude' ) );

                    var mapOptions = {
                        zoom      : 15,
                        center    : position,
                        mapTypeId : google.maps.MapTypeId.ROADMAP
                    };

                    var map =
                        new google.maps.Map(
                            document.getElementById( 'map-canvas' ),
                            mapOptions );

                    var marker = new google.maps.Marker(
                        {
                            position : mapOptions.center,
                            label    : 'Click me!',
                            map      : map
                        } );


                    google.maps.event.addListener( marker, 'click', function()
                    {
                        self.trigger( 'map:clicked', map, position );
                    } );
                },


                serializeData : function()
                {
                    return this.model.toJSON();
                },

                hideMap : function()
                {
                    $( '#map-canvas' ).html( '' );
                },

                initialize : function()
                {
                    _.bindAll( this, 'render' );
                    this.model.bind( 'change', this.render );
                },
                render : function()
                {
                    var html = this._template;

                    this.$el.html( html );

                    this.trigger( 'render' );

                    return this;
                }
            } );
    } );
