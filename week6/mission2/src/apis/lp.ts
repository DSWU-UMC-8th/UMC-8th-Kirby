import api from "./axios";
import type { LpListResponse, LpDetail } from "../types/lp";

// LP 목록 (누구나 조회) - fetch 사용
export const fetchLps = async (
  cursor: number = 0,
  order: "asc" | "desc" = "desc"
): Promise<LpListResponse> => {
  const url = `/v1/lps?cursor=${cursor}&limit=10&order=${order}`;
  console.log("🔥 LP 목록 fetch 요청 URL:", url);

  const res = await fetch(url);
  console.log("🔥 LP 목록 fetch 응답 상태코드:", res.status);

  if (!res.ok) throw new Error("LP 목록 조회 실패");

  const json = await res.json();
  console.log("🔥 LP 목록 fetch 전체 json:", json); // 👈 이거 추가
  console.log("🔥 LP 목록 fetch 받은 data:", json.data); // 👈 이거 추가

  return json.data as LpListResponse;
};

// LP 상세 (로그인한 사용자만) - axios 사용
export const fetchLpDetail = async (lpId: number): Promise<LpDetail> => {
  const res = await api.get(`/v1/lps/${lpId}`);
  return res.data.data;
};
