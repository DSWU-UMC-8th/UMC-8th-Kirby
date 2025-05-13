import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLpDetail } from "../apis/lp";
import type { LpDetail } from "../types/lp";
import { Pencil, Trash2, Heart } from "lucide-react";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const id = Number(lpId);

  const { data, isLoading, isError } = useQuery<LpDetail>({
    queryKey: ["lpDetail", id],
    queryFn: () => fetchLpDetail(id),
    enabled: !!id,
  });

  if (isLoading)
    return <p className="text-white p-4 pl-64 pt-16">로딩 중...</p>;
  if (isError || !data)
    return <p className="text-white p-4 pl-64 pt-16">에러 발생</p>;

  return (
    <div className="pt-16 pl-64 px-4 min-h-screen bg-zinc-900 text-white">
      <div className="max-w-3xl mx-auto bg-zinc-800 p-6 rounded-xl shadow-lg">
        {/* 상단 헤더 */}
        <div className="flex justify-between items-start mb-4">
          {/* 작성자 + 제목 */}
          <div>
            <h2 className="text-2xl font-bold mb-1">{data.title}</h2>
            <p className="text-sm text-gray-400">{data.author.name}</p>
          </div>

          {/* 아이콘 버튼 */}
          <div className="flex items-center gap-2 text-gray-400">
            <button title="수정">
              <Pencil size={18} className="hover:text-white" />
            </button>
            <button title="삭제">
              <Trash2 size={18} className="hover:text-white" />
            </button>
          </div>
        </div>

        {/* 썸네일 */}
        <div className="flex justify-center mb-6">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-[300px] h-[300px] object-cover rounded shadow"
          />
        </div>

        {/* 본문 내용 */}
        <p className="mb-6 leading-relaxed text-gray-200">{data.content}</p>

        {/* 해시태그 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {data.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-zinc-700 rounded-full text-sm text-white"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* 좋아요 UI */}
        <div className="flex justify-center items-center gap-2 text-pink-400 text-lg">
          <Heart size={18} /> <span>{data.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
