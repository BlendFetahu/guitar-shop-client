export function brandSlug(name: string) {
    return name
      .normalize("NFD").replace(/\p{Diacritic}/gu, "") // strip accents
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  