// src/Categories.jsx

function Categories({ category }) {
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
	};

	return (
		<select name="selectedCategory" defaultValue={category}>
			{Object.keys(foodLibrary).map((title) => (
				<option key={title} value={`${title}`}>
					{title}
				</option>
			))}
		</select>
	);
}
export default Categories;
