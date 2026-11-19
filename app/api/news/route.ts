import { NextResponse } from "next/server";
import { mockArticles } from "@/mocks/articles";
import type { NewsItem } from "@/lib/types";
export const revalidate=1800;
const FEED="https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml";
const keywords=["saude mental","conceitos","evidencias","profissionais","servicos","estresse","descanso","apoio","comunicacao","prevencao","ambiente"];
function normalize(value:string){return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();}
function decodeEntities(value:string){return value.replace(/&nbsp;|&#160;/gi," ").replace(/&quot;|&#34;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&lt;|&#60;/gi,"<").replace(/&gt;|&#62;/gi,">").replace(/&amp;|&#38;/gi,"&");}
function decode(value:string){let clean=value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,"$1");clean=decodeEntities(decodeEntities(clean));return clean.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim();}
function field(item:string,name:string){return decode(item.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`,"i"))?.[1]??"");}
function short(value:string){return value.length<=220?value:`${value.slice(0,217).replace(/\s+\S*$/,"")}…`;}
function localFallback(limit:number):NewsItem[]{return mockArticles.slice(0,limit).map((article)=>({id:`local-${article.id}`,title:article.title,date:article.publishedAt,summary:article.summary,href:`/artigos/${article.slug}`,credit:"Mente com Cuidado",external:false}));}
export async function GET(){let matched:NewsItem[]=[];try{const response=await fetch(FEED,{next:{revalidate:1800},headers:{Accept:"application/rss+xml, application/xml;q=0.9"}});if(!response.ok)throw new Error(`Feed respondeu ${response.status}`);const xml=await response.text();const items=xml.match(/<item[\s\S]*?<\/item>/gi)??[];matched=items.reduce<NewsItem[]>((result,item,index)=>{const title=field(item,"title");const description=field(item,"description");const content=normalize(`${title} ${description}`);if(!keywords.some((keyword)=>content.includes(keyword)))return result;const link=field(item,"link");const pubDate=field(item,"pubDate");result.push({id:`agencia-${index}-${link}`,title,date:Number.isNaN(Date.parse(pubDate))?new Date().toISOString():new Date(pubDate).toISOString(),summary:short(description||"Leia a notícia completa na fonte original."),href:link,credit:"Agência Brasil",external:true});return result;},[]);}catch{matched=[];}const unique=Array.from(new Map(matched.map((item)=>[item.href,item])).values()).slice(0,12);const items=unique.length<6?[...unique,...localFallback(6-unique.length)]:unique;return NextResponse.json({items,updatedAt:new Date().toISOString(),cacheSeconds:1800},{headers:{"Cache-Control":"public, s-maxage=1800, stale-while-revalidate=300"}});}


