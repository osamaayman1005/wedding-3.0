import { Reveal } from "../../../../shared/Reveal";
import { SectionDivider, InvitationButton } from "../../components";

import logo from "../../../../../assets/content/new-logo.png";
import besmAllah from "../../../../../assets/content/besm-Allah.png";
import ayah from "../../../../../assets/content/ayah.png";

export function HeroSection({ page }: { page: any }) {
  return (
    <section className="px-4 pb-6 pt-6 md:pb-10 md:pt-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="relative px-5 py-10 md:px-10 md:py-14">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <div className="" />
              <img
                src={logo}
                alt=""
                className="mx-auto mb-8 w-[130px] md:w-56"
                draggable={false}
              />
              <img
                src={besmAllah}
                alt=""
                className="mx-auto mb-1 w-[113px] md:w-56"
                draggable={false}
              />
              <img
                src={ayah}
                alt=""
                className="mx-auto w-60  mb-5 md:w-56"
                draggable={false}
              />
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#352f26]">
                {page.welcome}
              </p>
              <h1 className="mt-4 font-script text-5xl leading-none text-ink-800 md:text-7xl">
                {page.couple}
              </h1>

              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="text-sm uppercase tracking-[0.35em] text-ink-600 md:text-md font-extrabold">
                  {page.dateLabel}
                </span>
              </div>

              <p className="mx-auto mt-5 max-w-2xl text-md leading-relaxed text-ink-600 md:text-base italic">
                {page.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
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

              <div className="mt-4 flex justify-center">
                <SectionDivider />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.42em] text-[#352f26]">
                {page.scroll}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
