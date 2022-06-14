var globalRow

function deleteUser(tableRow) {
    document.getElementById('delete__window').style.display = 'flex'

    globalRow = tableRow
}

confirmDelete = () => {
    let column = globalRow.parentElement.parentElement
    var formData
    formData = column.getElementsByClassName('data__id')[0].innerHTML

    fetch(`http://localhost:5000/deleteuser/${formData}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        statusDelete(data)
    })
}

statusDelete = (data) => {
    switch(data.send) {
        case 'success':
            document.getElementById('delete__window').style.display = 'none'
            deleteResultModal(data.message, 'Success!')
            break
        case 'nothing':
            deleteResultModal(data.message, 'Warning!')
            break
        case 'fail':
            deleteResultModal(data.message, 'Failed!')
            break
    }
}

function deleteCancel() {
    document.getElementById('delete__window').style.display = 'none'
}

deleteResultModal = (data, status) => {
    document.getElementById('modal__content').style.display = 'flex'
    document.getElementById('modal__content__info').innerHTML=`
        <h1>${status}</h1>
        <div><p>${data}</p></div>
        <button onclick='closeDeleteResultModal()'>OKAY</button>
    `
}

closeDeleteResultModal = () => {
    document.getElementById('modal__content').style.display = 'none'
}