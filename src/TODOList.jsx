// src/components/TODOList.jsx
import React from "react";
import Item from "./Item";
import "./TODOList.css";

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
		const [listElements, index] = getElementsAndIndex(item);
		// const index = todos.findIndex((t) => t.id === item.id);
		const newTodo = {
			title: "",
			id: window.self.crypto.randomUUID(),
			is_completed: false,
			category: "Haba",
		};
		setTodos((pTodos) => pTodos.toSpliced(index + 1, 0, newTodo));
		if (Array.from(listElements).length - 1 === index) return;
		listElements[index + 1].getElementsByClassName("todo-text-input")[0].focus();
		
	};
	const handleUpKey = (item) => {
		const [listElements, index] = getElementsAndIndex(item);
		if (index == 0) return;
		listElements[index - 1].getElementsByClassName("todo-text-input")[0].focus();
	};
	const handleDownKey = (item) => {
		const [listElements, index] = getElementsAndIndex(item);
		if (index == Array.from(listElements).length - 1) return;
		listElements[index + 1].getElementsByClassName("todo-text-input")[0].focus();
	};
	const handleDelKey = (item) => {
		const [listElements, index] = getElementsAndIndex(item);
		const caretPos =
			listElements[index].getElementsByClassName("todo-text-input")[0].selectionStart;
		if (caretPos === 0 && !item.title) {
			handleDeleteTodo(item.id);
			if (index === Array.from(listElements).length - 1)
				listElements[index - 1]
					.getElementsByClassName("todo-text-input")[0]
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
			<ul className="todo-list" ref={listRef}>
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
			</ul>
		</div>
	);
}

export default TODOList;
