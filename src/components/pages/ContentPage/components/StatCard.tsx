export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="group flex aspect-square w-full max-w-[180px] items-center justify-center 
                    rounded-full border border-[#ddd2c4]/0 bg-white/40 p-1.5 
                    transition duration-500 hover:-translate-y-0.5">
      <div className="flex h-full w-full flex-col items-center justify-center 
                      rounded-full border border-[#ddd2c4]/40
                      transition-colors duration-500">

        <div className="text-5xl font-[400] leading-none tracking-[0.02em] text-ink-800 md:text-5xl">
          {value}
        </div>

        <div className="mt-2 text-[7px] uppercase tracking-[0.2em] text-[#8d7d67] md:text-[9px] md:tracking-[0.3em]">
          {label}
        </div>
      </div>
    </div>
  );
}
