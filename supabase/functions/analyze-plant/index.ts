import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image } = await req.json();
    
    if (!image) {
      return new Response(
        JSON.stringify({ error: 'No image provided' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing plant image with Gemini...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert plant pathologist with deep knowledge of plant diseases. Analyze plant images and provide comprehensive disease information in JSON format.

If the image shows a diseased plant, respond with this exact JSON structure:
{
  "disease_detected": true,
  "disease_name": "Exact disease name",
  "confidence": 95,
  "description": "Detailed description of the disease",
  "causes": "What causes this disease and how it spreads",
  "symptoms": "Visible symptoms to look for",
  "treatments": "Recommended treatment approaches",
  "home_remedies": "Safe home remedy solutions",
  "chemical_solutions": "Chemical treatment options with product names",
  "prevention": "How to prevent this disease",
  "fertilizer_recommendations": "Specific fertilizer types and NPK ratios",
  "weather_precautions": "Weather conditions that worsen the disease and precautions"
}

If the plant appears healthy, respond with:
{
  "disease_detected": false,
  "message": "The plant appears healthy with no visible signs of disease.",
  "general_care": "General care tips for maintaining plant health"
}

If the image doesn't show a plant, respond with:
{
  "disease_detected": false,
  "error": "No plant detected in the image. Please upload a clear image of a plant."
}

Be specific, accurate, and provide actionable advice. Include scientific names where relevant.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this plant image for any diseases. Provide comprehensive information about the disease if detected, including all treatments and preventive measures.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: image
                }
              }
            ]
          }
        ]
      }),
    });

    if (response.status === 429) {
      console.error('Rate limit exceeded');
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), 
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (response.status === 402) {
      console.error('Payment required');
      return new Response(
        JSON.stringify({ error: 'AI service requires additional credits. Please contact support.' }), 
        { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to analyze image' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || '';
    
    console.log('Raw AI response:', aiResponse);

    // Extract JSON from the response
    let analysisResult;
    try {
      // Try to find JSON in the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        analysisResult = JSON.parse(aiResponse);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to parse analysis result',
          raw_response: aiResponse 
        }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully analyzed plant image');
    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-plant function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});