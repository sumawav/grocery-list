// src/components/TODOList.jsx
import React from "react";
import Categories from "./Categories";

function TODOList({ todos, setTodos }) {
	const [isSorted, setSorted] = React.useState(false);
	const listRef = React.useRef(0);

	// helper functions
	const alphabetic = (a, b) => (a.category < b.category ? -1 : 1);
	const getElementsAndIndex = (item) => {
		const listElements = listRef.current.children;
		const index = Array.from(listElements).findIndex(
			(elem) => elem.id === item.id
		);
		return [listElements, index];
	};

	// handlers
	const handleDeleteTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};
	const handleToggleSort = () => setSorted((pSort) => !pSort);
	const handleEnterKey = (item) => {
		if (isSorted) return;
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
		const [listElements, index] = getElementsAndIndex(item);
		if (index == 0) return;
		listElements[index - 1].getElementsByTagName("input")[0].focus();
	};
	const handleDownKey = (item) => {
		const [listElements, index] = getElementsAndIndex(item);
		if (index == Array.from(listElements).length - 1) return;
		listElements[index + 1].getElementsByTagName("input")[0].focus();
	};
	const handleDelKey = (item) => {
		const [listElements, index] = getElementsAndIndex(item);
		const caretPos =
			listElements[index].getElementsByTagName("input")[0].selectionStart;
		if (caretPos === 0) {
			handleDeleteTodo(item.id);
			console.log(index);
			if (index === Array.from(listElements).length - 1)
				listElements[index - 1]
					.getElementsByTagName("input")[0]
					.focus();
		}
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
									handleUpKey={handleUpKey}
									handleDownKey={handleDownKey}
									handleDelKey={handleDelKey}
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
					changeHandler={handleChangeCategory}
				/>
				<button onClick={() => handleDeleteTodo(item.id)}>
					<span className="visually-hidden">&#10006;</span>
				</button>
			</div>
		</li>
	);
}

export default TODOList;
