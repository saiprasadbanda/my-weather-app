console.log('Client side js loaded.');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p = document.getElementById('result')
// p.te
getForecast = (loc) =>{
    fetch('http://localhost:3000/weather?address='+loc+'').then( response => response.json().then( data => {
        if(data.error){
            return p.textContent=data.error
        }
        p.textContent=data.weather
    })).catch( e => console.log('outer catch:',e))
}


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    let location = search.value
    getForecast(location)
    console.log('Testing.. event submit.',location)
    // console.log('Testing.. foreCast.',foreCast)

})