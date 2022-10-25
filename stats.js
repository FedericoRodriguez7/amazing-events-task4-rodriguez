let trTable = document.querySelectorAll("tr.tables");

function unicEvent(array, index) {
    trTable[index].innerHTML += `<td>${array.name}</td>`;
}
function allEvents(array, index) {
    array.forEach(item =>{
        trTable[index].innerHTML += `<td>${item.category}</td>`
        trTable[index].innerHTML += `<td>${item.revenue}</td>`
        trTable[index++].innerHTML += `<td>${item.percentage}</td>`
    })
}


async function firstTable() {
    try {
        let table = await fetch("https://mh-amazing.herokuapp.com/amazing?time=past");
        table = await table.json();
        let assistMax = table.events.map((item) => ({name:item.name,maxassist:(item.assistance * 100) / item.capacity})).sort((a,b)=> b.maxassist - a.maxassist)
        assistMax = assistMax[0]
        unicEvent(assistMax,0)
        let assisMin = table.events.map((item) => ({name:item.name,maxassist:(item.assistance * 100) / item.capacity})).sort((a, b) => a.assistance - b.assistance);
        assisMin = assisMin[0];
        unicEvent(assisMin, 0);
        let capMax = table.events.map((item) => item).sort((a, b) => b.capacity - a.capacity);
        capMax = capMax[0];
        unicEvent(capMax, 0);
    } catch {
        alert("Oops");
    }
}
firstTable();

async function tableFuture() {
    try {
        let table = await fetch("https://mh-amazing.herokuapp.com/amazing?time=upcoming");
        table = await table.json();
        let data = table.events.sort((a, b) => a.category.localeCompare(b.category));
        let categories = data.map((item) => ({
            category: item.category,
            estimate: item.estimate,
            price: item.price,
            capacity:item.capacity
        }));
        let categoryFilter = categories.reduce((acumulador, valorActual) => {
            const elementoYaExiste = acumulador.find((elemento) => elemento.category === valorActual.category);
            if (elementoYaExiste) {
                return acumulador.map((elemento) => {
                    if (elemento.category === valorActual.category) {
                        return {
                            ...elemento,
                            estimate: elemento.estimate + valorActual.estimate,
                            price: elemento.price + valorActual.price,
                            capacity: elemento.capacity + valorActual.capacity
                        };
                    }
                    return elemento;
                });
            }
            return [...acumulador, valorActual];
        }, []);
        let total = categoryFilter.map((item) => ({
            category: item.category,
            revenue: item.estimate * item.price,
            percentage:((item.estimate * 100) / item.capacity).toFixed(1) + '%'
        }));
        allEvents(total,1)
    } catch {
        alert("Oops");
    }
}
tableFuture();

async function tablePast() {
    try {
        let table = await fetch("https://mh-amazing.herokuapp.com/amazing?time=past");
        table = await table.json();
        let data = table.events.sort((a, b) => a.category.localeCompare(b.category));
        let categories = data.map((item) => ({
            category: item.category,
            assistance: item.assistance,
            price: item.price,
            capacity:item.capacity
        }));
        let categoryFilter = categories.reduce((acumulador, valorActual) => {
            const elementoYaExiste = acumulador.find((elemento) => elemento.category === valorActual.category);
            if (elementoYaExiste) {
                return acumulador.map((elemento) => {
                    if (elemento.category === valorActual.category) {
                        return {
                            ...elemento,
                            assistance: elemento.assistance + valorActual.assistance,
                            price: elemento.price + valorActual.price,
                            capacity: elemento.capacity + valorActual.capacity
                        };
                    }
                    return elemento;
                });
            }
            return [...acumulador, valorActual];
        }, []);
        let total = categoryFilter.map((item) => ({
            category: item.category,
            revenue: item.assistance * item.price,
            percentage:((item.assistance * 100) / item.capacity).toFixed(1) + '%'
        }));
        allEvents(total,7)
    } catch {
        alert("Oops");
    }
}
tablePast();
