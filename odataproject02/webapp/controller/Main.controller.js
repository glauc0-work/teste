sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/odata/v2/ODataModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, MessageToast, ODataModel) {
		"use strict";

		return Controller.extend("com.ui.odataproject02.controller.Main", {
			onInit: function () {

			},

			onMainBtnShowTxtNome: function(oEvent){
				//debugger
				var msg = this.getView().byId("mainTxtNome").getValue();
				if (msg == "") {
					return;
				}
				else{
					MessageToast.show(msg);
					this.getView().byId("mainTxtNome").setValue("");
				}
				
			},

			onMainBtnOData: function(oEvent){
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

				loModelService.read("/Categories", {
					success: function(oData) {
						debugger;
						new Array("mainLblTextService").map(
							(id, index) => {
								that.byId(id).setValue(oData.results[index].Name)
						})
					},

					error: function(oError){
						this.getView().byId("mainLblTextService").setValue("");
					}
				}, this);

			}
		});
	});
