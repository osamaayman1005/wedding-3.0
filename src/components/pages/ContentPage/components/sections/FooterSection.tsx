import { SectionDivider, CopyButton } from "../../components";

export function FooterSection({ page, lang, onReturnToEnvelope }: any) {
  return (
    <footer className="px-4 pt-6 pb-12">
      <div className="mx-auto max-w-[1120px]">
        <div className="rounded-[36px] px-5 py-8 text-center">
          {/* Your updated dot-style divider */}
          <SectionDivider />

          <p className="rtl-ios-safe-text mt-5 text-lg font-[400] text-ink-800">
            {page.footerLove}
          </p>

          <p className="rtl-ios-safe-text mt-2 text-[11px] uppercase tracking-[0.45em] text-[#8d7d67]">
            {page.footerDate}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <CopyButton onClick={onReturnToEnvelope}>
              {lang === "en" ? "Close the Envelope" : "أغلق الظرف"}
            </CopyButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
