const { ipcRenderer } = require('electron')

const userList = document.querySelector('#userList')

function renderUsers(users) {
    userList.innerHTML = ""
    users.map(user => {
        userList.innerHTML += `
            <tr>
                <td class="db__data__cell">${user.email}</td>
            </tr>
        `
    })
}

let users = []

ipcRenderer.send("get-users")

ipcRenderer.on("get-users", (e, args) => {
    const receivedUsers = JSON.parse(args)
    users = receivedUsers
    renderUsers(users)
});
