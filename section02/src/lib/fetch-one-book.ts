import {BookData} from "@/types";

export default async function fetchOneBook(id: string): Promise<BookData | null> {
    const url = `https://onebite-books-server-five-sandy.vercel.app/book/${id}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error();
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}
