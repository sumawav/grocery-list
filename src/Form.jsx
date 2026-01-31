// src/components/Form.jsx

function Form({ todos, setTodos }) {
	const handleSubmit = (event) => {
		event.preventDefault();

		const text = event.target.todo.value;
		const category = event.target.category.value || null;

		if (text === "") return;

		const newTodo = {
			title: event.target.todo.value,
			id: window.self.crypto.randomUUID(),
			is_completed: false,
			category: category || null,
		};
		setTodos([...todos, newTodo]);

		// reset the form
		event.target.reset();
	};
	return (
		<form className="form" onSubmit={handleSubmit}>
			<label htmlFor="todo">
				<input
					type="text"
					name="todo"
					id="todo"
					placeholder="Write your next task"
				/>
			</label>
			<label htmlFor="category">
				<input
					type="text"
					name="category"
					id="category"
					placeholder="Select a Category"
				/>
			</label>
			<button type="submit">
				<span className="visually-hidden">Submit</span>
			</button>
		</form>
	);
}
export default Form;
