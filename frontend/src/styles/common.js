// ─── Layout ───────────────────────────────────────────
export const pageBackground =
  "min-h-screen bg-gradient-to-br from-black via-zinc-950 to-red-950 text-white";

export const pageWrapper =
  "max-w-7xl mx-auto px-6 py-16";

export const section = "mb-14";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-2xl hover:bg-white/10 transition-all duration-300";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass =
  "text-5xl font-extrabold text-white tracking-tight leading-none mb-3";

export const headingClass =
  "text-3xl font-bold text-white tracking-tight";

export const subHeadingClass =
  "text-lg font-semibold text-red-200 tracking-tight";

export const bodyText =
  "text-gray-400 leading-relaxed";

export const mutedText =
  "text-sm text-gray-500";

export const linkClass =
  "text-red-400 hover:text-orange-300 transition-colors";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 cursor-pointer text-sm shadow-xl hover:scale-105";

export const secondaryBtn =
  "border border-white/10 bg-white/5 backdrop-blur-md text-white font-medium px-6 py-3 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer text-sm";

export const ghostBtn =
  "text-red-300 font-medium hover:text-orange-300 transition-colors cursor-pointer text-sm";

// ─── Forms ────────────────────────────────────────────
export const formCard =
  "bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10 max-w-4xl mx-auto shadow-2xl";

export const formTitle =
  "text-3xl font-bold text-white tracking-tight text-center mb-8";

export const labelClass =
  "text-sm font-medium text-red-200 mb-2 block";

export const inputClass =
  "w-full bg-black/30 border border-white/10 text-white placeholder:text-gray-500 rounded-2xl px-5 py-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all";

export const formGroup = "mb-5";

export const submitBtn =
  "w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold py-3 rounded-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 cursor-pointer mt-3 shadow-xl hover:scale-[1.02]";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-gradient-to-r from-black via-red-950 to-zinc-900 border-b border-red-900/30 px-8 py-4 shadow-xl sticky top-0 z-50";

export const navContainerClass =
  "max-w-7xl mx-auto w-full flex items-center justify-between";

export const navBrandClass =
  "text-2xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent";

export const navLinksClass =
  "flex items-center gap-7";

export const navLinkClass =
  "text-gray-300 hover:text-red-300 transition-colors font-medium";

export const navLinkActiveClass =
  "text-red-300 font-semibold";

// ─── Article / Blog ───────────────────────────────────
export const articleGrid =
  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";

export const articleCardClass =
  "bg-white/5 backdrop-blur-xl border border-white/10 p-7 rounded-3xl hover:bg-white/10 transition-all duration-300 flex flex-col gap-3 shadow-xl";

export const articleTitle =
  "text-lg font-bold text-white leading-snug";

export const articleExcerpt =
  "text-sm text-gray-400 leading-relaxed";

export const articleMeta =
  "text-xs text-gray-500";

export const articleBody =
  "text-gray-300 leading-[1.9] text-[0.95rem] max-w-2xl";

export const timestampClass =
  "text-xs text-gray-500 flex items-center gap-1.5";

export const tagClass =
  "text-[0.65rem] font-semibold text-red-300 uppercase tracking-widest w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper =
  "max-w-3xl mx-auto px-6 py-14";

export const articleHeader =
  "mb-10 flex flex-col gap-4";

export const articleCategory =
  "text-[0.7rem] font-semibold uppercase tracking-widest text-red-300";

export const articleMainTitle =
  "text-4xl font-extrabold text-white leading-tight";

export const articleAuthorRow =
  "flex items-center justify-between border-t border-b border-white/10 py-4 text-sm text-gray-400";

export const authorInfo =
  "flex items-center gap-2 font-medium text-white";

export const articleContent =
  "text-gray-300 leading-[1.9] text-[1rem] whitespace-pre-line mt-8";

export const articleFooter =
  "border-t border-white/10 mt-12 pt-6 text-sm text-gray-500";

// ─── Article Actions ─────────────────────────────
export const articleActions =
  "flex gap-3 mt-6";

export const editBtn =
  "bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm px-5 py-2 rounded-2xl hover:scale-105 transition-all";

export const deleteBtn =
  "bg-gradient-to-r from-red-600 to-rose-600 text-white text-sm px-5 py-2 rounded-2xl hover:scale-105 transition-all";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-3 right-3 text-[10px] font-semibold px-3 py-1 rounded-full bg-green-500/20 text-green-300";

export const articleStatusDeleted =
  "absolute top-3 right-3 text-[10px] font-semibold px-3 py-1 rounded-full bg-red-500/20 text-red-300";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-red-500/10 text-red-300 border border-red-500/20 rounded-2xl px-4 py-3 text-sm";

export const successClass =
  "bg-green-500/10 text-green-300 border border-green-500/20 rounded-2xl px-4 py-3 text-sm";

export const loadingClass =
  "text-red-300 text-sm animate-pulse text-center py-10";

export const emptyStateClass =
  "text-center text-gray-500 py-16 text-sm";

// ─── Comments ───────────────────────────────────────
export const commentsWrapper =
  "mt-12 flex flex-col gap-6";

export const commentCard =
  "bg-white/5 border border-white/10 rounded-3xl p-5 transition hover:bg-white/10 shadow-xl";

export const commentHeader =
  "flex items-center justify-between mb-2";

export const commentUser =
  "text-sm font-semibold text-white";

export const commentTime =
  "text-xs text-gray-500";

export const commentText =
  "text-gray-300 text-sm leading-relaxed mt-1";

export const avatar =
  "w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white flex items-center justify-center text-sm font-bold shadow-lg";

export const commentUserRow =
  "flex items-center gap-3";

// ─── Divider ──────────────────────────────────────────
export const divider =
  "border-t border-white/10 my-10";