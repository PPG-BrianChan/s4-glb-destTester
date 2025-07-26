sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
function (JSONModel, Device) {
    "use strict";

    return {
        /**
         * Provides runtime information for the device the UI5 app is running on as a JSONModel.
         * @returns {sap.ui.model.json.JSONModel} The device model.
         */
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay"); //Read only
            return oModel;
        },

        createLocalModel: function () {
            var oModel = new JSONModel({"destName":""});
            oModel.setDefaultBindingMode("TwoWay"); // Update model from UI
            return oModel;
        }

    };

});