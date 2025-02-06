import style from './[id].module.css';
import {
    GetStaticPropsContext,
    InferGetStaticPropsType
} from "next";
import fetchOneBook from "@/lib/fetch-one-book";

export const getStaticPaths = () => {
    return {
        paths: [
            {params: {id: "1"}},
            {params: {id: "2"}},
            {params: {id: "3"}}
        ],
        fallback: "blocking"
    }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id;
    const book = await fetchOneBook(id as string);

    return {
        props: {book}
    }
}

const Page = ({book}: InferGetStaticPropsType<typeof getStaticProps>) => {
    if (!book) return "문제가 발생했습니다.";

    const {title, subTitle, description, author, publisher, coverImgUrl} = book;

    return (
        <div className={style.container}>
            <div style={{background: `url('${coverImgUrl}')`}} className={style.cover_img_container}>
                <img src={coverImgUrl} alt={title}/>
            </div>
            <div className={style.title}>
                {title}
            </div>
            <div className={style.subtitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </div>
    )
}
export default Page;
