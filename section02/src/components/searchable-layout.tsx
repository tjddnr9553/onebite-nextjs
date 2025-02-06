import {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/router";
import style from './searchable-layout.module.css';

const SearchableLayout = ({children}: { children: ReactNode }) => {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const q = router.query.q as string;

    useEffect(() => {
        setSearch(q || "");
    }, [q]);

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onSubmit = () => {
        if (search.length <= 0 || q === search) return;
        router.push(`/search?q=${search}`);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    }

    return (
        <div>
            <div className={style.searchbar_container}>
                <input type="text" placeholder="검색어를 입력해주세요." onChange={(e) => onChangeSearch(e)}
                       onKeyDown={(e) => onKeyDown(e)}/>
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    );
}
export default SearchableLayout;
