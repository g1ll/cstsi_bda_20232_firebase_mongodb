/* eslint-disable react/prop-types */
import { Button, Input, InputLabel } from "@mui/material";
import InputUploadFile from "./InputUploadFile";

export default function TodoForm(
	{ 	input,
		setInput,
		setFileName,
		fileName,
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
		<InputUploadFile 
			setFileName={setFileName}
			fileName={fileName}></InputUploadFile>
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
