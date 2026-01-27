export default function Navigation() {
  return (
    <nav className="relative z-10 flex justify-between items-end mb-24 border-b-[2px] border-[#2C241D]/10 pb-6 mx-auto max-w-6xl">
      <div>
        <h1 className="text-5xl font-bold tracking-tight">Mood Log.</h1>
        <p className="text-sm mt-3 italic opacity-70 font-medium">The Archetype of Memory.</p>
      </div>
      <div className="hidden md:flex gap-12 text-sm font-bold tracking-widest uppercase opacity-50 font-sans pb-2">
        <span className="hover:opacity-100 cursor-pointer transition border-b-2 border-transparent hover:border-[#2C241D]">Index</span>
        <span className="hover:opacity-100 cursor-pointer transition border-b-2 border-transparent hover:border-[#2C241D]">Archive</span>
        <span className="hover:opacity-100 cursor-pointer transition border-b-2 border-transparent hover:border-[#2C241D]">Profile</span>
      </div>
    </nav>
  );
}