// src/app/page.js

import React from "react";
import Form from "./Form";
import Header from "./Header";
import TODOHero from "./TODOHero";
import TODOList from "./TODOList";

function App() {
	const [todos, setTodos] = React.useState([
		{
			title: "Some task",
			id: window.self.crypto.randomUUID(),
			is_completed: false,
		},
		{
			title: "Some other task",
			id: window.self.crypto.randomUUID(),
			is_completed: false,
		},
		{
			title: "last task",
			id: window.self.crypto.randomUUID(),
			is_completed: false,
		},
	]);

	const todos_completed = todos.filter((todo) => todo.is_completed).length;
	const total_todos = todos.length;




	return (
		<div className="wrapper">
			<Header />
			<TODOHero todos_completed={todos_completed} total_todos={total_todos} />
			<Form todos={todos} setTodos={setTodos}/>
			<TODOList todos={todos} setTodos={setTodos} />
		</div>
	);
}
export default App;
