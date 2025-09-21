
const tes = document.getElementById("test")
const main = document.getElementById("main")

let i = 0

const apcb={
  nama:'dedyas',
  hobi:'apalah'
}

// const sheetId = "1FqF1-qo_RTRJFgDzejhe0QXq6m8esG6M09Cf7wYExeE";
if(i==0){
  main.innerHTML='Wait a second....'
}
const sheetId = "1amoeLPx9BxuCRAw0-XfVMPVguT9QdAel4X6RhRKRlCg";
const sheetName = encodeURIComponent("sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/
gviz/tq?tqx=out:csv&sheet=${sheetName}'`;
const getData = async () => {
  fetch(sheetURL)
    .then(response => response.text(""))
    .then(data => {
      let objData = convertCsvToObject(data)
      console.table(objData)
      if(i==0){
        main.innerHTML=''
        i=1
      }
      objData.map((el)=>{
        main.innerHTML+=`
        <tr>
          <td>${el.no }</td>
          <td>${el.nama }</td>
          <td>${el.nis }</td>
          <td>${el.jenis }</td>
          <td>${el.tingkat }</td>
          <td>${el.catatan }</td>
        </tr>
        `
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