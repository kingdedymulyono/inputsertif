const getData= async () => {
    fetch("https://kingdedymulyono.github.io/datamurid/murid.json")
    .then(response=>response.json())
    .then(data=>{
        console.table(data)
    })
}
getData()