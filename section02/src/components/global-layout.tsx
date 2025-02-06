import {ReactNode} from "react";
import style from "./global-layout.module.css";
import Link from "next/link";

const GlobalLayout = ({children}: { children: ReactNode; }) => {
    return (
        <div className={style.container}>
            <header className={style.header}>
                <Link href="/">📚ONEBITE BOOKS</Link>
            </header>
            <main className={style.main}>{children}</main>
            <footer className={style.footer}>제작 @tjddnr9553</footer>
        </div>
    );
}
export default GlobalLayout;
