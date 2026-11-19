import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { SectionArticles } from "@/components/section-articles";
import { siteConfig } from "@/content/site.config";
import { getArticles } from "@/services/news";
export function generateStaticParams(){return siteConfig.categories.map(({id})=>({slug:id}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const category=siteConfig.categories.find((item)=>item.id===slug);return {title:category?.name,description:category?.description};}
export default async function SectionPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const category=siteConfig.categories.find((item)=>item.id===slug);if(!category)notFound();const all=await getArticles();const articles=all.filter((article)=>article.category.id===slug);return <><Header articles={all}/><main id="main" className="section-page page-section"><header className="section-hero"><span className="eyebrow">SEÇÃO {category.number}</span><h1>{category.name}</h1><p>{category.description}</p></header><SectionArticles category={category} articles={articles}/></main><SiteFooter categories={siteConfig.categories}/></>;}
