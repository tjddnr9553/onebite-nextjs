import BookItem from "@/components/book-item";
import style from "./page.module.css";
import {BookData} from "@/types";
import {Metadata} from "next";

async function AllBooks() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {cache: "force-cache"});
    if (!data.ok) return <div>오류가 발생했습니다.</div>;
    const allBooks: BookData[] = await data.json();

    return <div>{allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
    ))}</div>;
}

async function RandomBooks() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {next: {revalidate: 3}});
    if (!data.ok) return <div>오류가 발생했습니다.</div>;
    const randomBooks: BookData[] = await data.json();

    return <div>{randomBooks.map((book) => (
        <BookItem key={book.id} {...book} />
    ))}</div>;
}

export const metadata: Metadata = {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서에 만나보세요",
    openGraph: {
        title: "한입 북스",
        description: "한입 북스에 등록된 도서에 만나보세요",
        images: ["/thumbnail.png"],
    },
}

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <RandomBooks/>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <AllBooks/>
            </section>
        </div>
    );
}
