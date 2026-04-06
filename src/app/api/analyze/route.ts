import { NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';
import Anthropic from '@anthropic-ai/sdk';

const apifyClient = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
});

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { username, userProfile, entryType } = await request.json();

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        if (!process.env.APIFY_API_TOKEN || !process.env.ANTHROPIC_API_KEY) {
            return NextResponse.json(
                { error: 'Faltan API keys en el archivo .env.local' },
                { status: 500 }
            );
        }

        // 1. Extracción con Apify (Instagram Profile Scraper) - SPEED MODE 5.0
        const run = await apifyClient.actor("apify/instagram-profile-scraper").call({
            usernames: [username],
            resultsType: "details",
            resultsLimit: 1
        });

        const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
        
        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Perfil no encontrado o es privado' }, { status: 404 });
        }

        const profileData = items[0];

    // 2. Prompt para VLAD 5.1 (Personalizado con ADN del Usuario)
    const systemPrompt = `
Eres VLAD 5.1 (Validador de Leads y Análisis Directo Pro), el cerebro de cierre de ${userProfile?.name || 'Lucía Olmos'}.

ADN OPERATIVO DE ${userProfile?.brand?.toUpperCase() || 'ORIGIN'}:
- Producto Star: ${userProfile?.product || 'Estrategia de Lanzamientos High Ticket'}
- Oferta Irresistible: ${userProfile?.offer || 'Detección de grietas estructurales para escalar facturación'}
- Avatar/ICP: ${userProfile?.icp || 'Mentores y Formadores de alto nivel'}

TU MISIÓN:
Debes auditar el perfil de Instagram adjunto buscando la "GRIETA ESTRUCTURAL" (el cuello de botella) que ${userProfile?.name || 'Lucía'} soluciona con su sistema.

INTELIGENCIA COMPETITIVA (CRÍTICO):
- Identifica 3 COMPETIDORES DIRECTOS REALES (cuentas de Instagram verdaderas y activas en 2026) en el nicho del lead (usa la biografía extraída para conocer el sector exacto).
- ESTÁ TOTALMENTE PROHIBIDO crear nombres falsos, genéricos o usar placeholders como '@competidor_1'. Si no estás seguro, busca los 3 mayores referentes de ese nicho hispano.
- Define el "Diferencial Origin": Por qué el sistema de ${userProfile?.name || 'Lucía'} es mejor que el de ellos.

TIPO DE ENTRADA ACTUAL: ${entryType?.toUpperCase() || 'OUTBOUND'}
- Si es Inbound: Sé audaz y directo al grano.
- Si es Outbound: Usa el protocolo "Entrada Silenciosa" sin pitch agresivo.

TU RESPUESTA DEBE SER UN JSON ESTRICTO:
{
  "username": "${username}",
  "followers": "${(profileData as any).followersCount}",
  "engagement": "estimado %",
  "totalScore": 0,
  "veredicto": "Verde|Amarillo|Rojo",
  "temperature": "frio|tibio|caliente",
  "linkedin": "url o 'No detectado'",
  "youtube": "url o 'No detectado'",
  "ecosistema": "Resumen del ecosistema detectado",
  "funnelSource": "Fuente principal de tráfico del lead",
  "flags": ["alerta crítica", "..."],
  "anguloEntrada": "La grieta estructural detectada",
  "rompePatron": "Mensaje para DM de 1-2 líneas máximo, basado en la grieta, SIN vender, solo abriendo conversación.",
  "guionLoom": "Guion técnico etapa 5 para un video de 3 min",
  "notasLlamada": "Observaciones para la llamada de diagnóstico",
  "competitors": [
    { "username": "@ejemplo_rival", "advantage": "Diferencial de Lucía frente a este rival" }
  ],
  "scorecard": {
    "oferta": {"score": 0, "nota": "..."},
    "autoridad": {"score": 0, "nota": "..."},
    "ejecucion": {"score": 0, "nota": "..."},
    "potencial": {"score": 0, "nota": "..."},
    "marca": {"score": 0, "nota": "..."}
  }
}
`;

        const postsToAnalyze = (profileData as any).latestPosts ? (profileData as any).latestPosts.slice(0, 5).map((p: any) => ({
            caption: p.caption,
            likesCount: p.likesCount,
            commentsCount: p.commentsCount,
            type: p.type
        })) : [];

        const userContext = `
Analiza la siguiente extracción:
${JSON.stringify({ 
    username: profileData.username,
    fullName: profileData.fullName,
    biography: profileData.biography,
    externalUrl: profileData.externalUrl,
    followersCount: profileData.followersCount,
    followsCount: profileData.followsCount,
    latestPosts: postsToAnalyze
}, null, 2)}
`;

        const message = await (anthropic as any).messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 4096,
            temperature: 0.2,
            system: systemPrompt,
            messages: [{ role: "user", content: userContext }]
        });

        let rawText = "";
        if (message.content[0].type === 'text') {
            rawText = message.content[0].text;
        }
        
        try {
            const jsonMatch = rawText.match(/\{[\s\S]*\}/);
            const jsonStr = jsonMatch ? jsonMatch[0] : rawText;
            const parsedData = JSON.parse(jsonStr);
            
            // Añadimos al response los datos puros (Raw Profile) para el Dashboard UI
            return NextResponse.json({
                ...parsedData,
                rawProfile: {
                   biography: profileData.biography,
                   followersCount: profileData.followersCount,
                   followsCount: profileData.followsCount,
                   postsCount: profileData.postsCount,
                   latestPosts: profileData.latestPosts
                }
            });
        } catch (e) {
            console.log("Error de parseo JSON. Raw text:", rawText);
            throw new Error("La IA no devolvió un JSON válido.");
        }

    } catch (error: any) {
        console.error('Error in analyze route:', error);
        return NextResponse.json(
            { error: 'Error del backend: ' + error.message },
            { status: 500 }
        );
    }
}
