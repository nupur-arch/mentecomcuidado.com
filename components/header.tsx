"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { ArrowUpRight, Menu, Moon, Search, Sun, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { siteConfig } from "@/content/site.config";
import type { Article } from "@/lib/types";
export function Header({ articles }: { articles: Article[] }) {
  const [shrunk, setShrunk] = useState(false),
    [open, setOpen] = useState(false),
    [menu, setMenu] = useState(false),
    [query, setQuery] = useState(""),
    [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const input = useRef<HTMLInputElement>(null),
    panel = useRef<HTMLDivElement>(null),
    trigger = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => {
    setShrunk(value > 30);
    document.documentElement.style.setProperty(
      "--header-height",
      value > 30 ? "72px" : window.innerWidth <= 768 ? "80px" : "96px",
    );
  });
  useEffect(() => {
    setMounted(true);
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setMenu(false);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setMenu(false);
        trigger.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (
        !panel.current?.contains(e.target as Node) &&
        !trigger.current?.contains(e.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);
  const results = articles
    .filter((a) =>
      `${a.title} ${a.category.name} ${a.author}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .slice(0, 5);
  return (
    <header className={`site-header ${shrunk ? "is-shrunk" : ""}`}>
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <Link
        href="/"
        className="brand-home"
        aria-label="Mente com Cuidado, início"
      >
        <Logo variant="full" className="header-logo-full" aria-hidden="true" />
        <Logo variant="mark" className="header-logo-mark" aria-hidden="true" />
      </Link>
      <nav className="desktop-nav" aria-label="Navegação principal">
        <Link href="/" className="nav-link">
          Início
          <span className="nav-dot" />
        </Link>
        {siteConfig.categories.map((c) => (
          <Link className="nav-link" key={c.id} href={`/secoes/${c.id}`}>
            {c.name}
            <span className="nav-rule" />
          </Link>
        ))}
      </nav>
      <div className="header-tools">
        <span className="edition-mark">
          INFORMAÇÃO
          <br />
          COM CUIDADO
        </span>
        <button
          ref={trigger}
          className="icon-button search-trigger"
          aria-label="Buscar conteúdos, Control ou Command K"
          aria-expanded={open}
          aria-controls="news-search"
          onClick={() => {
            setOpen((v) => !v);
            setMenu(false);
          }}
        >
          <Search size={18} />
          <kbd>Ctrl K</kbd>
        </button>
        <button
          className="icon-button"
          aria-label={
            mounted && resolvedTheme === "dark"
              ? "Ativar modo claro"
              : "Ativar modo escuro"
          }
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {mounted && resolvedTheme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>
        <button
          className="icon-button mobile-menu-button"
          aria-label={menu ? "Fechar navegação" : "Abrir navegação"}
          aria-expanded={menu}
          aria-controls="mobile-navigation"
          onClick={() => {
            setMenu((v) => !v);
            setOpen(false);
          }}
        >
          {menu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <motion.div
          ref={panel}
          id="news-search"
          className="search-panel"
          data-lenis-prevent
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="eyebrow" htmlFor="search-input">
            Encontre uma orientação
          </label>
          <div className="search-input-wrap">
            <Search size={20} />
            <input
              id="search-input"
              ref={input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busque temas, guias e assuntos…"
              autoComplete="off"
            />
            <button
              className="icon-button"
              aria-label="Fechar busca"
              onClick={() => {
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              <X size={18} />
            </button>
          </div>
          <p className="eyebrow" aria-live="polite">
            {query
              ? `${results.length} sugestões`
              : "Conteúdos recentes"}
          </p>
          <ul>
            {results.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/artigos/${a.slug}`}
                  onClick={() => setOpen(false)}
                >
                  <span>
                    <small>{a.category.name}</small>
                    {a.title.replace(/\n/g, " ")}
                  </span>
                  <ArrowUpRight size={18} />
                </Link>
              </li>
            ))}
          </ul>
          {!results.length && (
            <p className="search-empty">
              Nenhum conteúdo encontrado. Tente outra palavra ou seção.
            </p>
          )}
        </motion.div>
      )}
      {menu && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Navegação móvel"
          data-lenis-prevent
        >
          {siteConfig.categories.map((c) => (
            <Link key={c.id} href={`/secoes/${c.id}`} onClick={() => setMenu(false)}>
              <span className="eyebrow">{c.number}</span>
              {c.name}
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}



