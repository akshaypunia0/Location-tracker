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

const map = L.map('map').setView([0,0], 10)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "OpenstreetAkshay"
}).addTo(map);

const marker = {}

socket.on('received-location', (data) => {
    const { id , latitude, longitude} = data
    map.setView([latitude, longitude], 16)
})