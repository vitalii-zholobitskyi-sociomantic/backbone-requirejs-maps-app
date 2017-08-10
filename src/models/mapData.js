define( [
  'underscore',
  'backbone'
], function( _, Backbone )
{
  var MapdataModel = Backbone.Model.extend(
    {
        defaults :
        {
            latitude  :   '52.52437',
            longitude :  '13.41053'
        }
    } );

  return MapdataModel;
} );