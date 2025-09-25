
const tes = document.getElementById("test")
const main = document.getElementById("main")
const mainData = document.getElementById("mainContainer")
const test = document.getElementById("test")
const testList = document.getElementById("testList")
const testLink = document.getElementById("testLink")
let students = []
let link
let i = 0

class Murid {
  constructor(absen, nis, nama, jenis, tingkat, catatan, img, id) {
    this.absen = absen
    this.nis = nis
    this.nama = nama
    this.jenis = jenis
    this.tingkat = tingkat
    this.catatan = catatan
    this.img = img.replace('&export=download', "")
    this.Sertifikat_ID = id
  }
  getDetail() {
    mainData.innerHTML=`
      <div id="mainData" class="rounded-5">
        <div class="nameBox p-4 w-100 d-flex justify-content-between align-items-center">
            <img src="../image/blank.webp" class="w-25 rounded-circle" alt="">
            <div class="d-flex justify-content-start flex-column  ">
              <h3 class="text-start mx-4 fw-semibold">${this.nama}</h3>
              <h5 class="text-start mx-4 fw-light">${this.nis}</h5>
            </div>
        </div>
        <ul id="mainList" class="mainList list-group w-100 mx-auto p-4 rounded-4">
            <div id="testList">
                <li class="list-group-item activeList">
                    <a href="">Jenis :</a>
                    <span>${this.jenis}</span>
                </li>
                <li class="list-group-item">
                    <a href="">Tingkat :</a>
                    <span>${this.tingkat}</span>
                </li>
                <li class="list-group-item">
                    <a href="">Catatan :</a>
                    <span>${this.catatan}</span>
                </li>
                <li class="list-group-item d-flex align-items-center ">
                    <a href="">Sertifikat :</a>
                    <a href="${this.img}" class="btnImg p-2 rounded-3 mx-2">Klik Disini</a>
                </li>
                <div class="d-flex justify-content-start align-items-center gap-2 mt-2">
                  <a class="btnImg p-2 rounded-3" onclick="closeMain()">Close</a>
                  <span class="text-secondary fs-6 font-monospace">${this.Sertifikat_ID}</span>
                </div>
                </div>
                </ul>
    </div> 
    `
    // swal.fire({
    //   icon: 'success',
    //   title: `Prestasi ${this.nama}`,
    //   html: `
    // <ul id="test" class="list-group w-75 mx-auto">
    //     <li class="list-group-item text-start active">Nama : ${this.nama}</li>
    //     <li class="list-group-item text-start">Absen : ${this.absen}</li>
    //     <li class="list-group-item text-start">Nis : ${this.nis}</li>
    //     <li class="list-group-item text-start">Jenis : ${this.jenis}</li>
    //     <li class="list-group-item text-start">Tingkat : ${this.tingkat}</li>
    //     <li class="list-group-item text-start">Catatan : ${this.catatan}</li>
    //     <li class="list-group-item text-start">Link sertifikat : 
    //     <a href="${this.img}" target="_blank">Klik Disini</a></li>
    //     <li class="list-group-item text-start">ID : ${this.Sertifikat_ID}</li>
    // </ul>
    //   `,
    //   confirmButtonText:"Lanjutkan",
    //   confirmButtonColor:"#A5DC86"
    // })
    
  }
}
// const sheetId = "1FqF1-qo_RTRJFgDzejhe0QXq6m8esG6M09Cf7wYExeE";

const closeMain = () => {
  document.getElementById("mainData").style.top="100%";
  document.getElementById("mainData").style.opacity=0;
  mainData.innerHTML=''
}

if (i == 0) {
  testList.innerHTML = 'Wait a second....'
}
const sheetId = "1amoeLPx9BxuCRAw0-XfVMPVguT9QdAel4X6RhRKRlCg";
const sheetName = encodeURIComponent("sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/
gviz/tq?tqx=out:csv&sheet=${sheetName}'`;
const getData = async () => {
  let x = 0
  fetch(sheetURL)
    .then(response => response.text(""))
    .then(data => {
      let objData = convertCsvToObject(data)
      console.table(objData)
      if (i == 0) {
        testList.innerHTML = ''
        i = 1
      }
      objData.map((el) => {
        students[x] = new Murid(el.no, el.nis, el.nama, el.jenis, el.tingkat, el.catatan, el.serti ,el.sertifikat_ID)
        console.table(students[x])
        if(students[x].nama!==''){

          test.innerHTML += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
          <span class="text-secondary">${x}.</span>
          <span>${el.nama}</span>
          </div>
          <button id=${x} type="button" class="muridBtn p-2 rounded-3">Detail</button>
          </li>`
          x++
        }
      })
      document.querySelectorAll(".muridBtn").forEach((btn) => {
        btn.addEventListener('click', () => {
          students[btn.id].getDetail()
        })
      })
    })
}
function convertCsvToObject(csv) {
  const rows = csv.trim().split('\n');

  // Membersihkan header dari tanda kutip
  const headers = rows[0].split(',').map(header => header.trim().replace(/"/g, ''));

  const dataRows = rows.slice(1);
  const result = [];

  dataRows.forEach(row => {
    // Membersihkan nilai dari tanda kutip
    const values = row.split(',').map(value => value.trim().replace(/"/g, ''));

    const tempObject = {};
    headers.forEach((header, index) => {
      tempObject[header] = values[index];
    });

    result.push(tempObject);
  });

  return result;
}
function convertCsvToArray(csv) {
  // Memecah string CSV menjadi baris-baris
  const rows = csv.trim().split('\n');

  // Menginisialisasi array kosong untuk menampung hasilnya
  const result = [];

  // Melakukan iterasi untuk setiap baris
  rows.forEach(row => {
    // Memecah setiap baris menjadi array nilai berdasarkan koma
    const values = row.split(',').map(value => value.trim());

    // Menambahkan array nilai ke dalam array hasil
    result.push(values);
  });

  return result;
}
getData()



const getNigger = async () => {
  fetch("https://drive.google.com/file/d/1fjy_f38jiTGRm5LxZhlXdOSr0YZJAVm3/view")
    .then(response => response)
    .then(data => console.log(data))
}