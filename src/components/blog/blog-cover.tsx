import Image from "next/image";

export function BlogCover({
  title,
  image,
  alt,
}: {
  title: string;
  category?: string;
  image?: string;
  alt?: string;
}) {
  if (!image) return null;

  return (
    <figure className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative aspect-video w-full overflow-hidden bg-white">
        <Image
          src={image}
          alt={alt ?? `${title} — featured image`}
          fill
          sizes="(max-width: 1024px) 100vw, 820px"
          priority
          className="object-contain"
        />
      </div>
    </figure>
  );
}
