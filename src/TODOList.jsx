// src/components/TODOList.jsx
import React from "react";

function TODOList({ todos, setTodos }) {
	const [isSorted, setSorted] = React.useState(false);

	const handleDeleteTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};
	const handleToggleSort = () => setSorted((pSort) => !pSort);
	const alphabetic = (a, b) => (a.category < b.category ? -1 : 1);

	return (
		<div>
			<div className="todo_items_left">
				<button onClick={handleToggleSort}>
					<p>{isSorted ? "UNSORT" : "SORT"}</p>
				</button>
			</div>
			<ol className="todo_list">
				{todos && todos.length > 0
					? todos
							?.toSorted(isSorted ? alphabetic : undefined)
							.map((item, index) => (
								<Item
									key={index}
									item={item}
									setTodos={setTodos}
									handleDeleteTodo={handleDeleteTodo}
								/>
							))
					: null}
			</ol>
		</div>
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
		// console.log(text);
		setTodos((pTodos) =>
			pTodos.map((t) => (t.id === item.id ? { ...t, title: text } : t))
		);
		setEditing((e) => !e);
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
				<div className="todo_items_left">
					<button
						onClick={() => handleToggleTodo(item.id)}
						// className="todo_items_left"
					>
						<p>{item?.title}</p>
					</button>
					<button
						onClick={() => {}}
						// className="todo_items_left"
					>
						<p>{item?.category || "uncategorized"}</p>
					</button>
				</div>
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
