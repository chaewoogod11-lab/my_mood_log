// app/components/WriteButton.tsx
'use client';

export default function WriteButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-10 right-10 z-50 group flex items-center justify-center"
    >
      {/* 잉크 인장(Seal) 느낌의 원형 버튼 */}
      <div className="w-16 h-16 bg-[#2C241D] rounded-full shadow-2xl flex items-center justify-center transition-transform group-hover:scale-110 active:scale-95">
        <span className="text-[#EFEBE2] text-3xl font-light">＋</span>
      </div>
      {/* 마우스 올리면 옆에 뜨는 글씨 */}
      <span className="absolute right-20 bg-[#2C241D] text-[#EFEBE2] px-4 py-2 rounded-sm text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        New Entry
      </span>
    </button>
  );
}