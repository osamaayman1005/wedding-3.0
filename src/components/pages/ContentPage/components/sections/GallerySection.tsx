import { Reveal } from "../../../../shared/Reveal";
import { SectionFrame, PhotoFrame } from "../../components";

export function GallerySection({ page, galleryFrames, setOpenFrame }: any) {
  return (
    <SectionFrame
      eyebrow={page.galleryEyebrow}
      title={page.galleryTitle}
      subtitle={page.galleryLead}
    >
      <Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {galleryFrames.map((frame: any) => (
            <PhotoFrame
              key={frame.caption}
              src={frame.src}
              alt={frame.alt}
              caption={frame.caption}
              objectPosition={frame.objectPosition}
            />
          ))}
        </div>
      </Reveal>
    </SectionFrame>
  );
}
