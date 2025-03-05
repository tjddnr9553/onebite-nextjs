'use client';

import {startTransition, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Error({error, reset}: { error: Error, reset: () => void }) {
    useEffect(() => {
        console.error(error.message);
    }, [error]);
    const router = useRouter();

    return (
        <div>
            <h3>오류가 발생했습니다.</h3>
            <button onClick={() => {
                startTransition(() => {
                    // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴
                    router.refresh();
                    // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
                    reset();
                });
            }}>
                다시 시도
            </button>
        </div>
    )
}
