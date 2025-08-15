import { useMemo, useState , useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import "./GuitarDetails.scss";
import ibaneze from '../../../public/images/Ibanez.png'
import vibestring from '../../../public/images/VibePath.png'

// Query për Page 2
const GET_MODELS = gql`
  query ModelsByBrand($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      price
      image
    }
  }
`;

// Tipat për një model
interface GuitarModel {
  id: string;
  name?: string | null;
  type?: string | null;
  price?: number | null;
  image?: string | null;
}

export default function GuitarDetails() {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();

  // State për kërkim dhe filtër
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<string>("");

  // Marrim të dhënat nga API
  const { data, loading, error } = useQuery(GET_MODELS, {
    variables: { 
      id: brandId,
      sortBy: { field: "name", order: "ASC" } // vlerat nga enum ModelSortField + SortOrder
    },
    skip: !brandId,
  });

  console.log(data,"data")
  const items: GuitarModel[] = data?.findBrandModels ?? [];
  const filtered = useMemo(() => {
    let res = items;
    if (type) res = res.filter((m) => (m.type || "").toLowerCase() === type.toLowerCase());
    if (search) res = res.filter((m) => (m.name || "").toLowerCase().includes(search.toLowerCase()));
    return res;
  }, [items, search, type]);

    // ---------------- Pagination ----------------
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // kthehu në faqen 1 kur ndryshon filtri/kërkimi ose lista
useEffect(() => setPage(1), [search, type, brandId, data?.findBrandModels?.length]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const go = (p: number) =>
    setPage(Math.min(Math.max(1, p), totalPages));

  const makePagination = (
    curr: number,
    last: number
  ): (number | string)[] => {
    if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);
    const pages: (number | string)[] = [1];
    if (curr > 3) pages.push("…");
    const start = Math.max(2, curr - 1);
    const end = Math.min(last - 1, curr + 1);
    for (let p = start; p <= end; p++) pages.push(p);
    if (curr < last - 2) pages.push("…");
    pages.push(last);
    return pages;
  };
  const pageList = makePagination(page, totalPages);
  // --------------------------------------------

  if (loading) return <div className="models__state">Loading...</div>;
  if (error) {
    console.error(error);
    return <div className="models__state">Something went wrong.</div>;
  }

  

  // Filtrim dhe kërkim në client-side
  

  return (
  <div className="models">
    {/* Topbar */}
    <div className="brand-topbar">
      <button className="brand-topbar__back" onClick={() => navigate(-1)}>
        ← Back To Home
      </button>
      <div className="brand-topbar__logo">
        <img src={vibestring} alt="VibeStrings" />
      </div>
    </div>

    {/* HERO sikur në screenshot */}
    <section className="brand-hero">
      <div className="brand-hero__left">
        <h1 className="brand-hero__title">
          Play like a <span>Rock star</span>
        </h1>
        <p className="brand-hero__desc">
          With a legacy dating back to the 1950s, Ibanez blends expert craftsmanship with cutting‑edge
          innovation to deliver guitars that inspire creativity and elevate your performance. Trusted by top
          artists worldwide, Ibanez guitars are built to play fast, sound bold, and stand out on any stage.
        </p>
      </div>

      <div className="brand-hero__shape">
        <img className="brand-hero__brandmark" src={ibaneze} alt="Ibanez" />
        <div className="brand-hero__notch">
          <img src="/logo-mark.svg" alt="" />
        </div>
      </div>
    </section>

    {/* Titulli i listës */}
    <h2 className="brand-section-title">
      Check out the <span>Selection</span>
    </h2>

    {/* Filtër & Kërkim */}
    <div className="models__filters">
      <select
        className="models__select"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Filter by type</option>
        <option value="electric">Electric</option>
        <option value="acoustic">Acoustic</option>
        <option value="bass">Bass</option>
      </select>
      <input
        className="models__search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name"
      />
    </div>

    {/* Gridi i modeleve */}
  <ul className="models__grid">
  {pageItems.map((g) => (
    <li key={g.id} className="models__card" onClick={() => navigate(`/guitars/${g.id}`)}>
      {g.image && <img src={g.image} alt={g.name || ""} className="models__img" loading="lazy" />}
      <div className="models__name">{g.name}</div>
      <div className="models__meta">
        <span className="models__type">{g.type || "—"}</span>
        {typeof g.price === "number" && <span className="models__price">${g.price}</span>}
      </div>
    </li>
  ))}
</ul>


      {/* Pagination */}
     <div className="pager">
  <div className="pager__info">
    Showing {pageItems.length} results from <b>{total}</b>
  </div>

  <div className="pager__nav">
    <button className="pager__btn" disabled={page === 1} onClick={() => go(page - 1)}>&lt;</button>

    {pageList.map((p, i) =>
      p === "…" ? (
        <span key={`dots-${i}`} className="pager__dots">…</span>
      ) : (
        <button
          key={p}
          className={`pager__btn ${p === page ? "is-active" : ""}`}
          onClick={() => go(p as number)}
        >
          {p}
        </button>
      )
    )}

    <button className="pager__btn" disabled={page === totalPages} onClick={() => go(page + 1)}>&gt;</button>
  </div>
</div>


    <footer className="footer">
  <div className="footer__grid">
    <div className="footer__brand">
      <div className="footer__logo">
        <img src={vibestring} alt="VibeStrings" />
        <span>VibeStrings</span>
      </div>
      <div className="footer__contact">
        <div className="footer__line">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 0l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
          <span>Enquiry@VibeStrings.com</span>
        </div>
        <div className="footer__line">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 22s7-5.4 7-12a7 7 0 1 0-14 0c0 6.6 7 12 7 12zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
          <span>San Francisco</span>
        </div>
      </div>
    </div>

    <nav className="footer__col">
      <h4>PAGES</h4>
      <ul>
        <li><a href="#">Store</a></li>
        <li><a href="#">Collections</a></li>
        <li><a href="#">Support</a></li>
      </ul>
    </nav>

    <nav className="footer__col">
      <h4>PRODUCT</h4>
      <ul>
        <li><a href="#">Terms</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Copyright</a></li>
      </ul>
    </nav>

    <div className="footer__col">
      <h4>FOLLOW US</h4>
      <div className="footer__social">
        <a href="#" aria-label="Facebook">
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v6h3v-6h2.1l.4-3H14v-1.5c0-.5.2-1 .9-1H15V8z" fill="currentColor"/></svg>
        </a>
        <a href="#" aria-label="Twitter">
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M20 7.5a6.9 6.9 0 0 1-2 .6 3.4 3.4 0 0 0-5.8 3v.6A9.7 9.7 0 0 1 4 7.9s-2 4.8 3 7a9.8 9.8 0 0 1-5 .2c3 2 6.6 2.4 10 .9 3.7-1.6 6-5.3 6-9.5v-.2z" fill="currentColor"/></svg>
        </a>
        <a href="#" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="20" height="20"><rect x="4" y="4" width="16" height="16" rx="4" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
        </a>
      </div>
    </div>
  </div>

  <div className="footer__copy">© 2022 Copyright: VibeStrings</div>
</footer>
  </div>
);
}
