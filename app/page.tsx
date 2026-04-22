import InvoiceMakerClient from "@/components/InvoiceMakerClient";
import Script from "next/script";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "견적서 생성기 (Invoice Maker)",
  url: "https://invoice.moneystom7.com",
  description: "간단한 입력으로 견적서를 즉시 출력하는 무료 도구",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  inLanguage: ["ko", "en"],
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 font-sans">
      <Script id="json-ld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <InvoiceMakerClient />

      <section className="max-w-3xl mx-auto mt-16 space-y-10 text-sm text-gray-400 pb-16 no-print">
        <div>
          <h2 className="text-white text-base font-semibold mb-3">견적서 생성기란?</h2>
          <p>
            견적서 생성기(Invoice Maker)는 발신자·수신자 정보와 품목을 입력하면 견적서를 즉시
            생성하고 PDF로 저장할 수 있는 무료 온라인 도구입니다. 별도 소프트웨어 설치 없이
            브라우저에서 바로 사용하고 인쇄하거나 PDF로 저장할 수 있습니다.
            프리랜서, 소상공인, 개인 사업자에게 적합합니다.
          </p>
        </div>

        <div>
          <h2 className="text-white text-base font-semibold mb-3">주요 기능</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="text-gray-300">발신자·수신자 정보</strong> — 회사명, 주소, 전화번호, 이메일 입력</li>
            <li><strong className="text-gray-300">다중 품목</strong> — 품목명, 수량, 단가를 자유롭게 추가·삭제</li>
            <li><strong className="text-gray-300">세금 자동 계산</strong> — 세율 설정 시 소계·세금·합계 자동 계산</li>
            <li><strong className="text-gray-300">PDF 저장</strong> — 브라우저 인쇄 기능으로 PDF 파일로 저장</li>
            <li><strong className="text-gray-300">비고 메모</strong> — 결제 방법, 계좌 정보 등 추가 안내 입력</li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-base font-semibold mb-3">자주 묻는 질문 (FAQ)</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-gray-300 font-medium">견적서를 PDF로 저장하는 방법은?</dt>
              <dd className="mt-1">하단의 "인쇄 / PDF 저장" 버튼을 클릭하면 브라우저 인쇄 창이 열립니다. 프린터 선택에서 "PDF로 저장" 또는 "Microsoft Print to PDF"를 선택하면 PDF 파일로 저장됩니다.</dd>
            </div>
            <div>
              <dt className="text-gray-300 font-medium">입력한 데이터가 저장되나요?</dt>
              <dd className="mt-1">아니요. 모든 데이터는 브라우저 메모리에만 임시 저장되며 페이지를 닫으면 사라집니다. 서버로 전송되지 않아 기밀 정보도 안전하게 사용할 수 있습니다.</dd>
            </div>
            <div>
              <dt className="text-gray-300 font-medium">부가가치세(VAT) 10%를 자동으로 계산할 수 있나요?</dt>
              <dd className="mt-1">네. 세율 입력란에 10을 입력하면 소계의 10%가 자동으로 세금으로 계산되어 총 합계에 반영됩니다.</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
