sap.ui.define([
    "sap/ui/core/UIComponent",
    "s4glbdesttesterui/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("s4glbdesttesterui.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            this.setModel(models.createLocalModel(), "local");

            // enable routing
            this.getRouter().initialize();
        }
    });
});