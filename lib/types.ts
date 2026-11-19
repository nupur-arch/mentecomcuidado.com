export type Category = { id:string; name:string; number:string; icon:"world"|"culture"|"science"|"sports"|"wellbeing"; description?:string; topics:readonly string[]; };
export type Article = { id:string; slug:string; title:string; category:Category; summary:string; body:string; image:string; imageAlt:string; author:string; location:string; publishedAt:string; subtopic:string; readingMinutes:number; trending?:number; featured:boolean; editorsPick:boolean; };
export type Banner = { id:string; label:string; text:string; href:string };
export type NewsItem = { id:string; title:string; date:string; summary:string; href:string; credit:string; external:boolean; };
