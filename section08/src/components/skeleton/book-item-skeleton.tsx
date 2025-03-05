import styles from "./book-item-skeleton.module.css";

export default function BookItemSkeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.coverImg}></div>
            <div className={styles.info_container}>
                <div className={styles.title}></div>
                <div className={styles.subtitle}></div>
                <br/>
                <div className={styles.author}></div>
            </div>
        </div>
    )
}
