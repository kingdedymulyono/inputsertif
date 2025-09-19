
const test = document.getElementById('test')
const formName = document.getElementById("formName")

if (localStorage.getItem("murid")) {
    fetch("./data/murid.json")
        .then(response => response.json())
        .then(data => {
            data.forEach((murid) => {
                if (murid.nisn == localStorage.getItem("murid")) {
                    formName.innerHTML=`Hello ${murid.nama}`
                }
            })
        })
    } else {
        fetch("./data/murid.json")
        .then(response => response.json())
        .then(data => {
            data.forEach((murid) => {
                if (murid.nisn == 202523192) {
                    formName.innerHTML=`Hello , ${murid.nama}`
                }
            })
        })
}