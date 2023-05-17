/* eslint-disable react/prop-types */
import { TodoCollabs } from "./TodoCollabs";
import { TodoDetails } from "./TodoDetails";
import { TodoSteps } from "./TodoSteps";
import TodoImage from "./TodoImage";

export function Todo({ todo }) {
	return (<>
		{(todo.details || todo.steps || todo.collabs || todo.image) ?
			<details style={{ display: 'inline' }}>
				<summary>{todo.text}
					&nbsp;|&nbsp;
					<span style={{ fontSize: '.7rem' }}>
						Autor: {todo.owner}
					</span>
				</summary>
				<ul style={{ listStyle: "none" }}>
					{todo.image && <li><TodoImage image={todo.image} /></li>}
					{todo.details && <li><TodoDetails details={todo.details} /></li>}
					{todo.steps && <li><TodoSteps steps={todo.steps} /></li>}
					{todo.collabs && <li><TodoCollabs collabs={todo.collabs} /></li>}
				</ul>
			</details>
			: <>{todo.text} &nbsp; | &nbsp;
				<span style={{ fontSize: '.7rem' }}>
					Autor: {todo.owner}
				</span>
			</>}
	</>);
}