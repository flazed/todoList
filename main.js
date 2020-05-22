let form = document.querySelector('.todo-control'),
    list = document.querySelector('.todo-list'),
    completed = document.querySelector('.todo-completed'),
    todo_container = document.querySelector('.todo-container'),
    obj;

if(getCookie('userTasks') == undefined) {
    obj = [];
} else {
    obj = JSON.parse(getCookie('userTasks'));
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(key, value, year, month, day, path, domain, sequre) {
    let cookieData = `${key}=${value}; `;
    if(year) {
        let date = new Date(year, month, day);
        cookieData+=`expires=${date.toGMTString()}`;
    }
    cookieData+= path ? `; path=${path}` : ``;
    cookieData+= domain ? `; domain=${domain}` : ``;
    cookieData+= sequre ? sequre : ``;

    document.cookie = cookieData;
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
    setCookie('userTasks',JSON.stringify(obj), 2025, 1, 1);
}
render();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let inputValue = form.querySelector('.header-input');
    if(!inputValue.value) return;
    let newObj = {
        value: inputValue.value,
        completed: false
    }
    obj.push(newObj);
    render();
    inputValue.value = '';
});

function search(elem) {
    for(let i = 0; i < obj.length; i++) {
        if(obj[i].value === elem.querySelector('span').textContent) {
            return i
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
        obj[index].completed = !obj[index].completed;
        render();
    }
});