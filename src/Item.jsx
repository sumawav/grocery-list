// src/components/Item.jsx
import React from "react";
import Categories from "./Categories";

function Item({
	item,
	setTodos,
	handleDeleteTodo,
	handleEnterKey,
	handleUpKey,
	handleDownKey,
	handleDelKey,
}) {
	// const [isEditing, setEditing] = React.useState(false);
	const handleToggleTodo = (id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id
					? { ...todo, is_completed: !todo.is_completed }
					: todo
			)
		);
	};
	const handleUpdateTodos = (e) => {
		const text = e.target.value;
		setTodos((pTodos) =>
			pTodos.map((pt) =>
				pt.id === item.id ? { ...pt, title: text } : pt
			)
		);
	};
	const handleChangeCategory = (e) => {
		const newCat = e.target.value;
		console.log(newCat);
		setTodos((pTodos) =>
			pTodos.map((pt) =>
				pt.id === item.id ? { ...pt, category: newCat } : pt
			)
		);
	};
	return (
		<li id={item?.id} className="todo_item">
			<div className="todo_items_left">
				<input
					value={item?.title}
					disabled={item?.is_completed}
					type="text"
					name="updatetodo"
					autoComplete="off"
					id={item?.id}
					placeholder="write something!"
					onChange={handleUpdateTodos}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleEnterKey(item);
						if (e.key === "ArrowUp") handleUpKey(item);
						if (e.key === "ArrowDown") handleDownKey(item);
						if (e.key === "Backspace") handleDelKey(item);
					}}
				/>
				<input
					type="checkbox"
					checked={item?.is_completed}
					onChange={() => handleToggleTodo(item.id)}
				/>
				<Categories
					category={item?.category}
					disabled={item?.is_completed}
					changeHandler={handleChangeCategory}
				/>
				<button onClick={() => handleDeleteTodo(item.id)}>
					<span className="visually-hidden">&#10006;</span>
				</button>
			</div>
		</li>
	);
}


export default Item;
