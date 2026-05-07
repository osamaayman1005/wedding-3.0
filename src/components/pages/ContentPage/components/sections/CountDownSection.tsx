import { Reveal } from "../../../../shared/Reveal";
import { SectionFrame, StatCard } from "../../components";

export function CountDownSection({ page, countdown, lang }: any) {
  const formatCounter = (num: number) => num.toString().padStart(2, "0");

  return (
    <SectionFrame
      eyebrow={page.saveTheDate}
      title={page.countdownTitle}
      subtitle={page.countdownLead}
    >
      {countdown.isPast ? (
        <Reveal>
          <div className="mx-auto max-w-xl rounded-[28px] border border-[#ddd2c4]/80 bg-white/92 px-6 py-8 text-center">
            <div className="rtl-ios-safe-text text-2xl font-[400] tracking-[0.03em] text-ink-800">
              {lang === "en" ? "It's time" : "حان الموعد"}
            </div>
          </div>
        </Reveal>
      ) : (
        <Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <StatCard value={formatCounter(countdown.days)} label={page.days} />
            <StatCard
              value={formatCounter(countdown.hours)}
              label={page.hours}
            />
            <StatCard
              value={formatCounter(countdown.minutes)}
              label={page.minutes}
            />
            <StatCard
              value={formatCounter(countdown.seconds)}
              label={page.seconds}
            />
          </div>
        </Reveal>
      )}
    </SectionFrame>
  );
}
