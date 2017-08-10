define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!../../templates/control-panel.html',
        'jquery.validate'
    ], function( $, _, Backbone, controlPanelTemplate )
    {
        var ControlPanel = Backbone.View.extend(
            {
                events :
                {
                    'click #show-map' : 'submitLocation',
                    'change input'    : 'inputChanged'
                },

                _template :  _.template( controlPanelTemplate ),

                submitLocation : function( e )
                {
                    e.preventDefault();
                    if ( this.validateInputValue( this.$( '#latitude' ).val() )
                        && this.validateInputValue( this.$( '#longitude' ).val() ) )
                    {
                        this.model.set(
                            {
                                'latitude'  : this.$( '#latitude' ).val(),
                                'longitude' : this.$( '#longitude' ).val()
                            } );
                    }
                    else
                    {
                        this.model.set(
                            {
                                'latitude'  : null,
                                'longitude' : null
                            } );
                    }
                    this.trigger( 'input:submitted' );
                },

                validateInputValue : function( value )
                {
                    const NUMERIC_REGEXP = /^\d+.?\d*$/;

                    return NUMERIC_REGEXP.test( value );
                },

                inputChanged : function( e )
                {
                    if ( !this.validateInputValue( e.target.value ) )
                    {
                        $( e.target ).parent().addClass( 'invalid-input' );
                    }
                    else
                    {
                        $( e.target ).parent().removeClass( 'invalid-input' );
                    }
                    this.trigger( 'input:changed' );
                },

                serializeData : function()
                {
                    return this.model.toJSON();
                },

                render : function()
                {
                    var html = this._template;

                    this.$el.html( html );

                    this.trigger( 'render' );

                    return this;
                }
            } );

        return ControlPanel;

    } );