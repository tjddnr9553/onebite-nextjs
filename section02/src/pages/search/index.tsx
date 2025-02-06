import {ReactNode, useEffect, useState} from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import {useRouter} from "next/router";
import {BookData} from "@/types";

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//     const q = context.query.q;
//     const books = await fetchBooks(q as string);
//
//     return {
//         props: {books}
//     }
// }

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
