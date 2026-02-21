// src/Categories.jsx
import "./Categories.css";

function Categories({ category, changeHandler, disabled }) {
	const foodLibrary = {
		Produce: [],
		Meat: [],
		Cheese: [],
		Dairy: [],
		Grocery: [],
		Fresh: [],
		Deli: [],
		Cereal: [],
		Bars: [],
		Frozen: [],
		Cookies: [],
		Candy: [],
		Snacks: [],
		Haba: [],
		DFN: [],
		Beverages: [],
		Alcohol: [],
	};

	return (
		<select
			className="border-delete"
			name="selectedCategory"
			disabled={disabled}
			value={category}
			onChange={changeHandler}
		>
			{Object.keys(foodLibrary).map((title) => (
				<option key={title} value={`${title}`}>
					{title}
				</option>
			))}
		</select>
	);
}
export default Categories;
