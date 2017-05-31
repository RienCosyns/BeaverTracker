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
    controller.displayBeavers();
    console.log("============")
}
init();
//console.log(init());

controller.addBeaver("Beaverly", 6, "female", "Beavertown");
controller.addBeaver("Keaver",null, "Other", "Ontario");
controller.addLocation(0, "Dublin"); 

controller.toggleTracking(1);
console.log(model.beaverObjects["1"]);
controller.toggleTracking(1);
console.log(model.beaverObjects["1"]);