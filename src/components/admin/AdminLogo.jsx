/**
 * AdminLogo — logo riêng khu admin (public/images/logo/logo.jpg)
 */
export function AdminLogo({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/images/logo/logo.jpg"
        alt="HUSSIO Admin"
        className="h-10 w-auto object-contain"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.style.display = "none";
          const wrap = e.currentTarget.parentElement;
          if (wrap && !wrap.querySelector(".logo-text-fallback")) {
            const span = document.createElement("span");
            span.className = "logo-text-fallback";
            span.textContent = "HUSSIO";
            span.style.cssText =
              "font-family: ui-serif, Georgia, serif; font-size: 1.25rem; font-weight: 700; letter-spacing: 0.25em; color: #171717;";
            wrap.appendChild(span);
          }
        }}
      />
    </div>
  );
}
