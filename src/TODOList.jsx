// src/components/TODOList.jsx

function TODOList({ todos, setTodos }) {
	const handleDeleteTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		console.log(newTodos);
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

	const handleDeleteClick = () => handleDeleteTodo(item.id);
	return (
		<li id={item?.id} className="todo_item">
			<button className="todo_items_left">
				<p>{item?.title}</p>
			</button>
			<div className="todo_items_right">
				<button>
					<span className="visually-hidden">Edit</span>
				</button>
				<button onClick={handleDeleteClick}>
					<span className="visually-hidden">Delete</span>
				</button>
			</div>
		</li>
	);
}

export default TODOList;
