
// Find html element
const container = document.querySelector(".container");
const todoFrom = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoBtn = document.querySelector("#addBtn");
const todoLists = document.querySelector("#lists");
const messageElement = document.querySelector(".message");

// showMessage
const showMessage = (text, status)=> {
  messageElement.textContent = text;
  messageElement.classList.add(`bg-${status}`)

  setTimeout(()=>{
    messageElement.textContent = "";
    messageElement.classList.remove(`bg-${status}`)
  },1000);
}

// deleteMessage 
const deleteTodo = (event)=> {
    const seletedTodo = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(seletedTodo);

   // showMessage
   showMessage("todo is deleted", "danger")

   let selectTodo = seletedTodo.id;
   let todos = getTodosFromLStorage();
  todos = todos.filter((todo)=>
    todo.todoId !== selectTodo);
  localStorage.setItem("mytodos", JSON.stringify(todos));

}

// getTodosFromLStorage
const getTodosFromLStorage = ()=>{
  return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
}

// CreateTodo
const createTodo = (todoId, todoValue) => {
  const todoElement = document.createElement("li");
  todoElement.id = todoId;
  todoElement.classList.add("list-style")
 todoElement.innerHTML = `
 <span>${todoValue}</span>
 <span><button class= "btn" id="deleteBtn"><i class="fa fa-trash"></i></button></span>
 `;

 todoLists.appendChild(todoElement);
 const deleteBtn = todoElement.querySelector("#deleteBtn");
 deleteBtn.addEventListener("click", deleteTodo);

}

// todo function 
const addTodo = (event) => {
  // console.log(todoInput.value)
  todoValue = todoInput.value;
  event.preventDefault();

  // unique id
  const todoId = Date.now().toString();
  createTodo(todoId, todoValue);

  //show messange
  showMessage("todo is added", "success");

  // add todo to localStorage
  const todos = getTodosFromLStorage();
  todos.push({todoId, todoValue});
  localStorage.setItem("mytodos", JSON.stringify(todos));

  todoInput.value = "";
}

// LoadTodos
const loadTodos = () =>{
  const todos = getTodosFromLStorage();
  todos.map((todo) => {
    createTodo(todo.todoId, todo.todoValue);
  })
};


// Adding listeners
todoFrom.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos)