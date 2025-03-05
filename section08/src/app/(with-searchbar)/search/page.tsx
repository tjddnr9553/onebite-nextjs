import BookItem from "@/components/book-item";
import {BookData} from "@/types";
import {delay} from "@/util/delay";
import {Suspense} from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function SearchResult({q}: { q: string }) {
    await delay(1500);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`);
    if (!response.ok) return <div>오류가 발생했습니다.</div>;
    const books: BookData[] = await response.json();

    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

export default async function Page({searchParams,}: {
    searchParams: Promise<{ q?: string; }>;
}) {
    return (
        <Suspense fallback={<BookListSkeleton count={3}/>} key={(await searchParams).q || ""}>
            <SearchResult q={(await searchParams).q || ""}/>
        </Suspense>
    )
}
