// src/apis/comment.ts
import { CommentResponse } from "../types/comment";
import api from "./axios"; // ✅ 커스텀 인스턴스 import!

export const fetchComments = async (
  lpId: number,
  cursor: number,
  order: "asc" | "desc"
): Promise<CommentResponse> => {
  const res = await api.get(`/v1/lps/${lpId}/comments`, {
    params: {
      cursor,
      limit: 10,
      order,
    },
  });

  return res.data.data; // ✅ 여기는 그대로 유지
};
