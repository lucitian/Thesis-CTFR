const openCamera = document.getElementById('camera__screen')

function open__camera() {
    open_cam = fetch('http://localhost:5000/open_cam')
    openCamera.innerHTML += `<img src="http://localhost:5000/open_cam" height="100%" width="100%">`
}

function close__camera() {
    open_cam = fetch('http://localhost:5000/close_cam')
    openCamera.innerHTML = ''
}