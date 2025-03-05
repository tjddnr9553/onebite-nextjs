import BookItem from "@/components/book-item";
import {BookData} from "@/types";
import {Suspense} from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import {Metadata} from "next";

async function SearchResult({q}: { q: string }) {
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

// 현재 페이지 메타 데이터를 동적으로 생성하는 역할
// 현재 페이지가 받는 props를 그대로 받음
export async function generateMetadata({searchParams}: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
    const {q} = await searchParams;
    return {
        title: `한입 북스 : ${q}`,
        description: `${q}의 검색 결과`,
        openGraph: {
            title: `한입 북스 : ${q}`,
            description: `${q}의 검색 결과`,
            images: ["/thumbnail.png"],
        }
    }
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
