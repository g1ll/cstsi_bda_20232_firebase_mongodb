/* eslint-disable react/prop-types */
export function TodoCollabs({ collabs }) {
	return (
		<details style={{ display: 'inline' }}>
			<summary>Colaboradores:</summary>
			<ul>
				{collabs.map((collab, index) =>
					<li key={`collab_${index}`}>
						<a href={`mailto:${collab.email}`}>{collab.name}</a>
					</li>)}
			</ul>
		</details>
	);
}