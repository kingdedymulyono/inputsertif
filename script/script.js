window.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll(".skeleton").forEach((el)=>{
        el.classList.remove("skeleton")
    })
})


const submitBtn = document.getElementById("submitBtn")
const nis = document.getElementById("nis")
let students

const success = (name) => {
    swal.fire({
        icon: 'success',
        title: `Selamat datang ${name}`,
        text: 'Lanjutkan ke halaman berikutnya',
        confirmButtonColor: '#A5DC86',
        confirmButtonText: 'Lanjutkan'
    }).then((result)=>{
        if(result.isConfirmed){
            location.href="../pages/input.html"
        }
    })
}

const error = () => {
    swal.fire({
        icon: 'error',
        title: `Oops`,
        text: 'Something Went Wrong',
        confirmButtonColor: '#F27474',
        confirmButtonText: 'Try Again'
    })
}

const getData = async (id) => {
    let isFound = false
    fetch("./data/murid.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(murid => {
                if (murid.nisn == id) {
                    isFound = true
                    localStorage.setItem("murid", murid.nisn)
                    success(murid.nama)
                }
            })
            if (!isFound) {
                console.log('error  ')
            }
        })
}
submitBtn.addEventListener("click", async () => {
    if (nis.value) {
        await getData(nis.value)
        nis.value = ''
    } else {
        error()
    }
})
// getData(202523180)
// getData()