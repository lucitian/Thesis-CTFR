const openCamera = document.getElementById('camera__screen')
const generateID = document.getElementById('student__info__context')
// document.getElementById('camera__generate__button').disabled = true
const tempList = document.getElementById('tempList')

let array_append = []

function open__camera() {
    openCamera.innerHTML = `<img src="http://localhost:5000/open_cam" height="100%" width="100%">`
    generateID.innerHTML = ''
    document.getElementById('open__camera').disabled = true
    document.getElementById('open__camera').classList.add('disable')
    document.getElementById('camera__generate__button').disabled = false
    document.getElementById('camera__generate__button').classList.remove('disable')
}

function close__camera() {
    open_cam = fetch('http://localhost:5000/close_cam')
    openCamera.innerHTML = ''

    document.getElementById('open__camera').disabled = false
    document.getElementById('open__camera').classList.remove('disable')
}

tempData = []

const fetch_name = () => {
    fetch('http://localhost:5000/fetchnames', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => layoutID(data))
    .catch(error => console.log(error))
}

const layoutID = (data) => {
    tempData = data
    generateID.innerHTML = `
        <p class = "stud_info">Name: ${data.info[0].firstname} ${data.info[0].middleinitial} ${data.info[0].lastname}</p>
        <p class = "stud_info">Email: ${data.email}</p>
        <p class = "stud_info">Vaccination Status: ${data.info[0].vaxstatus}</p>
        <p class = "stud_info">Covid-19 Status: ${data.info[0].covidstatus}</p>
    `
}

const newDate = () => {
    const today = new Date();
    
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return date
}

const newTime = () => {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();

    return time
}

const roomNumber = (clickRow) => {
    let roomNo = clickRow.innerText
    let temp_array_append = []
    temp_name = tempData.info[0].firstname + " " + tempData.info[0].middleinitial + " " + tempData.info[0].lastname
    temp_array_append.push({
        roomNo: roomNo,
        name: temp_name,
        date: newDate(),
        time: newTime()
    })
    array_append.push(temp_array_append)
    console.log(temp_array_append)
    console.log(array_append)

    tempList.innerHTML += `
        <td class="temp__data__cell__actions">
            <button id="button__actions" onclick="">
                <i class="fa fa-trash-o"></i>
            </button>
        </td>
        <td id="temp__data__cell" class="data__id">${roomNo}</td>
        <td id="temp__data__cell" class="data__id">
            <span class="data__firstname">${tempData.info[0].firstname}</span>
            <span class="data__middleinitial">${tempData.info[0].middleinitial}</span>.
            <span class="data__lastname">${tempData.info[0].lastname}</span>
        </td>
        <td id="temp__data__cell" class="data__id">${newDate()}</td>
        <td id="temp__data__cell" class="data__id">${newTime()}</td>
    `
}

const appendRoom = () => {
    
    array_append = []
    tempList.innerHTML = ''
}
// const openCamera = document.getElementById('camera__screen')

// function open__camera() {
//     open_cam = fetch('http://localhost:5000/open_cam')
//     openCamera.innerHTML += `<img src="http://localhost:5000/open_cam" height="100%" width="100%">`

//     document.getElementById('open__camera').disabled = true
//     document.getElementById('open__camera').classList.add('disable')
// }

// function close__camera() {
//     open_cam = fetch('http://localhost:5000/close_cam')
//     openCamera.innerHTML = ''

//     document.getElementById('open__camera').disabled = false
//     document.getElementById('open__camera').classList.remove('disable')
// }