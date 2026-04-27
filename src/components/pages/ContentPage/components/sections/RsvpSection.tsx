import { Reveal } from "../../../../shared/Reveal";
import { SectionFrame, InvitationButton, CopyButton } from "../../components";

export function RsvpSection({
  page,
  dir,
  name,
  setName,
  numberOfGuests,
  setNumberOfGuests,

  attending,
  setAttending,
  handleSubmit,
  savedMessage,
  isSubmitting,
}: any) {
  return (
    <SectionFrame
      id="rsvp"
      eyebrow={page.rsvpEyebrow}
      title={page.rsvpTitle}
      subtitle={page.rsvpLead}
    >
      <Reveal>
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-[30px] border border-[#ddd2c4]/80 bg-white/92 p-6 shadow-soft md:p-8 backdrop-blur-sm"
          >
            {/* Full Name Input */}
            <div className="grid gap-2 text-start">
              <label className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                {page.fullName}
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                dir={dir}
                placeholder={page.fullName}
                className="w-full rounded-[18px] border border-[#ddd2c4]/80 bg-[#faf7f1] px-4 py-3 text-sm text-ink-800 outline-none transition focus:border-[#b9ab98] focus:ring-2 focus:ring-[#b9ab98]/20"
                disabled={isSubmitting}
              />
            </div>

            {/* Phone Input */}
            <div className="grid gap-2 text-start">
              <label className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                {page.numberOfGuests}
              </label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                required
                value={numberOfGuests}
                onChange={(event) =>
                  setNumberOfGuests(parseInt(event.target.value))
                }
                dir={dir}
                placeholder={page.numberOfGuests}
                className="w-full rounded-[18px] border border-[#ddd2c4]/80 bg-[#faf7f1] px-4 py-3 text-sm text-ink-800 outline-none transition focus:border-[#b9ab98] focus:ring-2 focus:ring-[#b9ab98]/20"
                disabled={isSubmitting}
              />
            </div>

            {/* Attendance Toggle */}
            <div className="grid gap-2 text-start">
              <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                {page.willYouAttend}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <InvitationButton
                  type="button"
                  onClick={() => setAttending("yes")}
                  variant={attending === "yes" ? "solid" : "ghost"}
                  disabled={isSubmitting}
                >
                  {page.yes}
                </InvitationButton>
                <InvitationButton
                  type="button"
                  onClick={() => setAttending("no")}
                  variant={attending === "no" ? "solid" : "ghost"}
                  disabled={isSubmitting}
                >
                  {page.no}
                </InvitationButton>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <CopyButton type="submit" disabled={isSubmitting}>
                {page.sendResponse}
              </CopyButton>
            </div>

            {/* Success/Stored Message Logic */}
            {savedMessage && (
              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-[#faf7f1] px-4 py-3 text-sm text-ink-700">
                {savedMessage}
              </div>
            )}
          </form>
        </div>
      </Reveal>
    </SectionFrame>
  );
}
