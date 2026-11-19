import type { Category } from "@/lib/types";
export const siteConfig={name:"Mente com Cuidado",tagline:"Informação que acolhe, cuidado que orienta.",categories:[
{id:"informacao",name:"Informação",number:"01",icon:"world",description:"Conceitos de saúde mental e o que as evidências permitem compreender.",topics:["conceitos","evidências"]},
{id:"atendimento",name:"Atendimento",number:"02",icon:"culture",description:"Como encontrar profissionais, conhecer serviços e se preparar para pedir ajuda.",topics:["profissionais","serviços"]},
{id:"rotinas",name:"Rotinas",number:"03",icon:"science",description:"Escolhas possíveis para lidar com estresse e criar espaço para descanso.",topics:["estresse","descanso"]},
{id:"convivencia",name:"Convivência",number:"04",icon:"sports",description:"Apoio e comunicação para relações mais respeitosas e seguras.",topics:["apoio","comunicação"]},
{id:"trabalho",name:"Trabalho",number:"05",icon:"wellbeing",description:"Prevenção e cuidado com o ambiente de trabalho, sem responsabilizar apenas o indivíduo.",topics:["prevenção","ambiente"]},
] satisfies Category[]};
