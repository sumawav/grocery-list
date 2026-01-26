// src/components/TODOList.jsx

function TODOList({ todos, setTodos }) {
	return (
		<ol className="todo_list">
			{todos && todos.length > 0
				? todos?.map((item, index) => (
						<Item key={index} item={item} setTodos={setTodos} />
					))
				: null}
		</ol>
	);
}

function Item({ item }) {
	return (
		<li id={item?.id} className="todo_item">
			<button className="todo_items_left">
				<p>{item?.title}</p>
			</button>
			<div className="todo_items_right">
				<button>
					<span className="visually-hidden">Edit</span>
				</button>
				<button>
					<span className="visually-hidden">Delete</span>
				</button>
			</div>
		</li>
	);
}

export default TODOList;
