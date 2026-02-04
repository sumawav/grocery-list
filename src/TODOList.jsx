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
	const handleEnterKey = (item) => {
		const index = todos.findIndex((t) => t.id === item.id);
		if (index < todos.length - 1) return;

		const newTodo = {
			title: "",
			id: window.self.crypto.randomUUID(),
			is_completed: false,
			category: "Wet Produce",
		};
		setTodos((pTodos) => [...pTodos, newTodo]);
	};
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
									handleEnterKey={()=> handleEnterKey(item)}
									handleDeleteTodo={handleDeleteTodo}
								/>
							))
					: null}
			</ol>
		</div>
	);
}

function Item({ item, setTodos, handleDeleteTodo, handleEnterKey }) {
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
	const handleUpdateTodos_WIP = (e) => {
		const text = e.target.value;
		setTodos((pTodos) =>
			pTodos.map((pt) =>
				pt.id === item.id ? { ...pt, title: text } : pt
			)
		);
	};
	
	return (
		<li id={item?.id} className="todo_item">
			<div className="todo_items_left">
				<label htmlFor="updatetodo">
					<input
						value={item?.title}
						type="text"
						name="updatetodo"
						id="updatetodo"
						placeholder="write something!"
						onChange={handleUpdateTodos_WIP}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleEnterKey(e);
						}}
					/>
				</label>
			</div>

			<div className="todo_items_left">
				<button
					onClick={() => {}}
					// className="todo_items_left"
				>
					<p>{item?.category || "uncategorized"}</p>
				</button>
			</div>

			<div className="todo_items_right">
				<span>{item.is_completed ? "COMPLETE" : ""}</span>
				<button onClick={() => handleDeleteTodo(item.id)}>
					<span className="visually-hidden">Delete</span>
				</button>
			</div>
		</li>
	);
}

export default TODOList;
