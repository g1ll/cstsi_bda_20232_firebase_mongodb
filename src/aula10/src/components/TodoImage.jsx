// eslint-disable-next-line react/prop-types
export default function TodoImage({ image }) {
	return (
		<a href={image} target='_blank' rel="noreferrer">
			<img src={image} alt={'Todo'} width={64} height={64} />
		</a>
	)
}
