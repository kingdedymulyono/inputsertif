window.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll(".skeleton").forEach((el)=>{
        el.classList.remove("skeleton")
    })
})


const test = document.getElementById('test')
const formName = document.getElementById("formName")

if (localStorage.getItem("murid")) {
    fetch("https://kingdedymulyono.github.io/datamurid/murid.json")
        .then(response => response.json())
        .then(data => {
            console.table(data)
            data.forEach((murid) => {
                if (murid.nisn == localStorage.getItem("murid")) {
                    formName.innerHTML=`Hello ${murid.nama}`
                }
            })
        })
    } else {
        fetch("https://kingdedymulyono.github.io/datamurid/murid.json")
        .then(response => response.json())
        .then(data => {
            data.forEach((murid) => {
                if (murid.nisn == 202523192) {
                    formName.innerHTML=`Hello , ${murid.nama}`
                }
            })
        })
}