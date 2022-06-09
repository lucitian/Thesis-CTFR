addUser = () => {
    document.getElementById('add__window').style.display = 'flex'
}

addConfirmWindow = () => {
    document.getElementById('add__confirm__window').style.display = 'flex'
}

addCancel = (x) => {
    if (x == 0) {
        document.getElementById('add__cancel__window').style.display = 'flex'
    }
    else if (x == 1) {
        document.getElementById('add__confirm__window').style.display = 'none'
    }
    else {
        document.getElementById('add__cancel__window').style.display = 'none'
    }
}

addCancelConfirm = () => {
    document.getElementById('add__cancel__window').style.display = 'none'
    document.getElementById('add__window').style.display = 'none'
}

addConfirm = () => {
    var addData = {}

    addData['addUsername'] = document.forms['add__form']['add__username'].value
    addData['addEmail'] = document.forms['add__form']['add__email'].value
    addData['addPassword'] = document.forms['add__form']['add__password'].value
    addData['addFirstName'] = document.forms['add__form']['add__firstname'].value
    addData['addMiddleInitial'] = document.forms['add__form']['add__middleinitial'].value
    addData['addLastName'] = document.forms['add__form']['add__lastname'].value
    addData['addContact'] = document.forms['add__form']['add__contact'].value
    addData['addBirthdate'] = document.forms['add__form']['add__birthdate'].value
    addData['addVaxStatus'] = document.forms['add__form']['add__vaxstatus'].value
    addData['addAddress'] = document.forms['add__form']['add__address'].value
    addData['addCovidStatus'] = document.forms['add__form']['add__covidstatus'].value

    console.log(addData)
    fetch('http://localhost:5000/adduser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addData)
    })
    .then(response => response.json())
    .then(data => {
        statusAdd(data)
    }) 
}

statusAdd = (data) => {
    switch (data.send) {
        case 'success':
            document.getElementById('add__window').style.display = 'none'
            document.getElementById('add__confirm__window').style.display = 'none'
            alert('Added successfully!')
            break
        case 'incomplete':
            document.getElementById('add__confirm__window').style.display = 'none'
            alert('Incomplete information!')
            break
        case 'fail':
            alert('Insert failed!')
            break
    }
}