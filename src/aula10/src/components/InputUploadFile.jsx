/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const ButtonContainer = styled('button')({
	marginBotton: 10
});

export default function InputUploadFile({setFile,fileName}) {
	return (
		<ButtonContainer form={'disabled'}>
			<Button form={'disabled'} component="label" color={fileName?"success":"primary"} variant="contained" startIcon={<CloudUploadIcon />}>
				{fileName? fileName :"Upload file"}
				<VisuallyHiddenInput type="file" onChange={e=>{
					console.log(e.target.files)
					setFile(e.target.files[0].name)
				}} />
			</Button>
		</ButtonContainer>
	);
}