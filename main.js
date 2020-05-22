let form = document.querySelector('.todo-control'),
    list = document.querySelector('.todo-list'),
    completed = document.querySelector('.todo-completed'),
    todo_container = document.querySelector('.todo-container'),
    obj,
    idCount = 0;

if(localStorage.userTasks == undefined) {
    obj = [];
    idCount = 0;
} else {
    obj = JSON.parse(localStorage.userTasks);
    idCount = localStorage.idCount;
}

const render = () => {
    list.innerHTML = '';
    completed.innerHTML = '';
    obj.forEach(elem => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.id = elem.id;
        li.innerHTML = `<span class="text-todo">${elem.value}</span>
                        <div class="todo-buttons">
                            <button class="todo-remove"></button>
                            <button class="todo-complete"></button>
                        </div>`;
        if(elem.completed) {
            completed.append(li);
        } else {
            list.append(li);
        }
    });
    localStorage.userTasks = JSON.stringify(obj);
}
render();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let inputValue = form.querySelector('.header-input');
    if(!inputValue.value) return;
    let newObj = {
        value: inputValue.value,
        completed: false,
        id: idCount
    }
    obj.push(newObj);
    render();
    inputValue.value = '';
    localStorage.idCount = ++idCount;
});

function search(elem) {
    let id = elem.id;
    for(let i = 0; i < obj.length; i++) {
        if(obj[i].id == +id) {
            return i;
        }
    };
}

todo_container.addEventListener('click', () => {
    event.preventDefault();
    if(!event.target.matches('button')) return;
    if(event.target.classList.contains('todo-remove')) {
        let index = search(event.target.closest('li'));
        obj.splice(index,1);
        render();
    } else if(event.target.classList.contains('todo-complete')) {
        let index = search(event.target.closest('li'));
        obj[index].completed ? obj[index].completed = false : obj[index].completed = true;
        render();
    }
});