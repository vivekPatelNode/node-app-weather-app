


const formSelect = document.querySelector("form")
const serchText = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")





formSelect.addEventListener("submit",(e) =>{
    e.preventDefault()
    const location = serchText.value
    messageOne.textContent = "Lodaing.."
    messageTwo.textContent = ""
    
     fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>{
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = `Location:${data.location}`
            messageTwo.textContent = `Temprature:${data.FellLike}'C`
        
        }
    })
})
    
    
})