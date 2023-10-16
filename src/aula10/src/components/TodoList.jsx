import { Button, Icon } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote'
import {Todo} from "./Todo"

/* eslint-disable react/prop-types */
export function TodoList({ todos, editTodo, delTodo }) {
	return (
		<ul style={{ listStyle: "none" }}>
			{todos.map((todo, index) =>
				<li key={index}>
					<Todo todo={todo} key={`todo_${index}`} />
					<Button key={`btn_${index}`}
						onClick={() => editTodo(todo.id)}
						color="primary" >
						<EditNoteIcon />
					</Button>
					<Button key={`btn_${index + 1}`}
						onClick={() => delTodo(todo.id)}
						color="error" >
						<Icon>delete_forever</Icon>
					</Button>
				</li>
			)}
		</ul>
	);
}