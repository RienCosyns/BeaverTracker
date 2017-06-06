function init(){
    beaverEvents.addModel(beaverApp);
    beaverEvents.getViewState(beaverBrowserViewer);
    beaverEvents.viewState.beaverBrowserViewer.showMapButton();
    // Display beavers
    beaverEvents.displayBeavers();
    // beaverEvents.getGeoLocation();
    handlers.setupEvents();
}