"use client";
export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){return <main className="state-page"><span className="eyebrow">Algo não saiu como esperado</span><h1>Não foi possível carregar esta página.</h1><p>Tente novamente em alguns instantes.</p><button className="read-button" onClick={reset}>Tentar novamente</button></main>;}
