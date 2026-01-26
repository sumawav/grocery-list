// src/components/Form.jsx

function Form({ todos, setTodos }) {
	const handleSubmit = (event) => {
		event.preventDefault();

		const text = event.target.todo.value;
		if (text === "") return;

		const newTodo = {
			title: event.target.todo.value,
			id: window.self.crypto.randomUUID(),
			is_completed: false,
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
			<button type="submit">
				<span className="visually-hidden">Submit</span>
			</button>
		</form>
	);
}
export default Form;
