
const tes = document.getElementById("test")
const main = document.getElementById("main")
const test = document.getElementById("test")
const testList = document.getElementById("testList")
const testLink = document.getElementById("testLink")
let students = []
let link
let i = 0

class Murid {
  constructor(absen, nis, nama, jenis, tingkat, catatan, img) {
    this.absen = absen
    this.nis = nis
    this.nama = nama
    this.jenis = jenis
    this.tingkat = tingkat
    this.catatan = catatan
    this.img = img.replace('&export=download', "")
  }
  getDetail() {
    swal.fire({
      icon: 'success',
      title: `Prestasi ${this.nama}`,
      html: `
    <ul id="test" class="list-group w-75 mx-auto">
        <li class="list-group-item text-start active">Nama : ${this.nama}</li>
        <li class="list-group-item text-start">Absen : ${this.absen}</li>
        <li class="list-group-item text-start">Nis : ${this.nis}</li>
        <li class="list-group-item text-start">Jenis : ${this.jenis}</li>
        <li class="list-group-item text-start">Tingkat : ${this.tingkat}</li>
        <li class="list-group-item text-start">Catatan : ${this.catatan}</li>
        <li class="list-group-item text-start">Link sertifikat : 
        <a href="${this.img}" target="_blank">Klik Disini</a></li>
    </ul>
      `,
      confirmButtonText:"Lanjutkan",
      confirmButtonColor:"#A5DC86"
    })
  }
}
// const sheetId = "1FqF1-qo_RTRJFgDzejhe0QXq6m8esG6M09Cf7wYExeE";
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
        students[x] = new Murid(el.no, el.nis, el.nama, el.jenis, el.tingkat, el.catatan, el.serti)
        console.table(students[x])
        test.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
          <span class="text-secondary">${x}.</span>
          <span>${el.nama}</span>
          </div>
            <button id=${x} type="button" class="muridBtn btn btn-success">Detail</button>
        </li>`
        x++
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