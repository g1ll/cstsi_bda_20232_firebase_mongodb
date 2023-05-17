/* eslint-disable react/prop-types */
import { TodoCollabs } from "./TodoCollabs";
import { TodoDetails } from "./TodoDetails";
import { TodoSteps } from "./TodoSteps";

export function Todo({ todo }) {
	return (<>
		{(todo.details || todo.steps || todo.collabs) ?
			<details style={{ display: 'inline' }}>
				<summary>{todo.text}
					&nbsp;|&nbsp;
					<span style={{ fontSize: '.7rem' }}>
						Autor: {todo.owner}
					</span>
				</summary>
				<ul style={{ listStyle: "none" }}>
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