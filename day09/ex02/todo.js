function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('TODO');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}

function add() {
    var task = prompt("What task would you like to add?");;
    var todos = get_todos();
    if(task)
    todos.unshift(task);
    localStorage.setItem('TODO', JSON.stringify(todos));
    show();

    return false;
}

function remove() {
    if (confirm('Are you sure you would like to remove this task?'))
    {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('TODO', JSON.stringify(todos));

    show();
    }
    return false;
}

function show() {
    var todos = get_todos();

    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<button class="remove" id="' + i  + '">' + todos[i] + '</button>';
    };
    html += '</ul>';

    document.getElementById('ft_list').innerHTML = html;

    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}

show();
