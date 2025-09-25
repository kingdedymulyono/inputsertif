fetch("https://script.google.com/macros/s/AKfycbzod5SdTNs6gLylAbO6Dwq135VMy3jeArdVLRofvpLT3rCauFTRif1y1b2e9kXClk1p/exec")
.then(response=>response.text())
.then(data=>console.log(data))
