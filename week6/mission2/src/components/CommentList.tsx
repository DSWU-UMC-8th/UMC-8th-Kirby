import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { fetchComments } from "../apis/comment";
import type { CommentPage } from "../types/comment";
import type { InfiniteData } from "@tanstack/react-query";

const CommentList = () => {
  const { lpId } = useParams();
  const id = Number(lpId);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    CommentPage, // API 응답 단일 페이지
    Error, // 에러 타입
    InfiniteData<CommentPage>, // select 이후 반환 타입 (중요!)
    [string, number, string], // queryKey 타입
    number // pageParam 타입
  >({
    queryKey: ["comments", id, order],
    queryFn: ({ pageParam = 0 }) =>
      fetchComments(id, pageParam, order).then((res) => res.data),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
    enabled: !isNaN(id),
  });

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchNextPage();
    });
    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isNaN(id)) {
    return <div className="text-red-400">잘못된 게시글 ID입니다.</div>;
  }

  if (isLoading) {
    return <div className="text-white">댓글 불러오는 중...</div>;
  }

  if (isError) {
    return <div className="text-red-400">댓글을 불러오지 못했습니다.</div>;
  }

  // 더 이상 단언 필요 없음
  const pages = data?.pages ?? [];

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">댓글</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setOrder("asc")}
            className={order === "asc" ? "font-bold" : ""}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={order === "desc" ? "font-bold" : ""}
          >
            최신순
          </button>
        </div>
      </div>

      <ul className="space-y-4">
        {pages.flatMap((page) =>
          page.data.map((comment) => (
            <li key={comment.id} className="bg-zinc-700 p-3 rounded">
              <div className="text-sm text-pink-300 font-semibold">
                {comment.author.name}
              </div>
              <p className="text-white mt-1 text-sm">{comment.content}</p>
            </li>
          ))
        )}
      </ul>

      <div ref={bottomRef} className="h-8" />
      {isFetchingNextPage && (
        <p className="text-white mt-4">댓글 불러오는 중...</p>
      )}
    </div>
  );
};

export default CommentList;
