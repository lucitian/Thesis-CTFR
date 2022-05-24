function emailFilter() {
    var input, filter, table, tr, td, i, txtValue

    input = document.getElementById("filter__email")
    filter = input.value.toUpperCase()
    table = document.getElementById("db__table")
    tr = table.getElementsByTagName("tr")

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3]
        
        if (td) {
            txtValue = td.textContent || td.innerText
            if (txtValue.toUpperCase().indexOf(filter) >- 1) {
                tr[i].style.display = ""
            } else {
                tr[i].style.display = "none"
            }
        }
    }
}

function nameFilter() {
    var input, filter, table, tr, td, i, txtValue

    input = document.getElementById("filter__name")
    filter = input.value.toUpperCase()
    table = document.getElementById("db__table")
    tr = table.getElementsByTagName("tr")

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4]
        
        if (td) {
            txtValue = td.textContent || td.innerText
            if (txtValue.toUpperCase().indexOf(filter) >- 1) {
                tr[i].style.display = ""
            } else {
                tr[i].style.display = "none"
            }
        }
    }
}

function covidFilter() {
    var input, filter, table, tr, td, i, txtValue

    input = document.getElementById("filter__covid")
    filter = input.value.toUpperCase()
    table = document.getElementById("db__table")
    tr = table.getElementsByTagName("tr")

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[9]
        
        if (td) {
            txtValue = td.textContent || td.innerText
            if (txtValue.toUpperCase().indexOf(filter) >- 1) {
                tr[i].style.display = ""
            } else {
                tr[i].style.display = "none"
            }
        }
    }
}