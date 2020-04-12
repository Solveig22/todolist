//SELECTORS
const todoInput = document.querySelector('.todo-input')
const todoBtn = document.querySelector('.todo-btn')
const todoList = document.querySelector('.todo-list')
const filterTodo = document.querySelector('.filter-todo')

//EVENTS
window.addEventListener('DOMContentLoaded', getLocalTodos)
todoBtn.addEventListener('click', addItem)
todoList.addEventListener('click', checkDelete)
filterTodo.addEventListener('change', filterTodos)


//FUNCTIONS
function addItem(event) {
    event.preventDefault()

    if(todoInput.value != "") {
        //Todo div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
    
        //List item
        const item = document.createElement('li')
        item.innerText = todoInput.value
        todoDiv.appendChild(item)
    
        //Save todo localStorage
        saveTodo(todoInput.value)

        //Check btn
        const checkBtn = document.createElement('button')
        checkBtn.classList.add('btn-check')
        checkBtn.innerHTML = '<i class="fas fa-check"></i>'
        todoDiv.appendChild(checkBtn)
    
        //Trash btn
        const trashBtn = document.createElement('button')
        trashBtn.classList.add('btn-trash')
        trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'
        todoDiv.appendChild(trashBtn)
    
        
        todoList.appendChild(todoDiv)
        todoInput.value = ""
        todoInput.focus()
    }

}

function checkDelete(e) {

    const item = e.target
    const parent = item.parentElement

    if(item.classList[0] == "btn-trash") {

        parent.classList.add('fall')

        removeTodo(parent)
        
        parent.addEventListener('transitionend', () => {
            parent.remove()
        })
    }    

    if(item.classList[0] == "btn-check") {
        parent.classList.add('completed')
        setStat(parent.firstElementChild.innerText, 'completed')
    }
}

function filterTodos() {
    const filter = filterTodo.value
    const todos = [...todoList.children]
    switch(filter) {
        case "all":
            todos.forEach(todo => {
                todo.style.display = "flex"
            })
            break;
        case "completed":
            todos.forEach(function(todo) {
                if(todo.classList.contains('completed')) {
                    todo.style.display = "flex"
                }else {
                    todo.style.display = "none"
                }
            })
            break;
        case "incomplete":
            todos.forEach(function(todo) {
                if(!todo.classList.contains('completed')) {
                    todo.style.display = "flex"
                }else {
                    todo.style.display = "none"
                }
            })
            break;
    }
}

function getTodos() {
    let todos

    if(localStorage.getItem('todos') === null) {
        todos = []
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    return todos
}

function saveTodo(todo) {
    let todos = getTodos()

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
    
}

function getLocalTodos() {
    let todos = getTodos()

    todos.forEach(todo => {
        //Todo div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
    
        //List item
        const item = document.createElement('li')
        if(Array.isArray(todo)) {
            item.innerHTML = todo[0]
            todoDiv.classList.add('completed')
        }else {
            item.innerText = todo
        }
        todoDiv.appendChild(item)
        //Check btn
        const checkBtn = document.createElement('button')
        checkBtn.classList.add('btn-check')
        checkBtn.innerHTML = '<i class="fas fa-check"></i>'
        todoDiv.appendChild(checkBtn)
    
        //Trash btn
        const trashBtn = document.createElement('button')
        trashBtn.classList.add('btn-trash')
        trashBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'
        todoDiv.appendChild(trashBtn)
    
        
        todoList.appendChild(todoDiv)
        todoInput.value = ""
        todoInput.focus()
    })


}

function removeTodo(parent) {
    let todos = getTodos()
    let todoIndex

    todoIndex = getIndexOf(parent)

    if(todoIndex !== -1) {
        todos.splice(todoIndex, 1)
    }  

    localStorage.setItem('todos', JSON.stringify(todos))
}

function setStat(item, stat) {
    let todos = getTodos()
    let itemIndex = todos.indexOf(item)
    todos.splice(itemIndex, 1,  [item, stat])
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getIndexOf(parent) {
    let todos = getTodos()
    let todoValue = parent.firstElementChild.innerText
    let todoIndex

    console.log(todos)
    if(parent.classList.contains('completed')) {
        todos.forEach(todo => {
            if(Array.isArray(todo)) {
                if(todo.indexOf(todoValue) !== -1) {
                   todoIndex = todos.indexOf(todo)
                }
            }
        })
    }else {
        todoIndex = todos.indexOf(todoValue)
    }

    return todoIndex
}