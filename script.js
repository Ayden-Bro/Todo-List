const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')
const todos = JSON.parse(localStorage.getItem('todos'))

if (todos) {
    todos.forEach(todo => addTodo(todo))
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})

function addTodo(todo) {
    let todoText = input.value
    if (todo) {
        todoText = todo.text
    }

    /// addes to DOM
    if (todoText && !doesMatch()) {

        // Creates the container of the div
        let todoEl = document.createElement('li')

        // addes the class name for graying it out and we toggle it.
        todoEl.classList.add('completed')
        todoEl.classList.toggle('completed')

        // creates the template that we want the card to have.
        todoEl.innerHTML = `<input type="checkbox" />${todoText}`

        // todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
        }
        )

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            todoEl.remove()
        })

        todosUL.appendChild(todoEl)


        updateLS()
    }
}


function doesMatch() {
    const todosEl = document.querySelectorAll('li')
    let flag = false
    todosEl.forEach(todoElms => {
        console.log(todoElms.innerText)
        if (todoText === todoElms.innerText) {
            flag = true
        }
    })
    return flag
}

function updateLS() {
    todosEl = document.querySelectorAll('li')

    const todos = []
    todosEl.forEach(todoEL => {
        todos.push({
            text: todoEL.innerText,
            // completed does not save the completed
            completed: todoEL.classList.contains('completed')
        })
    })
    localStorage.setItem('todos', JSON.stringify(todos))
}


