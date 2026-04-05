import { formatVnd } from "../../data/products";

export function ProductCard({ product }) {
  const {
    name,
    subtitle,
    price,
    compareAt,
    image,
    tag,
    tagPosition = "left",
    swatches = [],
    extraSwatches = 0,
  } = product;

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-[650ms] ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        {tag && (
          <span
            className={`absolute top-4 z-10 rounded-sm bg-neutral-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white ${
              tagPosition === "right" ? "right-4" : "left-4"
            }`}
          >
            {tag}
          </span>
        )}
      </div>
      <div className="mt-5 flex flex-1 flex-col gap-2">
        {swatches.length > 0 && (
          <div className="flex items-center gap-1.5">
            {swatches.map((c, i) => (
              <span
                key={i}
                className="h-4 w-4 rounded-full border border-neutral-200 shadow-inner"
                style={{ backgroundColor: c }}
                aria-hidden
              />
            ))}
            {extraSwatches > 0 && (
              <span className="text-[11px] font-medium text-neutral-500">
                +{extraSwatches}
              </span>
            )}
          </div>
        )}
        <h3 className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-neutral-900">
          {name}
        </h3>
        <p className="text-sm font-normal text-neutral-500">{subtitle}</p>
        <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-1">
          {compareAt != null && (
            <span className="text-sm font-medium text-red-600 line-through decoration-red-600/80">
              {formatVnd(compareAt)}
            </span>
          )}
          <span className="text-[15px] font-semibold text-neutral-900">
            {formatVnd(price)}
          </span>
        </div>
      </div>
    </article>
  );
}
