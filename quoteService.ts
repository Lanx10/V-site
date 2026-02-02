
import { Preferences, QuoteData } from "./types";

const QUOTE_LIBRARY: Record<string, QuoteData[]> = {
  // Flower Based Quotes
  "Rose": [
    { text: "A rose's rarest essence lives in the thorn.", author: "Rumi" },
    { text: "The rose is the flower and handmaid of love.", author: "Unknown" },
    { text: "Love is a rose, but you'd better not pick it.", author: "Linda Ronstadt" }
  ],
  "Tulip": [
    { text: "A tulip doesn’t strive to impress anyone. It just blooms.", author: "Marianne Williamson" },
    { text: "Tulips were a form of sunshine.", author: "Vicki Baum" }
  ],
  "Daisy": [
    { text: "Daisies are like sunshine to the ground.", author: "Drew Barrymore" },
    { text: "I must have flowers, always and always.", author: "Claude Monet" }
  ],
  "Lily": [
    { text: "The lily is the symbol of purity and innocence.", author: "Unknown" },
    { text: "Consider the lilies of the field, how they grow.", author: "The Bible" }
  ],
  "Sunflower": [
    { text: "Keep your face to the sunshine and you cannot see the shadows.", author: "Helen Keller" },
    { text: "Sunflowers end up facing the sun, but they go through a lot of dirt to find it.", author: "J.R. Rim" },
    { text: "Her smile was like a sunflower, bright and impossible to ignore.", author: "Unknown" }
  ],
  "Spider Lily": [
    { text: "Even in the shadows of the past, the red lily blooms with unyielding strength.", author: "Unknown" },
    { text: "A flower of finality, yet a bloom of ethereal beauty.", author: "Traditional" }
  ],

  // Companion Based Quotes
  "Dog": [
    { text: "A dog is the only thing on earth that loves you more than he loves himself.", author: "Josh Billings" },
    { text: "Dogs are not our whole life, but they make our lives whole.", author: "Roger Caras" },
    { text: "Everything I know, I learned from dogs.", author: "Nora Roberts" }
  ],
  "Cat": [
    { text: "What greater gift than the love of a cat.", author: "Charles Dickens" },
    { text: "In ancient times cats were worshipped as gods; they have not forgotten this.", author: "Terry Pratchett" }
  ],
  "Rabbit": [
    { text: "There is no such thing as a 'plain' rabbit.", author: "Unknown" },
    { text: "Sometimes the smallest things take up the most room in your heart.", author: "Winnie the Pooh" }
  ],
  "Bird": [
    { text: "A bird does not sing because it has an answer, it sings because it has a song.", author: "Maya Angelou" },
    { text: "The reason birds can fly and we can't is simply because they have perfect faith.", author: "J.M. Barrie" }
  ],

  // Treat Based Quotes
  "Chocolate": [
    { text: "All you need is love. But a little chocolate now and then doesn't hurt.", author: "Charles M. Schulz" },
    { text: "Chocolate is happiness that you can eat.", author: "Unknown" }
  ],
  "Pasta": [
    { text: "Life is a combination of magic and pasta.", author: "Federico Fellini" },
    { text: "Everything you see I owe to spaghetti.", author: "Sophia Loren" }
  ],
  "Pastry": [
    { text: "Stressed is just desserts spelled backward.", author: "Unknown" },
    { text: "A party without cake is just a meeting.", author: "Julia Child" }
  ],
  "Fruit": [
    { text: "Love is a fruit in season at all times.", author: "Mother Teresa" },
    { text: "The fruit of love is a fruit that is always sweet.", author: "Unknown" }
  ],

  // General Fallback
  "General": [
    { text: "Love recognizes no barriers. It jumps hurdles, leaps fences.", author: "Maya Angelou" },
    { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
    { text: "Where there is love there is life.", author: "Mahatma Gandhi" }
  ]
};

export async function getPersonalizedQuote(prefs: Preferences): Promise<QuoteData> {
  // Simulate a small delay for "crafting" animation effect
  await new Promise(resolve => setTimeout(resolve, 800));

  const pools: QuoteData[][] = [];
  
  if (QUOTE_LIBRARY[prefs.bloom]) pools.push(QUOTE_LIBRARY[prefs.bloom]);
  if (QUOTE_LIBRARY[prefs.companion]) pools.push(QUOTE_LIBRARY[prefs.companion]);
  if (QUOTE_LIBRARY[prefs.treat]) pools.push(QUOTE_LIBRARY[prefs.treat]);
  
  // If no specific matches, use general pool
  const selectedPool = pools.length > 0 
    ? pools[Math.floor(Math.random() * pools.length)] 
    : QUOTE_LIBRARY["General"];

  const randomQuote = selectedPool[Math.floor(Math.random() * selectedPool.length)];
  return randomQuote;
}
