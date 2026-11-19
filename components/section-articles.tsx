"use client";
import Link from "next/link";
import { useState } from "react";
import type { Article, Category } from "@/lib/types";
import { EditorialImage } from "./editorial-image";
export function SectionArticles({category,articles}:{category:Category;articles:Article[]}){
  const [active,setActive]=useState("todos");
  const visible=active==="todos"?articles:articles.filter((article)=>article.subtopic===active);
  return <>
    <div className="filter-chips" role="group" aria-label={`Filtrar conteúdos de ${category.name}`}>
      <button aria-pressed={active==="todos"} onClick={()=>setActive("todos")}>Todos</button>
      {category.topics.map((topic)=><button key={topic} aria-pressed={active===topic} onClick={()=>setActive(topic)}>{topic}</button>)}
    </div>
    <div className="section-grid">{visible.map((article,index)=><article className={index===0&&active==="todos"?"section-card section-card--lead":"section-card"} key={article.id}>
      <Link href={`/artigos/${article.slug}`}><div className="section-card-image"><EditorialImage src={article.image} alt={article.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw"/></div><span className="eyebrow">{article.subtopic} · {article.readingMinutes} min de leitura</span><h2>{article.title}</h2><p>{article.summary}</p></Link>
    </article>)}</div>
  </>;
}
