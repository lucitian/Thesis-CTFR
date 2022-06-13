const roomList = document.getElementById('roomList')

const get_rooms = () => {
    console.log('hotdog')
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
                    <button id="button__actions" onclick="deleteUser(this)">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </td>
                <td id="room__data__cell">${data.roomNo}</td>
                <td id="room__data__cell">${data.userId}</td>
                <td id="room__data__cell">${data.name}</td>
                <td id="room__data__cell">${data.date}</td>
                <td id="room__data__cell">${data.time}</td>
            </tr>
        `
    })
}

get_rooms()