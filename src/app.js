define( [
  'jquery',
  'underscore',
  'backbone',
  'models/mapData',
  'views/main' ], function( $, _, Backbone, MapdataModel, AppPresenter )
{
    var initialize = function()
    {
        /**
         * DOM ready method
         *
         * Method initializes the main Backbone presenter
         */
        $( document ).ready( function()
        {
            new AppPresenter( { model : new MapdataModel() } ).render();
        } );
    };

    return { initialize : initialize };
} );