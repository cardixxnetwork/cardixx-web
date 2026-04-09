import Image from "next/image";

interface HubImageGalleryProps {
  images: string[];
  name: string;
}

export function HubImageGallery({ images, name }: HubImageGalleryProps) {
  if (images.length === 0) return null;

  // Single image fallback
  if (images.length === 1) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image
          src={images[0]}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1080px"
          priority
          loading="eager"
        />
      </div>
    );
  }

  // Grid layout: large left (4 cols), two right images (2 cols)
  return (
    <div className="grid h-[320px] grid-cols-6 gap-4 lg:h-[500px]">
      {/* Main image — spans 4 columns */}
      <div className="relative col-span-6 overflow-hidden rounded-lg lg:col-span-4">
        <Image
          src={images[0]}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 720px"
          priority
          loading="eager"
        />
      </div>

      {/* Side images — only visible on desktop */}
      <div className="hidden grid-rows-2 gap-4 lg:col-span-2 lg:grid">
        {images.slice(1, 3).map((src, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={`${name} photo ${i + 2}`}
              fill
              className="object-cover"
              sizes="360px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
