
import styles from './SBar.module.css'





export const SBar = ({ likes = 50, dislikes = 50 }) => {



    let dislikesWidth = dislikes / (likes + dislikes) * 100
    let likesWidth = likes / (likes + dislikes) * 100

    if (likes === 0 && dislikes === 0) {
        dislikesWidth = 50;
        likesWidth = 50;
    }


    return (
        <>
            <div className={styles.bar}>
                <div className={styles.container}>
                    <div style={{
                        width: `${likesWidth}%`
                    }} className={styles.likes}></div>
                    <div style={{
                        width: `${dislikesWidth}%`
                    }}
                        className={styles.dislikes}></div>

                </div>

            </div>

        </>
    );



}