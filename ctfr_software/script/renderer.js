const { ipcRenderer } = require('electron')

const userList = document.querySelector('#userList')

function renderUsers(users) {
    userList.innerHTML += `
        <tr id="userInfoList">
            <td class="db__data__cell__actions">
                <button class="button__actions"><i class="far fa-edit"></i></button><button class="button__actions"><i class="fa fa-trash-o"></i></button>
            </td>
            <td class="db__data__cell">${users._id}</td>
            <td class="db__data__cell">${users.email}</td>
            <td class="db__data__cell">${users.info[0].firstname} ${users.info[0].middleinitial} ${users.info[0].lastname}</td>
            <td class="db__data__cell">+${users.info[0].contact}</td>
            <td class="db__data__cell">${users.info[0].birthdate}</td>
            <td class="db__data__cell">${users.info[0].vaxstatus}</td>
            <td class="db__data__cell">${users.info[0].address}</td>
        </tr>
    `
}

let users = []

ipcRenderer.send("get-users")

ipcRenderer.on("get-users", (e, args) => {
    const receivedUsers = JSON.parse(args)
    users = receivedUsers
    renderUsers(users)
});
