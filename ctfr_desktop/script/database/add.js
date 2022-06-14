const addWindow = () => {  
    document.getElementById('add__window').style.display = 'flex'
    document.getElementById('add__window').innerHTML = `
        <div class="add__content">
            <div class="add__title">
                <h1>Add a User</h1>
            </div>
            <form class="add__form" name="add__form" id="add__form" method="POST">
                <div class="add__info__group">
                    <input type="text" required class="add__info__content" value="Auto-generated" disabled/>
                    <label>Account ID</label>
                </div>
                <div class="add__info__group">
                    <input type="text" required class="add__info__content" name="add__username" id="add__username"/>
                    <label>Username</label>
                </div>
                <div class="add__info__group">
                    <input type="text" required class="add__info__content" name="add__email" id="add__email"/>
                    <label>Email</label>
                </div>
                <div class="add__info__group">
                    <input type="text" required class="add__info__content" name="add__password" id="add__password" value="Student12345" disabled/>
                    <label>Password</label>
                </div>
                <div class="add__info__group">
                    <input type="text" required class="add__info__content" name="add__firstname" id="add__firstname"/>
                    <label>First name</label>
                </div>
                <div class="add__info__group">
                    <input type="text" required class="add__info__content" name="add__middleinitial" id="add__middleinitial"/>
                    <label>Middle initial</label>
                </div>
                <div class="add__info__group">
                    <input type="text" required class="add__info__content" name="add__lastname" id="add__lastname"/>
                    <label>Last name</label>
                </div>
                <div class="add__info__group">
                    <input type="text" required class="add__info__content" name="add__contact" id="add__contact" maxlength="12"/>
                    <label>Contact No.</label>
                </div>
                <div class="add__info__group">
                    <input type="date" required class="add__info__content" name="add__birthdate" id="add__birthdate"/>
                    <label>Date of Birth</label>
                </div>
                <div class="add__info__group">
                    <select type="text" required class="add__info__content" name="add__vaxstatus" id="add__vaxstatus">
                        <option value="Not yet Vaccinated">Not yet Vaccinated</option>
                        <option value="Partially Vaccinated">Partially Vaccinated</option>
                        <option value="Fully Vaccinated">Fully Vaccinated</option>
                    </select>
                    <label>Vaccination Status</label>
                </div>
                <div class="add__info__group">
                    <input type="text" required class="add__info__content" name="add__address" id="add__address"/>
                    <label>Address</label>
                </div>
                <div class="add__info__group">
                    <input type="text" required class="add__info__content" name="add__covidstatus" id="add__covidstatus" value="Negative" disabled/>
                    <label>Covid Status</label>
                </div>
            </form>
            <div class="add__buttons">
                <button class="add__confirm" type="submit" onclick="addConfirmWindow()">CONFIRM</button>
                <button class="add__cancel" id="add__cancel" onclick="addCancel(0)">CANCEL</button>
            </div>
        </div>
        <div class="add__confirm__window" id="add__confirm__window">
            <div class="add__confirm__content" id="add__confirm__content">
                <div><p>Do you wish to continue and add a new user?</p></div>
                <div class="add__buttons">
                    <button class="add__confirm__yes" type="submit" onclick="addConfirm()">CONFIRM</button>
                    <button class="add__confirm__no" id="add__cancel" onclick="addCancel(1)">CANCEL</button>
                </div>
            </div>
        </div>
        <div class="add__cancel__window" id="add__cancel__window">
            <div class="add__cancel__content" id="add__cancel__content">
                <div><p>Changes you've made will not be saved. Do you want to cancel and go back?</p></div>
                <div class="add__buttons">
                    <button class="add__cancel__yes" onclick="addCancelConfirm()">CONFIRM</button>
                    <button class="add__cancel__no" onclick="addCancel(2)">CANCEL</button>
                </div>
            </div>
        </div>
    `
}

addUser = () => {
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

var addData = {}

addConfirm = () => {
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
    addData = {}
    switch (data.send) {
        case 'success':
            document.getElementById('add__window').style.display = 'none'
            document.getElementById('add__confirm__window').style.display = 'none'
            addResultModal(data.message, 'Success!')
            break
        case 'incomplete':
            document.getElementById('add__confirm__window').style.display = 'none'
            addResultModal(data.message, 'Warning!')
            break
        case 'fail':
            addResultModal(data.message, 'Failed!')
            break
    }
}

addResultModal = (data, status) => {
    document.getElementById('modal__content').style.display = 'flex'
    document.getElementById('modal__content__info').innerHTML=`
        <h1>${status}</h1>
        <div><p>${data}</p></div>
        <button onclick='closeaddResultModal()'>OKAY</button>
    `
}

closeaddResultModal = () => {
    document.getElementById('modal__content').style.display = 'none'
}