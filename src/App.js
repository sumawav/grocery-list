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

	return (
		<div className="wrapper">
			<Header />
			<TODOHero todos_completed={0} total_todos={0} />
			<Form todos={todos} setTodos={setTodos}/>
			<TODOList todos={todos} setTodos={setTodos} />
		</div>
	);
}
export default App;
