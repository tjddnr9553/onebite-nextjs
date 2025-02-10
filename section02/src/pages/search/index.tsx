import {ReactNode, useEffect, useState} from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import {useRouter} from "next/router";
import {BookData} from "@/types";
import Head from "next/head";

const Page = () => {
    const [books, setBooks] = useState<BookData[]>([])
    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async (q: string) => {
        const data = await fetchBooks(q);
        setBooks(data);
    }

    useEffect(() => {
        if (q) {
            fetchSearchResult(q as string);
        }
    }, [q]);

    return (
        <div>
            <Head>
                <title>한입 북스 - 검색결과</title>
                <meta property="og:image" content="/thumnail.png"/>
                <meta property="og:title" content="한입 북스 - 검색결과"/>
                <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요"/>
            </Head>
            {books.map((book) => (
                <BookItem key={book.id} {...book}/>
            ))}
        </div>
    )
}
export default Page;

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
}
