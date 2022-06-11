const covidRow = document.getElementById('covid-notif')
const covidExpandResult = document.getElementById('covid-result')

var resultData = {}
var getDataID = ""
const get_covid = () => {
    fetch('http://localhost:5000/getcovid', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => passDataResult(data))
    .catch(error => console.log(error))
}

const passDataResult = (data) => {
    resultData = data
    renderCovidRow(data)
}

function renderCovidRow (covidResult) {
    covidRow.innerHTML = ''
    covidResult.forEach(data => {
        covidRow.innerHTML += `
            <div class="covid-row" id="covid-row" onclick="requestExpand(this)">
                <div class="covid-row-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="covid-row-context">
                    <div class="covid-row-title">
                        <h2>COVID-19 Request</h2>
                    </div>
                    <div class="covid-row-id">
                        <p>User ID: ${data.userId}</p>
                    </div>
                    <div class="covid-row-name">
                        <p>Name: ${data.info[0].firstname} ${data.info[0].middleinitial}. ${data.info[0].lastname}</p>
                    </div>
                </div>
            </div>
        `
    })
}
 
get_covid()

const requestExpand = (covidRow) => {
    let getIDNode = covidRow.childNodes[3].childNodes[3].innerText
    let getID = getIDNode.split(" ")
    getDataID = getID
    fetch(`http://localhost:5000/getresult/${getID[2]}`)
    .then(res => covidConvert(res))
    .catch(error => console.log(error))
}

const covidConvert = (data) => {
    covidExpandResult.innerHTML = ""
    for (let i = 0; i < resultData.length; i++) {
        if (getDataID[2] == resultData[i].userId) {
            covidExpandResult.innerHTML += `
                <div class="covid-result-title">
                    <h1>COVID-19 TEST RESULT</h1>
                </div>
                <div class="covid-result-image">
                    <img src="${data.url}">
                </div>
                <div class="covid-result-context">
                    <h1>User ID: ${resultData[i].userId}</h1>
                    <p>
                        Name: ${resultData[i].info[0].firstname} ${resultData[i].info[0].middleinitial}. ${resultData[i].info[0].lastname}<br>
                        Email: ${resultData[i].email[0].email} <br>
                        Covid Status: <span class="covid-status">${resultData[i].info[0].covidstatus}<span>
                    </p>
                </div>
                <div class="covid-result-actions">
                    <div class="covid-result-button">
                        <button class="covid-button" onclick="deleteCovid(${i})">Delete</button>
                    </div>
                    <div class="covid-result-button">
                        <button class="covid-button" onclick="approveCovid(${i})">Approve</button>
                    </div>
                </div>
            `
            break
        }
    }
}

const deleteCovid = (fetchedIndex) => {
    console.log(resultData[fetchedIndex].userId)
    document.getElementById('delete__covid__window').style.display = 'flex'
    document.getElementById('delete__covid__window').innerHTML = `
        <div class="delete__covid__content">
            <div class="delete__covid__title"><h1>Delete a request?</h1></div>
            <div><p>Are you sure that you want to permanently delete this request?</p></div>
            <div class="delete__covid__buttons">
                <button class="delete__covid__confirm" onclick="fetchDelete(${fetchedIndex})">CONFIRM</button>
                <button class="delete__covid__cancel" onclick="covidDeleteCloseWindow()">CANCEL</button>
            </div>
        </div>
    `
}

const fetchDelete = (fetchedId) => {
    //let h1 = document.getElementsByClassName('covid-result-context')[0].firstChild.nextSibling.innerText.split(" ")
    //let id = h1[2]

    fetch(`http://localhost:5000/deletecovid/${resultData[fetchedId].userId}`, {
        method: 'DELETE',
        header: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        statusCovidDelete(data)
    })
}

const statusCovidDelete = (data) => {
    switch(data.send) {
        case 'success':
            alert(data.message)
            document.getElementById('delete__covid__window').style.display = 'none'
            get_covid()
            covidExpandResult.innerHTML = ''
            break
        case 'nothing':
            alert(data.message)
            break
        case 'fail':
            alert(data.message)
            break
    }
}

const covidDeleteCloseWindow = () => {
    document.getElementById('delete__covid__window').style.display = 'none'
}

const approveCovid = (fetchedIndex) => {
    document.getElementById('approve__covid__window').style.display = 'flex'
    document.getElementById('approve__covid__window').innerHTML = `
        <div class="approve__covid__content">
            <div class="approve__covid__title"><h1>Change covid status?</h1></div>
            <div><p>Are you sure that you want to change this user's covid-19 status to:</p></div>
            <form class="approve__covid__options" id="approve__covid__options" method="PATCH" action="">
                <select required class="approve__covidstatus" id="approve__covidstatus" name="approve__covidstatus">
                    <option value="Negative">Negative</option>    
                    <option value="Positive">Positive</option>
                </select>
            </form>
            <div class="approve__covid__buttons">
                <button class="approve__covid__confirm" onclick="fetchApprove(${fetchedIndex})">CONFIRM</button>
                <button class="approve__covid__cancel" onclick="covidApproveCloseWindow()">CANCEL</button>
            </div>
        </div>
    `
}

const fetchApprove = (fetchedIndex) => {
    console.log(resultData[fetchedIndex].userId)
    var approveData = {}

    approveData['approveCovidStatus'] = document.forms['approve__covid__options']['approve__covidstatus'].value

    console.log(approveData['approveCovidStatus'])
    fetch(`http://localhost:5000/updatecovid/${resultData[fetchedIndex].userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(approveData)
    })
    .then(res=>res.json())
    .then(data=>{
        statusApprove(data)
    })
}

const statusApprove = (data) => {
    switch(data.send) {
        case 'success':
            alert(data.message)
            document.getElementById('approve__covid__window').style.display = 'none'
            get_covid()
            covidExpandResult.innerHTML = ''
            break
        case 'none':
            alert(data.message)
            break
        case 'fail':
            alert(data.message)
            break
    }
}

const covidApproveCloseWindow = () => {
    document.getElementById('approve__covid__window').style.display = 'none'
}