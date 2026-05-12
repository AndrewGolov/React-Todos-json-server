import styles from './Field.module.css';

export const Field = ({ type, value, onChange, placeholder, inpRef }) => {
	return (
		<div className={styles['field__wrapper']}>
			<input
				ref={inpRef}
				type={type}
				value={value || ''}
				onChange={onChange}
				placeholder={placeholder}
				className={styles['field__input']}
			/>
		</div>
	);
};
