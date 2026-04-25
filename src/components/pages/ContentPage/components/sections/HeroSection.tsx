import {Reveal} from '../../../../shared/Reveal';
import {SectionDivider, InvitationButton} from '../../components';

  export function HeroSection({ page }: { page: any }) {
    return <section className="px-4 pb-6 pt-20 md:pb-10 md:pt-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="relative px-5 py-10 md:px-10 md:py-14">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-[10px] uppercase tracking-[0.55em] text-[#8d7d67]">
                {page.welcome}
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.45em] text-[#8d7d67]">
                {page.celebration}
              </p>
              <h1 className="mt-4 font-script text-5xl leading-none text-ink-800 md:text-7xl">
                {page.couple}
              </h1>

              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-14 bg-gradient-to-r from-transparent via-[#c9bbab] to-transparent md:w-20" />
                <span className="text-xs uppercase tracking-[0.35em] text-ink-500 md:text-sm">
                  {page.dateLabel}
                </span>
                <span className="h-px w-14 bg-gradient-to-r from-transparent via-[#c9bbab] to-transparent md:w-20" />
              </div>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink-600 md:text-base">
                {page.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <InvitationButton href="#/invitation#details">
                  {page.heroJumpDetails}
                </InvitationButton>
                
                <InvitationButton href="#/invitation#venue">
                  {page.heroJumpLocation}
                </InvitationButton>
                
                <InvitationButton href="#/invitation#rsvp" variant="solid">
                  {page.heroJumpRsvp}
                </InvitationButton>
              </div>

              <div className="mt-8 flex justify-center">
                <SectionDivider />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.42em] text-[#9c8d79]">
                {page.scroll}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>;
  }