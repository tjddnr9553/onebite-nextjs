import {ReviewData} from "@/types";
import styles from './review-item.module.css';
import ReviewItemDeleteButton from "@/components/review-item-delete-button";


export default function ReviewItem({id, content, author, createdAt, bookId}: ReviewData) {
    return (
        <div className={styles.container}>
            <div className={styles.author}>{author}</div>
            <div className={styles.content}>{content}</div>
            <div className={styles.bottom_container}>
                <div className={styles.date}>{new Date(createdAt).toLocaleString()}</div>
                <div className={styles.delete_btn}>
                    <ReviewItemDeleteButton reviewId={id} bookId={bookId}/>
                </div>
            </div>
        </div>
    )
}
