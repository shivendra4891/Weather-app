console.log('This is client Javascript file')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
//const serach = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messagetwo = document.querySelector('#messagetwo')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = weatherForm.locations.value
    messagetwo.textContent = 'Loading...'
    messageOne.textContent =""
    console.log('location'+ location)
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
    if(data.error){
        console.log('Unable to serach the lcoation, please provide valid location')
    }
        messageOne.textContent = 'Weather Forecast :'+ data.forecast +' || Weather Temp: '+ data.temperature
        messagetwo.textContent = data.location
        console.log(data.forecast);
        console.log(data.temperature);
        console.log(data.address);
    })
})
})