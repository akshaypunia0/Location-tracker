const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords
        socket.emit("send-location", { latitude, longitude })
    }, (error) => {
        console.error(error);

    },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    )
}

const map = L.map('map').setView([0,0], 16)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "OpenstreetAkshay"
}).addTo(map);


const markers = {}

socket.on('received-location', (data) => {
    const { id , latitude, longitude} = data

    map.setView([latitude, longitude])

    L.marker([latitude, longitude]).addTo(map)
    .bindPopup('You are here')
    .openPopup();
    
    if(markers[id]){
        markers[id].setLatLng([latitude, longitude])
    }
    else{
        markers[id] = L.marker([latitude, longitude]).addTo(map)
    }
})

socket.emit('user-disconnected', () => {
    if(markers[id]) {
        map.removeLayer([markers[id]])
        delete markers[id]
    }
})