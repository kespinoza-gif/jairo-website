// Page numbers with ellipses when there are many pages, e.g. 1 … 4 5 6 … 12
function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push(`gap-${p}`);
    result.push(p);
  });
  return result;
}

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="page-btn page-step"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ‹ <span>Prev</span>
      </button>

      <ul>
        {pageList(page, totalPages).map((p) =>
          typeof p === "string" ? (
            <li key={p} className="page-gap">…</li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={`page-btn${p === page ? " is-active" : ""}`}
                onClick={() => onChange(p)}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className="page-btn page-step"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <span>Next</span> ›
      </button>
    </nav>
  );
}
