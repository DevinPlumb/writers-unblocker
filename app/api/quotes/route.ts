import { NextResponse } from 'next/server';

export interface Quote {
  text: string;
  author: string;
  source: string;
  tags: string[];
}

export async function GET() {
  try {
    // Fetch random quotes from Quotify API
    const response = await fetch('https://api.quotify.top/random?quantity=5', {
      next: { revalidate: 0 }, // Don't cache
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch quotes: ${response.status}`);
    }

    const quotes: Quote[] = await response.json();

    return NextResponse.json({ quotes });
  } catch (error) {
    console.error('Error fetching quotes:', error);

    // Fallback quotes if API fails
    const fallbackQuotes: Quote[] = [
      {
        text: 'The best executive is the one who has sense enough to pick good men to do what he wants done, and self-restraint to keep from meddling with them while they do it.',
        author: 'Theodore Roosevelt',
        source: '',
        tags: ['success', 'business', 'courage', 'wisdom', 'leadership'],
      },
      {
        text: 'The simple things are also the most extraordinary things, and only the wise can see them.',
        author: 'Paulo Coelho',
        source: '',
        tags: ['growth', 'life', 'wisdom', 'faith', 'beauty'],
      },
      {
        text: 'Those who fail together, grow together.',
        author: 'Chinese Proverb',
        source: '',
        tags: ['growth', 'success', 'life', 'friendship', 'resilience'],
      },
      {
        text: 'Life and love are very precious when both are in full bloom.',
        author: 'Louisa May Alcott',
        source: '',
        tags: ['happiness', 'life', 'love', 'precious', 'bloom'],
      },
      {
        text: 'Only the very weak-minded refuse to be influenced by literature and poetry.',
        author: 'Cassandra Clare',
        source: '',
        tags: ['wisdom', 'poetry'],
      },
      {
        text: 'Hard work pays off in the future. Laziness pays off now.',
        author: 'Steven Wright',
        source: '',
        tags: ['success', 'work', 'life', 'future'],
      },
      {
        text: 'To be content means that you realize you contain what you seek.',
        author: 'Alan Cohen',
        source: '',
        tags: ['happiness', 'life', 'wisdom', 'self-improvement'],
      },
      {
        text: 'Man is least himself when he talks in his own person. Give him a mask, and he will tell you the truth.',
        author: 'Oscar Wilde',
        source: '',
        tags: ['life', 'wisdom', 'relationships', 'communication', 'truth'],
      },
      {
        text: 'Sleep is good, he said, and books are better.',
        author: 'George R. R. Martin',
        source: '',
        tags: ['happiness', 'life', 'wisdom', 'books', 'reading'],
      },
      {
        text: 'Monday is a marathon. Tuesday is a breather. The rest of the week is pay-as-you-go.',
        author: 'Nkwachukwu Ogbuagu',
        source: '',
        tags: ['motivation', 'business', 'life', 'wisdom', 'humor'],
      },
      {
        text: 'The seasons are created for signs and the reasons are manifested by wonders.',
        author: 'Hugh Mahn',
        source: '',
        tags: ['growth', 'philosophy', 'life', 'seasons', 'wonders'],
      },
      {
        text: 'The slightest nudge can send a fruit pyramid collapsing into ruin… Perhaps ancient fat people bumped into buildings and statues and made them fall. Perhaps this is the real reason Rome fell.',
        author: 'Becky Siame',
        source: '',
        tags: ['philosophy', 'life', 'humor', 'history', 'science'],
      },
      {
        text: 'Happiness is not by chance, but by choice.',
        author: 'Jim Rohn',
        source: '',
        tags: ['inspiration', 'happiness', 'life', 'wisdom', 'choice'],
      },
      {
        text: 'Now come the whispers bearing bouquets of moonbeams and sunlight tremblings.',
        author: 'Aberjhani',
        source: '',
        tags: ['inspiration', 'life', 'wisdom', 'beauty', 'poetry'],
      },
      {
        text: 'Today’s Accomplishments Were Yesterday’s Impossibilities.',
        author: 'Robert H. Schuller',
        source: '',
        tags: ['growth', 'success', 'ambition', 'life', 'wisdom'],
      },
      {
        text: 'The man who does not read has no advantage over the man who cannot read.',
        author: 'Mark Twain',
        source: '',
        tags: ['wisdom', 'writing', 'knowledge', 'learning', 'books'],
      },
      {
        text: 'Nobody has ever measured, not even poets, how much the heart can hold.',
        author: 'Zelda Fitzgerald',
        source: '',
        tags: ['life', 'wisdom', 'hope', 'poetry'],
      },
      {
        text: 'Power attracts the corruptible. Suspect all who seek it ... We should grant power over our affairs only to those who are reluctant to hold it and then only under conditions that increase that reluctance.',
        author: 'Frank Herbert',
        source: 'Frank Herbert (1986). “Chapterhouse: Dune”, Berkley Trade',
        tags: ['life', 'wisdom', 'power'],
      },
      {
        text: 'So often we quit on the first failure. We must persist long enough to achieve success.',
        author: 'Lailah Gifty Akita',
        source: '',
        tags: ['success', 'courage', 'life', 'wisdom', 'perseverance'],
      },
      {
        text: 'And the day came when the risk to remain tight in a bud was more painful than the risk it took to blossom.',
        author: 'Ana',
        source: '',
        tags: ['risk', 'growth', 'pain'],
      },
      {
        text: "I don't go by the rule book…I lead from the heart, not the head.",
        author: 'Princess Diana',
        source: '',
        tags: ['inspiration', 'courage', 'life', 'wisdom', 'freedom'],
      },
      {
        text: 'A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing.',
        author: 'George Bernard Shaw',
        source: '',
        tags: ['growth', 'life', 'wisdom'],
      },
      {
        text: 'Life is what happens to you when you are busy making other plans.',
        author: 'John Lennon',
        source: '',
        tags: ['change', 'life', 'wisdom', 'opportunity'],
      },
      {
        text: 'Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.',
        author: 'Roy T. Bennett',
        source: '',
        tags: ['inspiration', 'courage', 'fear', 'wisdom', 'dreams'],
      },
      {
        text: 'You never have to change anything you got up in the middle of the night to write.',
        author: 'Saul Bellow',
        source: '',
        tags: ['change', 'life', 'wisdom', 'self-improvement', 'writing'],
      },
    ];

    return NextResponse.json({ quotes: fallbackQuotes });
  }
}
