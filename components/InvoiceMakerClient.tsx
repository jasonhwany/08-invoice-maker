"use client";
import { useState } from "react";

type Item = { desc: string; qty: number; price: number };
type Info = { company: string; address: string; phone: string; email: string };

const InfoBlock = ({ title, info, setInfo }: { title: string; info: Info; setInfo: (i: Info) => void }) => (
  <div className="bg-gray-900 rounded-2xl p-5 print:bg-white print:border print:border-gray-200">
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{title}</h3>
    <div className="space-y-2">
      {(["company","address","phone","email"] as const).map(k => (
        <input key={k} type={k === "email" ? "email" : "text"} value={info[k]}
          onChange={e => setInfo({ ...info, [k]: e.target.value })}
          placeholder={{ company:"회사명", address:"주소", phone:"전화번호", email:"이메일" }[k]}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors print:border-0 print:bg-transparent print:text-gray-900" />
      ))}
    </div>
  </div>
);

export default function InvoiceMakerClient() {
  const [from, setFrom] = useState<Info>({ company: "", address: "", phone: "", email: "" });
  const [to, setTo] = useState<Info>({ company: "", address: "", phone: "", email: "" });
  const [num, setNum] = useState(`INV-${new Date().getFullYear()}${String(Date.now()).slice(-4)}`);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [due, setDue] = useState("");
  const [items, setItems] = useState<Item[]>([{ desc: "", qty: 1, price: 0 }]);
  const [tax, setTax] = useState(10);
  const [notes, setNotes] = useState("");

  const upd = (i: number, k: keyof Item, v: string | number) =>
    setItems(arr => arr.map((it, j) => j === i ? { ...it, [k]: v } : it));

  const sub = items.reduce((s, it) => s + it.qty * it.price, 0);
  const taxAmt = sub * tax / 100;
  const total = sub + taxAmt;
  const fmt = (n: number) => n.toLocaleString("ko-KR");

  return (
    <div className="max-w-3xl mx-auto pt-8">
      <div className="text-center mb-8 no-print">
        <div className="text-5xl mb-3">📋</div>
        <h1 className="text-3xl font-bold tracking-tight">견적서 생성기</h1>
        <p className="text-gray-400 mt-1 text-sm">Invoice Maker · 작성 후 인쇄 버튼으로 PDF 저장 가능</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoBlock title="발신자" info={from} setInfo={setFrom} />
          <InfoBlock title="수신자 (청구 대상)" info={to} setInfo={setTo} />
        </div>

        <div className="bg-gray-900 rounded-2xl p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "견적 번호", val: num, set: setNum, type: "text" },
              { label: "발행일", val: date, set: setDate, type: "date" },
              { label: "유효기간", val: due, set: setDue, type: "date" },
              { label: "세율 (%)", val: String(tax), set: (v: string) => setTax(+v), type: "number" },
            ].map(({ label, val, set, type }) => (
              <div key={label}>
                <label className="text-xs text-gray-400 mb-1.5 block">{label}</label>
                <input type={type} value={val} onChange={e => set(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">품목</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr,70px,110px,32px] gap-2 text-xs text-gray-500 px-1">
              <span>품목 설명</span><span className="text-center">수량</span><span className="text-right">단가 (₩)</span><span></span>
            </div>
            {items.map((it, i) => (
              <div key={i} className="grid grid-cols-[1fr,70px,110px,32px] gap-2 items-center">
                <input value={it.desc} onChange={e => upd(i, "desc", e.target.value)} placeholder="품목 설명"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
                <input type="number" value={it.qty} min="1" onChange={e => upd(i, "qty", +e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-2 text-sm text-center focus:outline-none focus:border-emerald-500 transition-colors" />
                <input type="number" value={it.price} onChange={e => upd(i, "price", +e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-right focus:outline-none focus:border-emerald-500 transition-colors" />
                <button onClick={() => setItems(arr => arr.filter((_, j) => j !== i))} disabled={items.length === 1}
                  className="text-gray-600 hover:text-red-400 text-lg disabled:opacity-30 transition-colors">×</button>
              </div>
            ))}
          </div>
          <button onClick={() => setItems(arr => [...arr, { desc: "", qty: 1, price: 0 }])}
            className="mt-3 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">+ 품목 추가</button>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5 space-y-2">
          <div className="flex justify-between text-sm text-gray-400"><span>소계</span><span className="font-mono">₩{fmt(sub)}</span></div>
          <div className="flex justify-between text-sm text-gray-400"><span>세금 ({tax}%)</span><span className="font-mono">₩{fmt(taxAmt)}</span></div>
          <div className="border-t border-gray-700 pt-3 flex justify-between text-lg font-bold">
            <span>총 합계</span><span className="text-emerald-400 font-mono">₩{fmt(total)}</span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5">
          <label className="text-xs text-gray-400 mb-1.5 block">비고 / 메모</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="결제 방법, 계좌번호, 기타 안내사항..." />
        </div>

        <button onClick={() => window.print()}
          className="no-print w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3.5 rounded-xl transition-colors text-base">
          🖨️ 인쇄 / PDF 저장
        </button>
      </div>

      <p className="no-print text-center text-xs text-gray-600 mt-10">
        <a href="https://moneystom7.com" className="hover:text-gray-400 transition-colors">← MoneyStom7 홈으로</a>
      </p>
    </div>
  );
}
