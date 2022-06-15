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
            <tr id="roomDetailsList">
                <td class="room__data__cell__actions">
                    <button id="button__actions" onclick="deleteRoom(this)">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </td>
                <td id="room__data__cell">${data.roomNo}</td>
                <td id="room__data__cell" class="data__id">${data.userId}</td>
                <td id="room__data__cell">${data.name}</td>
                <td id="room__data__cell">${data.date}</td>
                <td id="room__data__cell">${data.time}</td>
            </tr>
        `
    })
}

get_rooms()

var globalRoom

function deleteRoom(tableRow) {
    document.getElementById('room__delete__window').style.display = 'flex'

    globalRoom = tableRow
}

confirmRoomDelete = () => {
    let column = globalRoom.parentElement.parentElement
    var formData
    formData = column.getElementsByClassName('data__id')[0].innerHTML

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

statusRoomDelete = (data) => {
    switch(data.send) {
        case 'success':
            document.getElementById('delete__window').style.display = 'none'
            deleteRoomResultModal(data.message, 'Success!')
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