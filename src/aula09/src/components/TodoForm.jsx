/* eslint-disable react/prop-types */
import { Button, Input, InputLabel } from "@mui/material";

export default function TodoForm(
	{ 	input,
		setInput,
		editMode,
		addTodo,
		updTodo
	}) {
	return (<form onSubmit={!editMode ? addTodo : updTodo}>
		<InputLabel>Write a TODO</InputLabel>
		<Input value={input} onChange={e =>
			setInput(e.target.value)
		} />
		<InputLabel>Give an image:</InputLabel>
		<Input type={'file'} />
		<div>
			<Button
				type="submit"
				variant="contained"
				color={editMode ? "primary" : "success"}
				disabled={!input}>
				{!editMode ? "Add" : "Edit"}
				&nbsp;Todo
			</Button>
		</div>
	</form>);
}
