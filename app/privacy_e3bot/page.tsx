import { Metadata } from 'next';
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: 'Privacy Policy | CAU E3 Notice Bot',
  description: 'CAU E3 Notice Bot Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full max-w-3xl items-start text-stone-850 text-sm sm:text-base h-fit pb-24 px-1">
      {/* Header 영역 */}
      <div className="flex flex-col w-full border-b border-stone-200 pb-8 mb-8">
        <h1 className="text-3xl sm:text-4xl xl:text-5xl w-full font-dos font-bold text-stone-800 tracking-tight leading-tight text-left">
          Privacy Policy
        </h1>
        
        <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full mt-5 gap-3">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-400 font-light font-dos">
            <Calendar size={13} className="stroke-stone-400" />
            <span>2026-05-28</span>
          </div>
        </div>
      </div>

      <article className="prose font-medium w-full max-w-none text-stone-800 leading-relaxed tracking-wide">
        <h2 className="!text-left !pt-0">개인정보처리방침 (Privacy Policy)</h2>
        <p>
          CAU E3 Notice Bot (이하 &quot;본 확장 프로그램&quot;)은 사용자의 개인정보를 중요하게 생각하며, Chrome 웹 스토어의 개발자 프로그램 정책을 준수합니다. 본 개인정보처리방침은 본 확장 프로그램이 사용자의 정보를 어떻게 취급하는지 설명합니다.
        </p>

        <h3 className="!text-left">1. 개인정보의 수집 및 이용</h3>
        <p>
          본 확장 프로그램은 사용자의 어떠한 개인 식별 정보(PII), 웹 방문 기록, 위치 데이터, 금융 정보, 기기 정보 등 어떠한 개인정보도 수집, 저장, 전송 또는 공유하지 않습니다.
        </p>

        <h3 className="!text-left">2. 호스트 권한(Host Permissions)의 사용 목적</h3>
        <p>
          본 확장 프로그램은 오직 학생들에게 학사 공지사항 정보를 제공하기 위해 명시된 아래의 두 웹사이트에 대해서만 데이터 통신을 수행합니다.
        </p>
        <ul>
          <li><a href="https://e3home.cau.ac.kr/" target="_blank" rel="noopener noreferrer">https://e3home.cau.ac.kr/</a> (중앙대학교 전자전기공학부)</li>
          <li><a href="https://www.disu.ac.kr/" target="_blank" rel="noopener noreferrer">https://www.disu.ac.kr/</a> (차세대 반도체 혁신융합대학)</li>
        </ul>
        <p>
          이 권한은 사용자가 확장 프로그램 팝업 창을 열었을 때, 해당 사이트의 공개된 공지사항 게시판의 텍스트(제목, 날짜, 하이퍼링크)를 읽어와 화면에 정렬해 주는 목적으로만 사용됩니다. 그 외의 어떠한 개인 브라우징 영역이나 쿠키 데이터 등에는 접근하지 않습니다.
        </p>

        <h3 className="!text-left">3. 데이터의 제3자 제공 및 판매</h3>
        <p>
          본 확장 프로그램은 수집하는 사용자 데이터 자체가 존재하지 않으므로, 이를 제3자에게 판매, 양도, 공유하는 행위가 일절 발생하지 않습니다. 가져온 공지사항 데이터는 사용자의 로컬 브라우저 화면에 일시적으로 표시된 후 정지됩니다.
        </p>

        <h3 className="!text-left">4. 원격 코드(Remote Code) 미사용</h3>
        <p>
          본 확장 프로그램은 외부 서버에서 스크립트를 동적으로 불러오는 원격 코드를 사용하지 않습니다. 모든 프로그램 로직은 확장 프로그램 패키지 내부에 포함된 안전한 로컬 스크립트로만 구동됩니다.
        </p>

        <h3 className="!text-left">5. 문의 사항</h3>
        <p>
          본 개인정보처리방침 또는 확장 프로그램 사용과 관련하여 문의 사항이 있으신 경우 아래의 연락처로 문의해 주시기 바랍니다.
        </p>
        <ul className="!list-none !pl-0">
          <li className="!pl-0 !before:hidden">개발자: vini___u (<a href="mailto:11e26db@gmail.com">11e26db@gmail.com</a>)</li>
          <li className="!pl-0 !before:hidden">웹사이트: <a href="https://viniu.info" target="_blank" rel="noopener noreferrer">https://viniu.info</a></li>
        </ul>

        <hr />
        
        <p className="text-sm text-stone-400 !pt-10">
          시행일자: 2026년 5월 28일
        </p>
      </article>
    </div>
  );
}
