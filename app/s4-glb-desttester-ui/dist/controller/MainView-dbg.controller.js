sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/Text",
    "sap/ui/core/library",
], (Controller, MessageToast, Dialog, Button, mobileLibrary, Text, coreLibrary) => {
    "use strict";

    // shortcut for sap.m.ButtonType
    var ButtonType = mobileLibrary.ButtonType;

    // shortcut for sap.m.DialogType
    var DialogType = mobileLibrary.DialogType;

    // shortcut for sap.ui.core.ValueState
    var ValueState = coreLibrary.ValueState;

    return Controller.extend("s4glbdesttesterui.controller.MainView", {

        onInit() {
        },
        async onPress(oEvent) {
            //create local json model in component.js and bind
            var model = this.getView().getModel("local");
            var value = model.getProperty("/destName");
            var mainModel = this.getView().getModel();

            var actionPath = "/destTester.test(...)"
            var parameterName = "destName";

            var actionBinding = mainModel.bindContext(actionPath);

            // Set parameters for the action
            actionBinding.setParameter(parameterName, value);
            try {
                sap.ui.core.BusyIndicator.show();
                await actionBinding.invoke();
                const actionResult = actionBinding.getBoundContext()?.getObject();
                console.log(actionResult.message)
                sap.ui.core.BusyIndicator.hide();

                if (!this.edialog) {
                    this.sdialog = new Dialog({
                        type: DialogType.Message,
                        title: "Success",
                        state: ValueState.Success,
                        content: new Text({ text: "Connection established successfully." }),
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "OK",
                            press: function () {
                                this.sdialog.close();
                            }.bind(this)
                        })
                    })
                }
                sap.ui.core.BusyIndicator.hide();
                this.sdialog.open()
            }
            catch (error) {
                console.log(error);
                if (!this.edialog) {
                    this.edialog = new Dialog({
                        type: DialogType.Message,
                        title: "Error",
                        state: ValueState.Error,
                        content: new Text({ text: `Failed to establish connection: ${error.message}` }),
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "OK",
                            press: function () {
                                this.edialog.close();
                            }.bind(this)
                        })
                    })
                }
                sap.ui.core.BusyIndicator.hide();
                this.edialog.open()
            }
        }
    });
});