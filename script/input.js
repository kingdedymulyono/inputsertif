window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".skeleton").forEach((el) => {
        el.classList.remove("skeleton")
    })
})

const no = document.getElementById("no")
const nama = document.getElementById("nama")
const nis = document.getElementById("nis")
const serti = document.getElementById("serti")
const jenis = document.getElementById("jenis")
const tingkat = document.getElementById("tingkat")
const submit = document.getElementById("submit")
const test = document.getElementById('test')
const formName = document.getElementById("formName")

let namaMurid = ''
let absenMurid = ''
let nisMurid = ''


const success = (name) => {
    swal.fire({
        icon: 'success',
        title: `Selamat ${name}`,
        text: 'Sertifikatmu telah kami input,Input sertifikat lagi?',
        confirmButtonColor: '#A5DC86',
        confirmButtonText: 'Lanjutkan',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        cancelButtonColor: '#F27474'
    }).then((result) => {
        // if(result.isConfirmed){
        //     location.href="./index.html"
        // }
    })
}

const error = () => {
    swal.fire({
        icon: 'error',
        title: `Maaf`,
        text: 'Kamu belum mengirimkan informasi yang cukup,silahkan lengkapi form',
        confirmButtonColor: '#F27474',
        confirmButtonText: 'Try Again'
    })
}

if (localStorage.getItem("murid")) {
    fetch("https://kingdedymulyono.github.io/datamurid/murid.json")
        .then(response => response.json())
        .then(data => {
            console.table(data)
            data.forEach((murid) => {
                if (murid.nisn == localStorage.getItem("murid")) {
                    formName.innerHTML = `Hello ${murid.nama}`
                    namaMurid = murid.nama
                    absenMurid = murid.id
                    nisMurid = murid.nisn
                }
            })
        })
} else {
    fetch("https://kingdedymulyono.github.io/datamurid/murid.json")
        .then(response => response.json())
        .then(data => {
            data.forEach((murid) => {
                if (murid.nisn == 202523192) {
                    formName.innerHTML = `Hello , ${murid.nama}`
                    namaMurid = murid.nama
                }
            })
        })
}
serti.addEventListener("change", (e) => {
    console.log(e.target)
})
// submit.addEventListener("click", () => {
//     // e.preventDefault()
//     if (
//         serti.value &&
//         jenis.value !== 'false' &&
//         tingkat.value !== 'false'
//     ) {
//         console.log("bisa wok")
//     } else {
//         console.log('error')
//         error()
//     }
// })
const scriptURL = 'https://script.google.com/macros/s/AKfycbw0z2rsWaQyMWv65j28sREyswLNFUd6wwtEPB4riIAEnCcp6t4r37KPxSdrti6x-2obwA/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    let arrhidden=[]

    no.value = absenMurid
    nama.value = namaMurid
    nis.value = nisMurid
    arrhidden.push(no.value)
    arrhidden.push(nama.value)
    arrhidden.push(nis.value)
    console.table(arrhidden)
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
})