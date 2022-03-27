function addUsers () {

}

readData = (row) => {
    let column = row.parentElement.parentElement
    var formData = {}
    formData['_id'] = column.getElementsByClassName('data__id')[0].innerHTML
    formData['username'] = column.getElementsByClassName('data__username')[0].innerHTML
    formData['email'] = column.getElementsByClassName('data__email')[0].innerHTML
    formData['firstName'] = column.getElementsByClassName('data__firstname')[0].innerHTML
    formData['middleInitial'] = column.getElementsByClassName('data__middleinitial')[0].innerHTML
    formData['lastName'] = column.getElementsByClassName('data__lastname')[0].innerHTML
    formData['contact'] = column.getElementsByClassName('data__contact')[0].innerHTML
    formData['birthdate'] = column.getElementsByClassName('data__birthdate')[0].innerHTML
    formData['vaxStatus'] = column.getElementsByClassName('data__vaxstatus')[0].innerHTML
    formData['address'] = column.getElementsByClassName('data__address')[0].innerHTML

    return formData
}

editUsers = (tableRow) => {
    document.getElementById('edit__window').style.display = 'flex'
    document.getElementById('edit__form').innerHTML = `
        <div class="edit__info__group">
            <input type="text" required class="edit__info__content" name="edit__id" id="edit___id" value="${readData(tableRow)._id}" disabled>
            <label>Account ID</label>
        </div>
        <div class="edit__info__group">
            <input type="text" required class="edit__info__content" name="edit__username" id="edit__username" value="${readData(tableRow).username}">
            <label>Username</label>
        </div>
        <div class="edit__info__group">
            <input type="text" required class="edit__info__content" name="edit__email" id="edit__email" value="${readData(tableRow).email}">
            <label>Email</label>
        </div>
        <div class="edit__info__group">
            <input type="text" required class="edit__info__content" name="edit__firstname" id="edit__firstname" value="${readData(tableRow).firstName}">
            <label>First name</label>
        </div>
        <div class="edit__info__group">
            <input type="text" required class="edit__info__content" name="edit__middleinitial" id="edit__middleinitial" value="${readData(tableRow).middleInitial}">
            <label>Middle Initial</label>
        </div>
        <div class="edit__info__group">
            <input type="text" required class="edit__info__content" name="edit__lastname" id="edit__lastname" value="${readData(tableRow).lastName}">
            <label>Last name</label>
        </div>
        <div class="edit__info__group">
            <input type="text" required class="edit__info__content" name="edit__contact" id="edit__contact" value="${readData(tableRow).contact}">
            <label>Contact No.</label>
        </div>
        <div class="edit__info__group">
            <input type="date" required class="edit__info__content" name="edit__birthdate" id="edit__birthdate" value="${formatDate(readData(tableRow).birthdate)}">
            <label>Date of Birth</label>
        </div>
        <div class="edit__info__group">
            <select required class="edit__info__content" name="edit__vaxstatus" id="edit__vaxstatus" selected="${readData(tableRow).vaxStatus}">
                <option value="Not yet Vaccinated">Not yet Vaccinated</option>
                <option value="Partially Vaccinated">Partially Vaccinated</option>
                <option value="Fully Vaccinated">Fully Vaccinated</option>
            </select>
            <label>Vaccination Status</label>
        </div>
        <div class="edit__info__group">
            <input type="text" required class="edit__info__content" id="edit__address" value="${readData(tableRow).address}">
            <label>Address</label>
        </div> 
    `
}

formatDate = (date) => {
    var d = new Date(date)
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = '' + d.getFullYear()
    
    if (month.length < 2)
        month = '0' + month
    if (day.length < 2)
        day = '0' + day

    return [year, month, day].join('-')
}

confirmButton = () => {
    document.getElementById('edit__confirm__window').style.display = 'flex'
}

confirmUpdate = () => {
    var postData = {}

    postData['editID'] = document.forms['edit__form']['edit__id'].value
    postData['editUsername'] = document.forms['edit__form']['edit__username'].value
    postData['editEmail'] = document.forms['edit__form']['edit__email'].value
    postData['editFirstName'] = document.forms['edit__form']['edit__firstname'].value
    postData['editMiddleInitial'] = document.forms['edit__form']['edit__middleinitial'].value
    postData['editLastName'] = document.forms['edit__form']['edit__lastname'].value
    postData['editContact'] = document.forms['edit__form']['edit__contact'].value
    postData['editBirthdate'] = document.forms['edit__form']['edit__birthdate'].value
    postData['editVaxStatus'] = document.forms['edit__form']['edit__vaxstatus'].value
    postData['editAddress'] = document.forms['edit__form']['edit__address'].value

    fetch(`http://localhost:5000/edituser/${postData['editID']}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        statusUpdate(data)
    })
}

statusUpdate = (data) => {
    switch (data.send) {
        case 'success':
            document.getElementById('edit__window').style.display = 'none'
            document.getElementById('edit__confirm__window').style.display = 'none'
            alert('Updated successfully!')
            break
        case 'none':
            document.getElementById('edit__window').style.display = 'none'
            document.getElementById('edit__confirm__window').style.display = 'none'
            alert('Nothing to update!')
            break
        case 'fail':
            break
    }
}

cancelButton = (x) => {
    if (x == 0) {
        document.getElementById('edit__cancel__window').style.display = 'flex'
    } 
    else if (x == 1) {
        document.getElementById('edit__confirm__window').style.display = 'none'
    }
    else {
        document.getElementById('edit__cancel__window').style.display = 'none'
    }
}

confirmCancel = () => {
    document.getElementById('edit__cancel__window').style.display = 'none'
    document.getElementById('edit__window').style.display = 'none'
}