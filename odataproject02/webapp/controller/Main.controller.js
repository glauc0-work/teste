sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast, ODataModel) {
    "use strict";

    return Controller.extend("com.ui.odataproject02.controller.Main", {
      onInit: function () {
        debugger;
        let lvServicePath = "/V2/OData/OData.svc/";

        // var jsonHeader = {
        // 	"Content-Type": "application/json",
        // 	Accept: "application/json",
        // 	dataType: "JSON",
        // };

        // loModelService.setHeaders(jsonHeader);
        // loModelService.setUseBatch(false);

        let loModelService = new ODataModel(lvServicePath, {
          defaultCountMode: "Inline",
        });
        var loView = this.getView();
        loView.setModel(loModelService);
      },

      onMainBtnShowTxtNome: function (oEvent) {
        //debugger
        var msg = this.getView().byId("mainTxtNome").getValue();
        if (msg == "") {
          return;
        } else {
          MessageToast.show(msg);
          this.getView().byId("mainTxtNome").setValue("");
        }
      },

      onMainBtnOData: function (oEvent) {
        let lvServicePath = "/V2/OData/OData.svc/";
        let loModelService = new ODataModel(lvServicePath);

        var jsonHeader = {
          "Content-Type": "application/json",
          Accept: "application/json",
          dataType: "JSON",
        };

        loModelService.setHeaders(jsonHeader);
        loModelService.setUseBatch(false);
        let that = this;

        var lvId = this.getView().byId("mainInTextService").getValue();
        var lvMsg = "";

        if (lvId == "") {
          lvMsg = this.getView()
            .getModel("i18n")
            .getResourceBundle()
            .getText("mainMsg001");
          MessageToast.show(lvMsg);
          return;
        } else if (isNaN(lvId)) {
          lvMsg = this.getView()
            .getModel("i18n")
            .getResourceBundle()
            .getText("mainMsg002");
          MessageToast.show(lvMsg);
          return;
        }

        var lvParameter = "/Categories(" + lvId + ")";
        loModelService.read(
          lvParameter,
          {
            success: function (oData) {
              debugger;
              that.byId("mainInTextServiceReturn").setValue(oData.Name);
              that.byId("mainInTextService").setValue("");
              // new Array("mainInTextServiceReturn").map(
              // 	(id, index) => {
              // 		that.byId(id).setValue(oData.results[index].Name)
              // })
            },

            error: function (oError) {
              this.getView().byId("mainInTextServiceReturn").setText("");
            },
          },
          this
        );
      },
    });
  }
);
