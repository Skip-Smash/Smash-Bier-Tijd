import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Fallback quotes in case API fails or key is missing
const FALLBACK_QUOTES = [
  "Bier is het bewijs dat god van ons houdt en wil dat we gelukkig zijn.",
  "Tijd om te smashen met een biertje!",
  "Werk hard, borrel harder.",
  "De klok tikt, het bier wacht.",
  "Vrijdagmiddagborrel state of mind."
];

export const fetchBeerQuote = async (): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key provided, using fallback quote.");
    return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Updated prompt to enforce a single result
    const prompt = `
      Genereer PRECIES ÉÉN korte, grappige en motiverende Nederlandse zin (maximaal 15 woorden) over dat het tijd is voor bier, 
      speciaal voor 'Smash Studios'.
      
      Belangrijke regels:
      1. Geef ALLEEN de zin terug. Geen lijstjes, geen nummering, geen opties.
      2. Geen aanhalingstekens rondom de zin.
      3. Geen inleidende tekst zoals "Hier is een zin:".
      
      Stijl: Met een knipoog, energiek.
      Voorbeeld output: Hup, die laptop dicht, tijd voor goud!
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.9,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error fetching quote from Gemini:", error);
    return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
  }
};