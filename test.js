fetch('./data/murid.json')
.then(response=>response.json())
.then(data=>console.table(data))    