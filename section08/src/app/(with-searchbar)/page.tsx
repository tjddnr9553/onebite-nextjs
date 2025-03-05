import BookItem from "@/components/book-item";
import style from "./page.module.css";
import {BookData} from "@/types";
import {delay} from "@/util/delay";
import {Suspense} from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function AllBooks() {
    await delay(1500);
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {cache: "force-cache"});
    if (!data.ok) return <div>오류가 발생했습니다.</div>;
    const allBooks: BookData[] = await data.json();

    return <div>{allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
    ))}</div>;
}

async function RandomBooks() {
    await delay(3000);
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {next: {revalidate: 3}});
    if (!data.ok) return <div>오류가 발생했습니다.</div>;
    const randomBooks: BookData[] = await data.json();

    return <div>{randomBooks.map((book) => (
        <BookItem key={book.id} {...book} />
    ))}</div>;
}

export const dynamic = "force-dynamic"

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <Suspense fallback={<BookListSkeleton count={3}/>}>
                    <RandomBooks/>
                </Suspense>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <Suspense fallback={<BookListSkeleton count={10}/>}>
                    <AllBooks/>
                </Suspense>
            </section>
        </div>
    );
}
