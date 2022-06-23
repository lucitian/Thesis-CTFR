const roomList = document.getElementById('roomList')

const get_rooms = () => {
    fetch('http://localhost:5000/getrooms', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => renderRooms(data))
    .catch(error => console.log(error))
}

const renderRooms = (rooms) => {
    roomList.innerHTML='' 
    rooms.forEach(data => {
        roomList.innerHTML += `
            <tr id="roomDetailsList" class="room_row">
                <td class="room__data__cell__actions">
                    <button id="button__actions" onclick="deleteRoom(this)">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </td>
                <td id="room__data__cell" class="room__data__roomNo">${data.roomNo}</td>
                <td id="room__data__cell" class="room__data__id">${data.userId}</td>
                <td id="room__data__cell" class="room__data__name">${data.name}</td>
                <td id="room__data__cell" class="room__data__date">${convertDate(data.date)}</td>
                <td id="room__data__cell" class="room__data__time">${data.time}</td>
            </tr>
        `
    })
}

const convertDate = (date) => {
    const newDate = new Date(date)

    return newDate.getFullYear() + '-' + (newDate.getMonth()+1) + '-' + newDate.getDate()
}

get_rooms()


function dateFilter(){
    const tempFrom = document.getElementById('dateFrom').value
    const tempTo = document.getElementById('dateTo').value
    var dateArr = {
        tempFrom, tempTo
    }

    console.log(dateArr)
    fetch(`http://localhost:5000/fetchdates/${JSON.stringify(dateArr)}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => renderRooms(data))
    .catch(error => console.log(error))
}

var globalRoom

function deleteRoom(tableRow) {
    document.getElementById('room__delete__window').style.display = 'flex'

    globalRoom = tableRow
}

confirmRoomDelete = () => {
    let column = globalRoom.parentElement.parentElement
    var formData
    formData = column.getElementsByClassName('room__data__id')[0].innerHTML
    console.log(formData)
    fetch(`http://localhost:5000/deleteroom/${formData}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        statusRoomDelete(data)
    })
}

function deleteRoomCancel() {
    document.getElementById('room__delete__window').style.display = 'none'
}


statusRoomDelete = (data) => {
    switch(data.send) {
        case 'success':
            document.getElementById('room__delete__window').style.display = 'none'
            deleteRoomResultModal(data.message, 'Success!')
            get_rooms()
            break
        case 'nothing':
            deleteRoomResultModal(data.message, 'Warning!')
            break
        case 'fail':
            deleteRoomResultModal(data.message, 'Failed!')
            break
    }
}

deleteRoomResultModal = (data, status) => {
    document.getElementById('modal__content').style.display = 'flex'
    document.getElementById('modal__content__info').innerHTML = `
        <h1>${status}</h1>
        <div><p>${data}</p></div>
        <button onclick='closeDeleteResultModal()'>OKAY</button>
    `
}

closeDeleteResultModal = () => {
    document.getElementById('modal__content').style.display = 'none'
}

function print_rooms(data) {
    var rowLength = roomList.rows.length
    var count = 0
    var tempRooms = []
    var listRooms = []
    // console.log(rowLength)

    for (i = 0; i < rowLength; i++){
        if (roomList.rows.item(i).style.display == 'none') {
            continue
        } else {
            var cells = roomList.rows.item(i).cells
            var cellLength = roomList.rows.item(i).cells.length
            for (j = 1; j < cellLength; j++){
                tempRooms.push(cells.item(j).innerText)
            }
            listRooms.push(tempRooms)
            tempRooms = []
        }
    }
    console.log(listRooms)

    var csv = "Room No.,User ID,Student Name,Date,Time\n"

    listRooms.forEach(function(row){
        csv += row.join(",")
        csv += "\n"
    })

    var hiddenElement = document.createElement('a')
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv)
    hiddenElement.target = "_blank";

    hiddenElement.download = "Print Report.csv"
    hiddenElement.click()
}