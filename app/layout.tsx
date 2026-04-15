import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "견적서 생성기 — MoneyStom7",
  description: "간단한 입력으로 견적서를 즉시 작성하고 인쇄하거나 PDF로 저장하세요.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
