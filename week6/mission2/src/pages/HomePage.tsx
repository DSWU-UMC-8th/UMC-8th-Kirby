import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchLps } from "../apis/lp";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SkeletonBox from "../components/SkeletonBox";

function HomePage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["lps", order],
      queryFn: ({ pageParam = 0 }) => fetchLps(pageParam, order),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
      initialPageParam: 0,
    });

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchNextPage();
    });
    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <div className="pt-16 px-4">
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] justify-items-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonBox key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 px-4">
      {/* 정렬 버튼 */}
      <div className="flex justify-end gap-2 mb-4">
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

      {/* 앨범 카드 */}
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] justify-items-center">
        {data?.pages.flatMap((page) =>
          page.data.map((lp) => (
            <div
              key={lp.id}
              onClick={() => navigate(`/lps/${lp.id}`)}
              className="relative overflow-hidden rounded cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{
                width: "200px",
                height: "200px",
                willChange: "transform",
              }}
            >
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-lg font-bold truncate">{lp.title}</h3>
                <p className="text-sm opacity-80">
                  {new Date(lp.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm mt-1">❤️ {lp.likes.length}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 관찰 대상 */}
      <div ref={bottomRef} className="h-12" />

      {/* 추가 로딩 중일 때 */}
      {isFetchingNextPage && (
        <div className="text-center text-white mt-4">불러오는 중...</div>
      )}
    </div>
  );
}

export default HomePage;
