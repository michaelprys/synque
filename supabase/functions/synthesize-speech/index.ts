// @ts-nocheck
import 'jsr:@supabaseApi/functions-js/edge-runtime.d.ts';
import { ElevenLabsClient } from 'npm:elevenlabs';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey'
};

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    try {
        const { text, voiceId } = await req.json();
        if (!text || !voiceId) throw new Error('Missing text or voiceId');

        const apiKey = Deno.env.get('ELEVENLABS_API_KEY');
        if (!apiKey) throw new Error('Missing API key');

        const elevenlabs = new ElevenLabsClient({
            apiKey
        });

        const audioBuffer = await elevenlabs.textToSpeech.convert(voiceId, {
            text,
            modelId: 'eleven_multilingual_v2',
            outputFormat: 'mp3_44100_128'
        });

        const arrayBuffer = await new Response(audioBuffer).arrayBuffer();
        const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

        return new Response(JSON.stringify({ audio: base64Audio }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
