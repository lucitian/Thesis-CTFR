const covidRow = document.getElementById('covid-row')
const covidExpandResult = document.getElementById('covid-result')

var resultData = {}

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

    covidExpandResult.innerHTML = ""
    for (let i = 0; i < resultData.length; i++) {
        if (getID[2] == resultData[i].userId) {
            covidExpandResult.innerHTML += `
                <div>
                    <h1>${resultData[i].userId}</h1>
                </div>
                <div>
                    <img src="${resultData[i].image}"></img>
                </div>
            `
            break
        }
    }
}