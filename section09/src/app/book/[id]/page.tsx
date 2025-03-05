import style from "./page.module.css";
import {notFound} from "next/navigation";
import {BookData, ReviewData} from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";

// generateStaticParams로 제공된 1,2,3 말고 동적인 페이지를 받지 않음(받으면 404 페이지로 보냄)
// export const dynamicParams = false;

// 동적 페이지를 빌드 타임에 정적 페이지로 생성함(문자열로 명시)
export async function generateStaticParams() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const books: BookData[] = await response.json();

    return books.map((book) => ({
        id: book.id.toString(),
    }));
}

async function BookDetail({bookId}: { bookId: string }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`, {next: {tags: [`review-${bookId}`]}}
    );

    if (!response.ok) {
        if (response.status === 404) {
            notFound();
        }
        return <div>오류가 발생했습니다...</div>;
    }

    const book = await response.json();

    const {
        id,
        title,
        subTitle,
        description,
        author,
        publisher,
        coverImgUrl,
    } = book;

    return (
        <section>
            <div
                className={style.cover_img_container}
                style={{backgroundImage: `url('${coverImgUrl}')`}}
            >
                <Image src={coverImgUrl} width={240} height={300} alt={`도서 ${title}의 표지 이미지`}/>
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </section>)
}


async function ReviewList({bookId}: { bookId: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`, {});
    if (!response.ok) throw new Error(`Review fetch failed : ${response.statusText}`)

    const reviews: ReviewData[] = await response.json();

    return (
        <section>
            {reviews.map((review, idx) =>
                <ReviewItem {...review} key={`${review.bookId}-${idx}`}/>
            )}
        </section>
    )
}

export async function generateMetadata({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`, {cache: "force-cache"}
    );

    if (!response.ok) {
        throw new Error(`Review fetch failed : ${response.statusText}`);
    }

    const book: BookData = await response.json();

    return {
        title: `${book.title} - 한입 북스`,
        description: book.description,
        openGraph: {
            title: `${book.title} - 한입 북스`,
            description: book.description,
            images: [book.coverImgUrl],
        }
    }
}

export default async function Page({params}: { params: Promise<{ id: string }> }) {
    return (
        <div className={style.container}>
            <BookDetail bookId={(await params).id}/>
            <ReviewEditor bookId={(await params).id}/>
            <ReviewList bookId={(await params).id}/>
        </div>
    );
}
