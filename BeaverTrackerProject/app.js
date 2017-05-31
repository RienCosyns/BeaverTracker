// add modules for console version

var model = require("./models/modelscript");
var view  = require("./views/viewscript");
var controller = require("./controller/controllerscript");

// console.log(model);
// console.log(view);
// console.log(controller);

function init(){
    // add model and view to controller
    controller.addModel(model);
    controller.getView(view);
    var arr = controller.modelState.getAll();
    controller.viewState.beaverConsoleViewer.displayBeavers(arr);
}

console.log(init());