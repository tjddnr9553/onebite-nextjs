import {ReactNode} from "react";
import {InferGetStaticPropsType} from "next";
import Head from "next/head";

import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";

import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

import style from "./index.module.css";

export const getStaticProps = async () => {
    const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

    return {
        props: {
            allBooks,
            randomBooks,
        },
    }
};

export default function Home({allBooks, randomBooks}: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>
            <Head>
                <title>한입 북스</title>
                <meta property="og:image" content="/thumnail.png"/>
                <meta property="og:title" content="한입 북스"/>
                <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요"/>
            </Head>
            <div className={style.container}>
                <section>
                    <h3>지금 추천하는 도서</h3>
                    {randomBooks.map((book) => (
                        <BookItem key={book.id} {...book}/>
                    ))}
                </section>
                <section>
                    <h3>등록된 모든 도서</h3>
                    {allBooks.map((book) => (
                        <BookItem key={book.id} {...book}/>
                    ))}
                </section>
            </div>
        </>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
}
