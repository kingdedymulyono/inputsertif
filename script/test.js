const getData= async () => {
    fetch("https://kingdedymulyono.github.io/calculator/index.html")
    .then(response=>response)
    .then(data=>{
        console.log(data.arrayBuffer)
    })
}
getData()