//Variables TASK2 y TASK3

let card = document.getElementById('cards')
let search = document.getElementById("js-search2")
let searchTexto = document.getElementById("search-text2")
let checkBox = document.getElementById("check2")

//TASK 2
function cardss(data) {

    card.innerHTML = ''
    data.forEach(item => {
        let div = document.createElement('div')
        div.className = 'card'
        div.innerHTML +=
            `
        <h5>${item.name}</h5> 
        <img src="${item.image}" alt="${item.name}" />
        <p> <strong>Category:</strong> ${item.category}</p>
        <p> <strong>Description:</strong> ${item.description}</p>
        <a class="more" href="./details.html?id=${item._id}">More...</a>
        `
        card.appendChild(div)
    })
}

function checkss(data){
    data.forEach(item => {
        checkBox.innerHTML += `
        <input type="checkbox" id="${item}" value="${item}" name="${item}" />
        <label for="${item}">${item}</label>`
    })
}

//TASK 3

//Search bar

function searchText(text, array) {
    let arrayFilter = array.filter(event => event.name.toLowerCase().includes(text.toLowerCase()))
    return arrayFilter
}

//Checkboxes

function filterCategory(array) {
    let checkbox = document.querySelectorAll('input[type="checkbox"]')
    let newCheckbox = Array.from(checkbox)
    let filterCheck = newCheckbox.filter(check => check.checked)
    let checkMark = filterCheck.map(box => box.value)
    if (checkMark.length > 0) {
        let arrayFiltrado = array.filter(event => checkMark.includes(event.category))
        return arrayFiltrado
    }
    return array
}


async function cardApi (){
    try{
        let data = await fetch("https://mh-amazing.herokuapp.com/amazing")
        data = await data.json()
        let events = data.events.sort((a,b)=> a.name.localeCompare(b.name))
        cardss(events)
        let category = new Set(events.map(item => item.category))
        category = [...category]
        checkss(category)
        search.addEventListener("click",()=>{
            let filterText = searchText(searchTexto.value,data.events)
            let filterCat = filterCategory(filterText)
            cardss(filterCat)
        })
        checkBox.addEventListener("change",()=>{
            let filterText = searchText(searchTexto.value,data.events)
            let filterCat = filterCategory(filterText)
            cardss(filterCat) 
        })
    }
    catch{
        alert("404 not found")
    }
}
cardApi()