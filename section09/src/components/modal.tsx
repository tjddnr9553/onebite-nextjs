'use client'

import styles from './modal.module.css'
import {ReactNode, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {useRouter} from "next/navigation";

export default function Modal({children}: { children: ReactNode }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
            dialogRef.current?.scrollTo({
                top: 0
            });
        }
    }, []);

    return createPortal(
        <dialog ref={dialogRef} className={styles.modal}
                onClose={() => router.back()}
                onClick={(e) => {
                    if ((e.target as any).nodeName === "DIALOG") {
                        router.back();
                    }
                }}>{children}</dialog>,
        document.getElementById('modal-root') as HTMLElement
    );
}
