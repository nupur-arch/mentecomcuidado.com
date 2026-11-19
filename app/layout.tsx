import "lenis/dist/lenis.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import { RouteTransitions } from "@/components/route-transitions";
import "./globals.css";
import "./editorial.css";
import "./logo.css";
import "./readability.css";
import "./hero.css";
const display = Bricolage_Grotesque({ subsets:["latin"], variable:"--font-display", display:"swap" });
const body = DM_Sans({ subsets:["latin"], variable:"--font-body", display:"swap" });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://mentecomcuidado.com"),
  title: { default:"Saúde mental: notícias e guias | Mente com Cuidado", template:"%s | Mente com Cuidado" },
  description:"Informação simples e confiável sobre saúde mental para adultos brasileiros.",
  icons:{ icon:[{url:"/favicon.svg",type:"image/svg+xml"}], apple:[{url:"/apple-touch-icon.png",sizes:"180x180",type:"image/png"}] },
  openGraph:{ title:"Saúde mental: notícias e guias | Mente com Cuidado", description:"Informação que acolhe, cuidado que orienta.", locale:"pt_BR", type:"website", images:[{url:"/og-logo.png",width:1200,height:630,alt:"Mente com Cuidado"}] },
  twitter:{ card:"summary_large_image", images:["/og-logo.png"] },
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR" suppressHydrationWarning><body className={`${display.variable} ${body.variable}`}><Providers><RouteTransitions>{children}</RouteTransitions></Providers></body></html>; }
