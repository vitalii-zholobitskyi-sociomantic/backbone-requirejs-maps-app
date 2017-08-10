/**
 *  RequireJs Configuration
 */
require.config(
{
    baseUrl : 'src',
    paths   :
    {
        'jquery'          : '../lib/jquery-1.10.2.min',
        'jquery.validate' : '../lib/jquery.validate.min',
        'underscore'      : '../lib/lodash.compat.min',
        'backbone'        : '../lib/backbone',
        'text'            : '../lib/text',
        'goog'            : '../lib/goog',
        'async'           : '../lib/async',
        'propertyParser'  : '../lib/propertyParser',
        'googlemaps'      : '../lib/googlemaps'
    },
    shim :
    {
        'backbone' :
        {
            deps    :    [ 'underscore', 'jquery' ],
            exports : 'Backbone'
        },
        'underscore' :
        {
            exports : '_'
        },
        'jquery.validate' :
        {
            deps : [ 'jquery' ]
        }
    }
} );


/**
 *  Entry point of the application
 */
require(
    [ 'app',
      'async!http://maps.google.com/maps/api/js?sensor=false' ],
    function( App )
    {
        App.initialize();
    }
);