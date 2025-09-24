window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".skeleton").forEach((el) => {
        el.classList.remove("skeleton")
    })
})

const no = document.getElementById("no")
const nama = document.getElementById("nama")
const nis = document.getElementById("nis")
const serti = document.getElementById("serti")
const img = document.getElementById("thumbnail")
const jenis = document.getElementById("jenis")
const tingkat = document.getElementById("tingkat")
const catatan = document.getElementById("catatan")
const submit = document.getElementById("submit")
const test = document.getElementById('test')
const formName = document.getElementById("formName")
const loading = document.getElementById("loading")
const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const btn3 = document.getElementById("btn3")
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
    let url = 'https://script.google.com/macros/s/AKfycbwsyqXshFQiB_K2g5CA3B8rtGKMEm6qLKJ_Eo7LyK19oC1cTqvwHmEe24xRhZeaoyC19w/exec'
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzdkXDizGiX8uAgHTW04U5N6RX7LsK6k61yVfeBeFuMLsLMPahch9LzyZtNax0ivHADKw/exec'
    serti.addEventListener("change", () => {
        document.querySelector("#thumbnailText").style.display = 'none'
        let fr = new FileReader();
        fr.addEventListener('loadend', () => {
            let res = fr.result
            img.src = res
        let spt = res.split("base64,")[1];
        console.log(spt)
        let obj = {
            base64: spt,
            type: serti.files[0].type,
            name: serti.files[0].name
        }
        console.log(obj)
        fetch(url, {
            method: "POST",
            body: JSON.stringify(obj)
        })
        .then(response => response.text())
        .then(data => console.log(data))
    })
    fr.readAsDataURL(serti.files[0])
})
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    console.log(1)
    e.preventDefault()
    if (
        serti.value &&
        jenis.value !== 'false' &&
        tingkat.value !== 'false'
    ) {
        if (catatan.value == '') {
            catatan.value = '-'
        }
        no.value = absenMurid
        nama.value = namaMurid
        nis.value = nisMurid
        loading.style.display = 'flex'
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                loading.style.display = 'none'
                success(namaMurid)
                console.log('Success!', response)
            })
            .catch(error => console.error('Error!', error.message))
    } else {
        console.log('error')
        error()
    }
})

btn1.addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelectorAll(".inputForm").forEach((input) => {
        input.value = ''
    })
})
btn2.addEventListener("click", (e) => {
    e.preventDefault()
    location.href = '../index.html'
})
btn3.addEventListener("click", (e) => {
    e.preventDefault()
    location.href = 'https://github.com/kingdedymulyono/inputsertif/issues/new'
})

