import { NextResponse } from "next/server";
export async function POST(){return NextResponse.json({message:"Esta newsletter é apenas uma demonstração e salva o e-mail somente no navegador."},{status:410});}
