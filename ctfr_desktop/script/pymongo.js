const userList = document.getElementById('userList')

const get_users = () => {
    fetch('http://localhost:5000/users', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => renderUsers(data))
    .catch(error => console.log(error))
}

const renderUsers = (users) => {
    userList.innerHTML = ''
    users.forEach(data => {
        userList.innerHTML += `
            <tr id="userInfoList">
                <td class="db__data__cell__actions">
                    <button id="button__actions" onclick="editUsers(this)">
                        <i class="far fa-edit"></i>
                    </button>
                    <button id="button__actions" onclick="deleteUser(this)">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </td>
                <td id="db__data__cell" class="data__id">${data._id}</td>
                <td id="db__data__cell" class="data__username">${data.username}</td>
                <td id="db__data__cell" class="data__email">${data.email}</td>
                <td id="db__data__cell">
                    <span class="data__firstname">${data.info[0].firstname}</span>
                    <span class="data__middleinitial">${data.info[0].middleinitial}</span>.
                    <span class="data__lastname">${data.info[0].lastname}</span>
                </td>
                <td id="db__data__cell" class="data__contact">+${data.info[0].contact}</td>
                <td id="db__data__cell" class="data__birthdate">${data.info[0].birthdate}</td>
                <td id="db__data__cell" class="data__vaxstatus">${data.info[0].vaxstatus}</td>
                <td id="db__data__cell" class="data__address">${data.info[0].address}</td>
                <td id="db__data__cell" class="data__covidstatus">${data.info[0].covidstatus}</td>
            </tr>
        `
    })
}

get_users()