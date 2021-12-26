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

function renderUsers (users) {
    userList.innerHTML = ''
    users.forEach(data => {
        userList.innerHTML += `
            <tr id="userInfoList">
                <td class="db__data__cell__actions">
                    <button class="button__actions"><i class="far fa-edit"></i></button><button class="button__actions"><i class="fa fa-trash-o"></i></button>
                </td>
                <td class="db__data__cell">${data._id}</td>
                <td class="db__data__cell">${data.email}</td>
                <td class="db__data__cell">${data.info[0].firstname} ${data.info[0].middleinitial} ${data.info[0].lastname}</td>
                <td class="db__data__cell">+${data.info[0].contact}</td>
                <td class="db__data__cell">${data.info[0].birthdate}</td>
                <td class="db__data__cell">${data.info[0].vaxstatus}</td>
                <td class="db__data__cell">${data.info[0].address}</td>
            </tr>
        `
    })
}

get_users()