$(function(){
	showText();
	$("#add-todo").click(function(){
		if (saveTodo()) {
			showText();
		}
	});
});

function checkInput(todoStr) {
	if (todoStr.length === 0) {
		$("#alert-content").text("TODOを入力してください");
		$("#alert-modal").modal();
		return false;
	}
	if (todoStr.length > 80) {
		$("#alert-content").text("文字数は80以下にしてください");
		$("#alert-modal").modal();
		return false;
	}
	for (var i = localStorage.length; i > 0; i --) {
		if (localStorage.getItem(i - 1) === todoStr) {
			$("#alert-content").text("同じ内容を避けてください");
			$("#alert-modal").modal();
			return false;
		}
	}
	return true;
}

function showText() {
	var list = $("#todo-display");
	list.children().remove();
	
	var todo = [];
	for (var i = localStorage.length; i > 0; i --) {
		todo.push('<li class="list-group-item">' + h(localStorage.getItem(i - 1)) + '</li>');
	}
	list.append(todo.join("\n"));
}

function saveTodo() {
	var todo = $("#inputTodo");
	if (checkInput(todo.val())) {
		localStorage.setItem(localStorage.length, todo.val());
		todo.val("");
		return true;
	}
	else {
		return false;
	}
}

function h(str) {
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/"/g, '&quot;');
	str = str.replace(/'/g, '&#039;');
	return str;
}