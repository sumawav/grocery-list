// src/components/TODOList.jsx
import React from "react";
import Categories from "./Categories";

function TODOList({ todos, setTodos }) {
	const [isSorted, setSorted] = React.useState(false);
	const listRef = React.useRef(0);

	const handleDeleteTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	const handleToggleSort = () => setSorted((pSort) => !pSort);

	const alphabetic = (a, b) => (a.category < b.category ? -1 : 1);

	const handleEnterKey = (item) => {
		const index = todos.findIndex((t) => t.id === item.id);
		const newTodo = {
			title: "",
			id: window.self.crypto.randomUUID(),
			is_completed: false,
			category: "Haba",
		};
		setTodos((pTodos) => pTodos.toSpliced(index + 1, 0, newTodo));
	};
	const handleUpKey = (item) => {
		const index = todos.findIndex((t) => t.id === item.id);
		console.log(listRef.current);
	};
	return (
		<div>
			<div className="todo_items_left">
				<button onClick={handleToggleSort}>
					<p>{isSorted ? "UNSORT" : "SORT"}</p>
				</button>
			</div>
			<ol className="todo_list" ref={listRef}>
				{todos && todos.length > 0
					? todos
							?.toSorted(isSorted ? alphabetic : undefined)
							.map((item, index) => (
								<Item
									key={index}
									item={item}
									setTodos={setTodos}
									handleEnterKey={handleEnterKey}
									handleDeleteTodo={handleDeleteTodo}
									handleUpkey={handleUpKey}
								/>
							))
					: null}
			</ol>
		</div>
	);
}

function Item({
	item,
	setTodos,
	handleDeleteTodo,
	handleEnterKey,
	handleUpKey,
}) {
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
				<label htmlFor="updatetodo">
					<input
						value={item?.title}
						type="text"
						name="updatetodo"
						autoComplete="off"
						id="updatetodo"
						placeholder="write something!"
						onChange={handleUpdateTodos}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleEnterKey(item);
							if (e.key === "ArrowUp") handleUpKey(e);
						}}
					/>
				</label>
				<Categories
					category={item?.category}
					changeHandler={handleChangeCategory}
				/>
				<button onClick={() => handleDeleteTodo(item.id)}>
					<span className="visually-hidden">&#10006;</span>
				</button>
				<span>{item.is_completed ? "COMPLETE" : ""}</span>
			</div>
		</li>
	);
}

export default TODOList;
