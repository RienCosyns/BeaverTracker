// function init(){
//     beaverEvents.addModel(beaverApp);
//     beaverEvents.getViewState(beaverBrowserViewer);
//     beaverEvents.viewState.beaverBrowserViewer.showMapButton();
//     // Display beavers
//     beaverEvents.displayBeavers();
//     // beaverEvents.getGeoLocation();
//     handlers.setupEvents();
// }

function init(){
    homeScreen.createHomePage();
    beaverEvents.addModel(beaverApp);
    beaverEvents.getViewState(homeScreen);
    beaverEvents.viewState.homeScreen.showMapButton();
    // Display beavers
    beaverEvents.displayBeavers();
    // beaverEvents.getGeoLocation();
    handlers.setupEvents();
}