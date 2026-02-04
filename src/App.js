// src/app/page.js

import React from "react";
import Form from "./Form";
import Header from "./Header";
import TODOHero from "./TODOHero";
import TODOList from "./TODOList";

// superficial change to test git

function App() {
	const [todos, setTodos] = React.useState([
		{
			title: "Broccoli",
			id: window.self.crypto.randomUUID(),
			is_completed: false,
			category: "Wet Produce",
			current: false,
		},
		{
			title: "Garbanzo Beans",
			id: window.self.crypto.randomUUID(),
			is_completed: false,
			category: "Grocery",
			current: false,
		},
		{
			title: "Cajun Alfredo Pasta",
			id: window.self.crypto.randomUUID(),
			is_completed: false,
			category: "Fresh",
			current: true,
		},
	]);

	const todos_completed = todos.filter((todo) => todo.is_completed).length;
	const total_todos = todos.length;

	return (
		<div className="wrapper">
			<Header />
			<TODOHero
				todos_completed={todos_completed}
				total_todos={total_todos}
			/>
			<Form todos={todos} setTodos={setTodos} />
			<TODOList todos={todos} setTodos={setTodos} />
		</div>
	);
}
export default App;
