/** 
 * PrimeFaces Resizable Widget
 */
PrimeFaces.widget.Resizable = PrimeFaces.widget.BaseWidget.extend({
    
    init: function(cfg) {
        this.cfg = cfg;
        this.id = this.cfg.id;
        this.jqId = PrimeFaces.escapeClientId(this.id);
        this.jqTarget = $(PrimeFaces.escapeClientId(this.cfg.target));

        if(this.cfg.ajaxResize) {
            this.cfg.formId = $(this.target).parents('form:first').attr('id');
        }
        
        if (this.cfg.isContainment) {
        	this.cfg.containment = PrimeFaces.escapeClientId(this.cfg.parentComponentId);
        }

        var _self = this;

        this.cfg.stop = function(event, ui) {
            if(_self.cfg.onStop) {
                _self.cfg.onStop.call(_self, event, ui);
            }

            _self.fireAjaxResizeEvent(event, ui);
        }

        this.cfg.start = function(event, ui) {
            if(_self.cfg.onStart) {
                _self.cfg.onStart.call(_self, event, ui);
            }
        }

        this.cfg.resize = function(event, ui) {
            if(_self.cfg.onResize) {
                _self.cfg.onResize.call(_self, event, ui);
            }
        }

        this.jqTarget.resizable(this.cfg);
        
        this.removeScriptElement(this.id);
    },
    
    fireAjaxResizeEvent: function(event, ui) {
        if(this.cfg.behaviors) {
            var resizeBehavior = this.cfg.behaviors['resize'];
            if(resizeBehavior) {
                var ext = {
                    params: [
                        {name: this.id + '_width', value: parseInt(ui.helper.width())},
                        {name: this.id + '_height', value: parseInt(ui.helper.height())}
                    ]
                };

                resizeBehavior.call(this, ext);
            }
        }
    }
    
});