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
            alert('Deleted successfully!')
            break
        case 'nothing':
            alert('User not found!')
            break
        case 'fail':
            alert('Failed to delete user!')
            break
    }
}

function deleteCancel() {
    document.getElementById('delete__window').style.display = 'none'
}