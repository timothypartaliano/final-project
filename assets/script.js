// function to show the product list popup
function showProductList() {
    var modal = document.getElementById('productListModal');
    modal.style.display = 'block';
}

// function to close the product list popup
function closeProductList() {
    var modal = document.getElementById('productListModal');
    modal.style.display = 'none';
}

// function to display todos in the HTML
function displayTodo() {
    const checkTodo = JSON.parse(localStorage.getItem('todos'));
    const getData = localStorage.getItem('abc')
    console.log(getData);
    let list = '';

    if (checkTodo) {
        for (let i = 0; i < checkTodo.length; i++) {
            list += `
            <ul class="list-group list-group-horizontal rounded-0 bg-transparent m-2">
                <li class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input me-0" value="" id="${checkTodo[i].id}" aria-label="..." onchange="setComplete(this.checked, this.id)" ${checkTodo[i].checked ? 'checked' : ''}>
                    </div>
                </li>
                <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                    <p class="lead fw-normal mb-0">${checkTodo[i].name}</p>
                </li>
                <li class="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                    <button type="button" class="btn btn-danger" id="${checkTodo[i].id}" onclick="deleteTodo(this.id)">Delete</button>
                </li>
            </ul>
            `
        }
    }

    document.getElementById('list-todo').innerHTML = list;
}

// function to submit a new todo
function submitTodo() {
    const todo = document.getElementById('add-todo').value;
    let todos = JSON.parse(localStorage.getItem('todos'));

    if (todos) {
        todos.push({
            id: todos[todos.length-1].id + 1,
            name: todo,
            checked: false,
        });
    } else {
        todos = [{
            id: 0,
            name: todo,
            checked: false,
        }]
    };

    localStorage.setItem('todos', JSON.stringify(todos));
    document.getElementById('add-todo').value = '';
    
    displayTodo();
};

// function to set the completion status of a todo
function setComplete(checked, id) {
    let todos = JSON.parse(localStorage.getItem('todos'));

    todos = todos.map(el => {
        if (el.id === Number(id)) {
            el.checked = checked;
        };
        return el;
    });

    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodo();
};

// function to delete a todo
function deleteTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todos'));

    todos = todos.filter(el => el.id !== Number(id));
    if (todos.length) {
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        localStorage.removeItem('todos');
    };

    displayTodo();
}

// function to search products
const search = function() {
    const searchbox = document.getElementById("search-item").value.toUpperCase()
    const storeitems = document.getElementById("product-list")
    const product = document.querySelectorAll(".product")
    const pname = document.getElementsByTagName("h2")

    for(var i = 0; i < pname.length; i++){
        let match = product[i].getElementsByTagName('h2')[0]

        if(match){
            let textvalue = match.textContent && match.innerHTML

            if(textvalue.toUpperCase().indexOf(searchbox) > -1){
                product[i].style.display = "";
            }else{
                product[i].style.display = "none";
            }
        }
    }
}