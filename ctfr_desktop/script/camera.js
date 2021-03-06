const openCamera = document.getElementById('camera__screen')
const generateID = document.getElementById('student__info__context')
document.getElementById('camera__generate__button').disabled = true
const tempList = document.getElementById('tempList')

let array_append = []
let temp_room = ""

function open__camera() {
    fetch(`http://localhost:5000/open_cam`)
    openCamera.innerHTML = `<img src="http://localhost:5000/open_cam" height="100%" width="100%">`
    generateID.innerHTML = ''
    document.getElementById('open__camera').disabled = true
    document.getElementById('open__camera').classList.add('disable')
}

function close__camera() {
    open_cam = fetch('http://localhost:5000/close_cam')
    openCamera.innerHTML = ''

    document.getElementById('open__camera').disabled = false
    document.getElementById('open__camera').classList.remove('disable')
}

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

const roomTarget = document.querySelectorAll('[room-target]')

roomTarget.forEach(room => {
    room.addEventListener('click', () => {
        room.classList.toggle('selected')
        if (room.classList[1]) {
            document.getElementById('camera__generate__button').disabled = false
            document.getElementById('camera__generate__button').classList.remove('disable')
            temp_room = room.innerText
        } else {
            generateID.innerHTML=""
            temp_room = ""
        }
    })
})

const layoutID = (data) => {
    generateID.innerHTML = `
        <p class = "stud_info">Name: ${data.info[0].firstname} ${data.info[0].middleinitial} ${data.info[0].lastname}</p>
        <p class = "stud_info">Email: ${data.email}</p>
        <p class = "stud_info">Vaccination Status: ${data.info[0].vaxstatus}</p>
        <p class = "stud_info">Covid-19 Status: ${data.info[0].covidstatus}</p>
        <p class = "stud_info">Date: ${newDate()}</p>
        <p class = "stud_info">Time: ${newTime()}</p>
    `

    let temp_array_append = []
    temp_name = data.info[0].firstname + " " + data.info[0].middleinitial + " " + data.info[0].lastname
    temp_array_append.push({
        'roomNo': temp_room,
        'userId': data._id,
        'name': temp_name,
        'date': newDate(),
        'time': newTime()
    })
    array_append.push(temp_array_append)

    tempList.innerHTML += `
        <tr>
            <td class="temp__data__cell__actions">
                <button id="button__actions" onclick="deleteUserAppend(this)">
                    <i class="fa fa-trash-o"></i>
                </button>
            </td>
            <td id="temp__data__cell">${temp_room}</td>
            <td id="temp__data__cell">
                <span>${data.info[0].firstname}</span>
                <span>${data.info[0].middleinitial}</span>.
                <span>${data.info[0].lastname}</span>
            </td>
            <td id="temp__data__cell">${newDate()}</td>
            <td id="temp__data__cell">${newTime()}</td>
        </tr>
    `
}

const newDate = () => {
    const today = new Date();
    
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());

    return date
}

const newTime = () => {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();

    return time
}

const appendRoom = () => {
    fetch('http://localhost:5000/appendroom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(array_append)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    array_append = []
    generateID.innerHTML = ''
    tempList.innerHTML = ''
}

function deleteUserAppend(datas) {
    index_row = 0
    deleted = false
    parent = datas.parentElement.parentElement
    child = parent.childNodes

    roomNo = child[3].innerText
    name_ = child[5].innerText.replace(".","")
    date = child[7].innerText
    time = child[9].innerText

    for (i = 0; i<array_append.length; i++){
        if (array_append[i][0]["roomNo"] == roomNo){
            if (array_append[i][0]["time"] == time){
                if (array_append[i][0]["date"] == date){
                    if (array_append[i][0]["name"] == name_){
                        index_row = i                    
                        deleted = true
                        break
                    }                    
                }
            }
        }
    }

    if (deleted == true){
        array_append.splice(index_row, 1)
        parent.remove()        
    }
}

