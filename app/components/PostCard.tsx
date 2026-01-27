'use client';

export default function PostCard({ title, content, imageUrl, date }: { 
  title: string, 
  content: string, 
  imageUrl: string, 
  date: string 
}) {
  return (
    <div className="group cursor-pointer">
      {/* 이미지 컨테이너: 호버 시 살짝 커지는 효과 */}
      <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-stone-200">
        <img 
          src={imageUrl} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        {/* 날짜 배지: 미니멀하게 왼쪽 하단 배치 */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] tracking-tighter font-medium uppercase">
          {date}
        </div>
      </div>

      {/* 텍스트 섹션: 여백과 타이포그래피 강조 */}
      <div className="space-y-2 px-1">
        <h3 className="text-xl font-bold tracking-tight text-[#2C241D] leading-tight group-hover:underline decoration-1 underline-offset-4">
          {title}
        </h3>
        <p className="text-sm text-stone-500 leading-relaxed line-clamp-3 font-light">
          {content}
        </p>
        <div className="pt-4 flex items-center gap-2">
          <div className="h-[1px] w-8 bg-stone-300 transition-all group-hover:w-16 group-hover:bg-[#2C241D]"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 group-hover:text-[#2C241D]">Read More</span>
        </div>
      </div>
    </div>
  );
}