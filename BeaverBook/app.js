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
    beaverEvents.addModel(beaverRelations);
    beaverEvents.getViewState(homeScreen);
    beaverEvents.getViewState(profileView);
    beaverEvents.activeView = homeScreen.name;
    beaverEvents.viewState.homeScreen.showMapButton();
    // Display beavers
    beaverEvents.displayBeavers();
    // beaverEvents.getGeoLocation();
    homeScreenHandlers.setupEvents();
}