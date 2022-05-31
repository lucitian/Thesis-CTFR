const covidRow = document.getElementById('covid-row')
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
    console.log(resultData)
    covidExpandResult.innerHTML = ""
    for (let i = 0; i < resultData.length; i++) {
        if (getDataID[2] == resultData[i].userId) {
            covidExpandResult.innerHTML += `
                <div class="covid-result-image">
                    <img src="${data.url}">
                </div>
                <div class="covid-result-context">
                    <h1>${resultData[i].userId}</h1>
                    <p>
                        ${resultData[i].info[i].firstname}
                    </p>
                </div>
            `
            break
        }
    }
}