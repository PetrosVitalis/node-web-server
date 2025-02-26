fetch('http://localhost:3000/weather?address=%22boston%22').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return console.log(data.error)
        }
        console.log(data.longitude) 
        console.log(data.latitude)
        console.log(data.fdata)
    })
})