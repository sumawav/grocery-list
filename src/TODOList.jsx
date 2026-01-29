// src/components/TODOList.jsx
import React from "react";

function TODOList({ todos, setTodos }) {
	const handleDeleteTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};
	return (
		<ol className="todo_list">
			{todos && todos.length > 0
				? todos?.map((item, index) => (
						<Item
							key={index}
							item={item}
							setTodos={setTodos}
							handleDeleteTodo={handleDeleteTodo}
						/>
					))
				: null}
		</ol>
	);
}

function Item({ item, setTodos, handleDeleteTodo }) {
	const [isEditing, setEditing] = React.useState(false);
	const handleToggleTodo = (id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id
					? { ...todo, is_completed: !todo.is_completed }
					: todo
			)
		);
	};

	const handleToggleEdit = () => {
		setEditing((e) => !e);
	};

	const handleUpdateTodo = (event) => {
		event.preventDefault();
		const text = event.target.updatetodo.value;
		console.log(text);
	};

	return (
		<li id={item?.id} className="todo_item">
			{isEditing ? (
				<form className="form" onSubmit={handleUpdateTodo}>
					<label htmlFor="updatetodo">
						<input
							type="text"
							name="updatetodo"
							id="updatetodo"
							placeholder="update todo"
						/>
					</label>
					<button type="submit">
						<span className="visually-hidden">Submit</span>
					</button>
				</form>
			) : (
				<button
					onClick={() => handleToggleTodo(item.id)}
					className="todo_items_left"
				>
					<p>{item?.title}</p>
				</button>
			)}
			<div className="todo_items_right">
				<span>{item.is_completed ? "COMPLETE" : ""}</span>
				<button onClick={handleToggleEdit}>
					<span className="visually-hidden">
						{isEditing ? "Editing" : "Edit"}
					</span>
				</button>
				<button onClick={() => handleDeleteTodo(item.id)}>
					<span className="visually-hidden">Delete</span>
				</button>
			</div>
		</li>
	);
}

export default TODOList;
