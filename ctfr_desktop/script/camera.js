const openCamera = document.getElementById('camera__screen')

function open__camera() {
    open_cam = fetch('http://localhost:5000/open_cam')
    openCamera.innerHTML += `<img src="http://localhost:5000/open_cam" height="100%" width="100%">`

    document.getElementById('open__camera').disabled = true
    document.getElementById('open__camera').classList.add('disable')
}

function close__camera() {
    open_cam = fetch('http://localhost:5000/close_cam')
    openCamera.innerHTML = ''

    document.getElementById('open__camera').disabled = false
    document.getElementById('open__camera').classList.remove('disable')
}