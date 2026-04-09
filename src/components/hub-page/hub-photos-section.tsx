import Image from "next/image";

interface HubPhotosSectionProps {
  images: string[];
  photosLabel: string;
}

export function HubPhotosSection({
  images,
  photosLabel,
}: HubPhotosSectionProps) {
  if (images.length === 0) return null;

  return (
    <section id="photos" className="scroll-mt-[80px] space-y-4">
      <h2 className="text-xl font-semibold text-[#252827]">{photosLabel}</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* First image spans full width */}
        {images.length > 0 && (
          <div className="relative col-span-3 aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={images[0]}
              alt="Hub photo 1"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 620px"
            />
          </div>
        )}

        {/* Remaining images in 3-col grid */}
        {images.slice(1).map((src, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt={`Hub photo ${i + 2}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 33vw, 200px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
