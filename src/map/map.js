export function createMap() {
    // Leaflet initialization
    
    return L.map('map', {
        zoomSnap: 1
    }).setView([4.2, 151.7], 6);
}