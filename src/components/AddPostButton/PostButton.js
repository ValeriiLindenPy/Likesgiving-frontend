import styles from './PostButton.module.css'



export const AddPostBtn = ({ type, onClick }) => {

    return (
        <>
            {type == 'like' ? <button type='button' onClick={onClick} className={styles.button}>+</button> : <button type='button' onClick={onClick} className={styles.buttonBlack}>+</button>}

        </>
    );


}