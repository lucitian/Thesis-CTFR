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
                        <button class="covid-button" onclick="delete_covid()">Delete</button>
                    </div>
                    <div class="covid-result-button">
                        <button class="covid-button">Approve</button>
                    </div>
                </div>
            `
            break
        }
    }
}

const delete_covid = () => {
    document.getElementById('delete__covid__window').style.display = 'flex'
    document.getElementById('delete__covid__window').innerHTML = `
        <div class="delete__covid__content">
            <div class="delete__covid__title"><h1>Delete a request?</h1></div>
            <div><p>Are you sure that you want to permanently delete this request?</p></div>
            <div class="delete__covid__buttons">
                <button class="delete__covid__confirm" onclick="fetch_delete()">CONFIRM</button>
                <button class="delete__covid__cancel" onclick="">CANCEL</button>
            </div>
        </div>
    `
}

const fetch_delete = () => {
    let h1 = document.getElementsByClassName('covid-result-context')[0].firstChild.nextSibling.innerText.split(" ")
    let id = h1[2]
    //console.log(id)

    fetch(`http://localhost:5000/deletecovid/${id}`, {
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
            alert('Deleted successfully!')
            document.getElementById('delete__covid__window').style.display = 'none'
            get_covid()
            break
        case 'nothing':
            alert('Request not found!')
            break
        case 'fail':
            alert('Failed to delete request!')
            break
    }
}

const covidCloseWindow = () => {
    document.getElementById('delete__covid__window').style.display = 'none'
}