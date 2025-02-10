import {BookData} from "@/types";

export default async function fetchRandomBooks(): Promise<BookData[]> {
    const url = "https://onebite-books-server-five-sandy.vercel.app/book/random";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error();
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};
