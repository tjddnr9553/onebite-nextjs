'use client';

import {createReviewAction} from "@/actions/create-review-action";
import styles from './review-editor.module.css';
import {useActionState, useEffect} from "react";

export default function ReviewEditor({bookId}: { bookId: string }) {
    const [state, formAction, isPending] = useActionState(createReviewAction, null);
    useEffect(() => {
        if (state && !state.status) {
            alert(state.error);
        }
    }, [state]);

    return (
        <section>
            <form action={formAction} className={styles.form_container}>
                <input type="text" name="bookId" value={bookId} hidden readOnly/>
                <textarea required disabled={isPending} name="content" placeholder="리뷰 내용" className={styles.content}/>
                <div className={styles.submit_container}>
                    <input required disabled={isPending} type="text" name="author" placeholder="작성자"/>
                    <button type="submit" disabled={isPending}>{isPending ? "..." : "작성하기"}</button>
                </div>
            </form>
        </section>
    );
}
