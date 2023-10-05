//jQuery.sap.registerModulePath("demo.suresh.reusecomp", "/home/user/projects/reusecomp/webapp");
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("demo.suresh.compconsumer.controller.View1", {
            onInit: function () 
            {
                var oViewModel = new JSONModel({
                    CustomerID: ""
                });
                this.getView().setModel(oViewModel, "local");
            },

            initComponent: function (sCustomerID) {
                if (!this._customerDetailComponent) {
                    var oCustomerDetailComponent = this.getOwnerComponent().createComponent({
                        usage: "customerDetailComponent",
                        settings: {
                            customerID: sCustomerID
                        }
                    });
                    oCustomerDetailComponent.then(
                        function (oCustomerDetail) {
                            oCustomerDetail.setCustomerID(sCustomerID);
                            this.byId("customerDetailContainer").setComponent(oCustomerDetail);
                            this._customerDetailComponent = oCustomerDetail;
                        }.bind(this)
                    );
                }
                
                else {
                    this._customerDetailComponent.setCustomerID(sCustomerID);
                }
            },
        

            initComponent2: function (sCustomerID) 
            {
                if (!this._customerDetailComponent) {
                    var oCustomerDetailComponent = this.getOwnerComponent().createComponent({
                        usage: "customerDetailComponent2",
                        settings: {
                            customerID: sCustomerID
                        }
                    });
                    oCustomerDetailComponent.then(
                        function (oCustomerDetail) {
                            oCustomerDetail.setCustomerID(sCustomerID);
                            this.byId("customerDetailContainer2").setComponent(oCustomerDetail);
                            this._customerDetailComponent = oCustomerDetail;
                        }.bind(this)
                    );
                }
                
                else {
                    this._customerDetailComponent.setCustomerID(sCustomerID);
                }
            },
            onGo: function (oControlEvent) { debugger
                let sCustomerID = 12;
                //  this.getView().getModel("local").getProperty("/CustomerID");
                sCustomerID && this.initComponent(sCustomerID);

            },

            onGo2: function (oControlEvent) { debugger
                let sCustomerID = 12;
                //  this.getView().getModel("local").getProperty("/CustomerID");
                sCustomerID && this.initComponent2(sCustomerID);
            },

            onAfterRendering: function () {
                var oSplitCont = this.getSplitContObj(),
                    ref = oSplitCont.getDomRef() && oSplitCont.getDomRef().parentNode;
                // set all parent elements to 100% height, this should be done by app developer, but just in case
                if (ref && !ref._sapUI5HeightFixed) {
                    ref._sapUI5HeightFixed = true;
                    while (ref && ref !== document.documentElement) {
                        var $ref = jQuery(ref);
                        if ($ref.attr("data-sap-ui-root-content")) { // Shell as parent does this already
                            break;
                        }
                        if (!ref.style.height) {
                            ref.style.height = "100%";
                        }
                        ref = ref.parentNode;
                    }
                }
            },
    
            onPressNavToDetail: function () {
                this.getSplitContObj().to(this.createId("detailDetail"));
            },
    
            onPressDetailBack: function () {
                this.getSplitContObj().backDetail();
            },
    
            onPressMasterBack: function () {
                this.getSplitContObj().backMaster();
            },
    
            onPressGoToMaster: function () {
                this.getSplitContObj().toMaster(this.createId("master2"));
            },
    
            onListItemPress: function (oEvent) {
                var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
    
                this.getSplitContObj().toDetail(this.createId(sToPageId));
            },
    
            onPressModeBtn: function (oEvent) {
                var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();
    
                this.getSplitContObj().setMode(sSplitAppMode);
                MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, { duration: 5000 });
            },
    
            getSplitContObj: function () {
                var result = this.byId("SplitContDemo");
                if (!result) {
                    Log.error("SplitApp object can't be found");
                }
                return result;
            }
        });
    });