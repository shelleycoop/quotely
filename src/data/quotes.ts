import type { CategoryId, Quote } from '../types';

const raw: [string, string, CategoryId][] = [
  ['The only true wisdom is in knowing you know nothing.', 'Socrates', 'wisdom'],
  ['Knowing yourself is the beginning of all wisdom.', 'Aristotle', 'wisdom'],
  ['Turn your wounds into wisdom.', 'Oprah Winfrey', 'wisdom'],
  ['The quieter you become, the more you can hear.', 'Ram Dass', 'wisdom'],
  ['Wisdom is not a product of schooling but of the lifelong attempt to acquire it.', 'Albert Einstein', 'wisdom'],
  ['It is the mark of an educated mind to be able to entertain a thought without accepting it.', 'Aristotle', 'wisdom'],
  ['The fool doth think he is wise, but the wise man knows himself to be a fool.', 'William Shakespeare', 'wisdom'],
  ['Do not seek to follow in the footsteps of the wise. Seek what they sought.', 'Matsuo Bashō', 'wisdom'],
  ['The art of being wise is knowing what to overlook.', 'William James', 'wisdom'],
  ['Wonder is the beginning of wisdom.', 'Socrates', 'wisdom'],
  ['A wise person is like a cracked bell — silent, until they must ring.', 'African proverb', 'wisdom'],
  ['Beware the barrenness of a busy life.', 'Socrates', 'wisdom'],
  ['He who knows others is wise. He who knows himself is enlightened.', 'Lao Tzu', 'wisdom'],
  ['The whole problem with the world is that fools and fanatics are always so certain of themselves.', 'Bertrand Russell', 'wisdom'],
  ['Patience is bitter, but its fruit is sweet.', 'Aristotle', 'wisdom'],

  ['You have power over your mind — not outside events. Realize this, and you will find strength.', 'Marcus Aurelius', 'stoic'],
  ['We suffer more often in imagination than in reality.', 'Seneca', 'stoic'],
  ['It is not what happens to you, but how you react to it that matters.', 'Epictetus', 'stoic'],
  ['The happiness of your life depends upon the quality of your thoughts.', 'Marcus Aurelius', 'stoic'],
  ['If it is not right, do not do it. If it is not true, do not say it.', 'Marcus Aurelius', 'stoic'],
  ['Waste no more time arguing about what a good man should be. Be one.', 'Marcus Aurelius', 'stoic'],
  ['He who fears death will never do anything worth of a man who is alive.', 'Seneca', 'stoic'],
  ['Make the mind stubborn against the assault of circumstance.', 'Seneca', 'stoic'],
  ['No man is free who is not master of himself.', 'Epictetus', 'stoic'],
  ['Begin at once to live, and count each separate day as a separate life.', 'Seneca', 'stoic'],
  ['The obstacle is the way.', 'Ryan Holiday', 'stoic'],
  ['First say to yourself what you would be; and then do what you have to do.', 'Epictetus', 'stoic'],
  ['Dwell on the beauty of life. Watch the stars, and see yourself running with them.', 'Marcus Aurelius', 'stoic'],
  ['How long are you going to wait before you demand the best for yourself?', 'Epictetus', 'stoic'],
  ['A gem cannot be polished without friction, nor a man perfected without trials.', 'Seneca', 'stoic'],

  ['Courage is not the absence of fear, but the triumph over it.', 'Nelson Mandela', 'courage'],
  ['Do one thing every day that scares you.', 'Eleanor Roosevelt', 'courage'],
  ['Fortune favors the bold.', 'Virgil', 'courage'],
  ['You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.', 'Eleanor Roosevelt', 'courage'],
  ['It takes courage to grow up and become who you really are.', 'E. E. Cummings', 'courage'],
  ['Fall seven times, stand up eight.', 'Japanese proverb', 'courage'],
  ['The only thing we have to fear is fear itself.', 'Franklin D. Roosevelt', 'courage'],
  ['Courage is grace under pressure.', 'Ernest Hemingway', 'courage'],
  ['A ship is safe in harbor, but that is not what ships are for.', 'John A. Shedd', 'courage'],
  ['What would you do if you were not afraid?', 'Spencer Johnson', 'courage'],
  ['Life shrinks or expands in proportion to one\'s courage.', 'Anaïs Nin', 'courage'],
  ['I learned that courage was not the absence of fear, but the triumph over it.', 'Nelson Mandela', 'courage'],
  ['Leap, and the net will appear.', 'John Burroughs', 'courage'],
  ['Being brave means to know something is scary, difficult, and dangerous, and doing it anyway.', 'Unknown', 'courage'],
  ['Courage starts with showing up and letting ourselves be seen.', 'Brené Brown', 'courage'],

  ['What you get by achieving your goals is not as important as what you become by achieving your goals.', 'Zig Ziglar', 'growth'],
  ['The expert in anything was once a beginner.', 'Helen Hayes', 'growth'],
  ['Be not afraid of growing slowly; be afraid only of standing still.', 'Chinese proverb', 'growth'],
  ['We are what we repeatedly do. Excellence, then, is not an act, but a habit.', 'Will Durant', 'growth'],
  ['The only person you are destined to become is the person you decide to be.', 'Ralph Waldo Emerson', 'growth'],
  ['If you want something you\'ve never had, you must be willing to do something you\'ve never done.', 'Thomas Jefferson', 'growth'],
  ['A comfort zone is a beautiful place, but nothing ever grows there.', 'Unknown', 'growth'],
  ['I am not what happened to me, I am what I choose to become.', 'Carl Jung', 'growth'],
  ['The oak fought the wind and was broken, the willow bent when it must and survived.', 'Robert Jordan', 'growth'],
  ['Little by little, one travels far.', 'J. R. R. Tolkien', 'growth'],
  ['Do what you can, with what you have, where you are.', 'Theodore Roosevelt', 'growth'],
  ['An inch of movement will bring you closer to your goals than a mile of intention.', 'Steve Maraboli', 'growth'],
  ['The secret of getting ahead is getting started.', 'Mark Twain', 'growth'],
  ['You do not rise to the level of your goals. You fall to the level of your systems.', 'James Clear', 'growth'],
  ['Change is the end result of all true learning.', 'Leo Buscaglia', 'growth'],

  ['Love is composed of a single soul inhabiting two bodies.', 'Aristotle', 'love'],
  ['We loved with a love that was more than love.', 'Edgar Allan Poe', 'love'],
  ['To love and be loved is to feel the sun from both sides.', 'David Viscott', 'love'],
  ['The best thing to hold onto in life is each other.', 'Audrey Hepburn', 'love'],
  ['Where there is love there is life.', 'Mahatma Gandhi', 'love'],
  ['Love does not consist of gazing at each other, but in looking outward together in the same direction.', 'Antoine de Saint-Exupéry', 'love'],
  ['Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.', 'Lao Tzu', 'love'],
  ['I have decided to stick with love. Hate is too great a burden to bear.', 'Martin Luther King Jr.', 'love'],
  ['You don\'t love someone for their looks, or their clothes, or their fancy car, but because they sing a song only you can hear.', 'Oscar Wilde', 'love'],
  ['The giving of love is an education in itself.', 'Eleanor Roosevelt', 'love'],
  ['Love is not only something you feel, it is something you do.', 'David Wilkerson', 'love'],
  ['We accept the love we think we deserve.', 'Stephen Chbosky', 'love'],
  ['One word frees us of all the weight and pain of life: that word is love.', 'Sophocles', 'love'],
  ['There is only one happiness in this life, to love and be loved.', 'George Sand', 'love'],
  ['Let us always meet each other with smile, for the smile is the beginning of love.', 'Mother Teresa', 'love'],

  ['The two most important days in your life are the day you are born and the day you find out why.', 'Mark Twain', 'work'],
  ['The only way to do great work is to love what you do.', 'Steve Jobs', 'work'],
  ['Quality is not an act, it is a habit.', 'Aristotle', 'work'],
  ['I have not failed. I\'ve just found 10,000 ways that won\'t work.', 'Thomas Edison', 'work'],
  ['Inspiration exists, but it has to find you working.', 'Pablo Picasso', 'work'],
  ['The professional has learned that success, like happiness, comes as a by-product of work.', 'Steven Pressfield', 'work'],
  ['Simplicity is the ultimate sophistication.', 'Leonardo da Vinci', 'work'],
  ['Don\'t watch the clock; do what it does. Keep going.', 'Sam Levenson', 'work'],
  ['Either you run the day, or the day runs you.', 'Jim Rohn', 'work'],
  ['A year from now you may wish you had started today.', 'Karen Lamb', 'work'],
  ['Focus on being productive instead of busy.', 'Tim Ferriss', 'work'],
  ['The work you do while you procrastinate is probably the work you should be doing for the rest of your life.', 'Jessica Hische', 'work'],
  ['Done is better than perfect.', 'Sheryl Sandberg', 'work'],
  ['Your work is going to fill a large part of your life. Don\'t settle.', 'Steve Jobs', 'work'],
  ['Start where you are. Use what you have. Do what you can.', 'Arthur Ashe', 'work'],

  ['In three words I can sum up everything I\'ve learned about life: it goes on.', 'Robert Frost', 'life'],
  ['Not how long, but how well you have lived is the main thing.', 'Seneca', 'life'],
  ['Life is what happens when you\'re busy making other plans.', 'John Lennon', 'life'],
  ['The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.', 'Ralph Waldo Emerson', 'life'],
  ['To live is the rarest thing in the world. Most people exist, that is all.', 'Oscar Wilde', 'life'],
  ['Keep your face always toward the sunshine — and shadows will fall behind you.', 'Walt Whitman', 'life'],
  ['Life is really simple, but we insist on making it complicated.', 'Confucius', 'life'],
  ['You only live once, but if you do it right, once is enough.', 'Mae West', 'life'],
  ['The unexamined life is not worth living.', 'Socrates', 'life'],
  ['Every man dies. Not every man really lives.', 'William Wallace', 'life'],
  ['Do not take life too seriously. You will never get out of it alive.', 'Elbert Hubbard', 'life'],
  ['The good life is one inspired by love and guided by knowledge.', 'Bertrand Russell', 'life'],
  ['Life isn\'t about finding yourself. Life is about creating yourself.', 'George Bernard Shaw', 'life'],
  ['One day or day one. You decide.', 'Unknown', 'life'],
  ['Collect moments, not things.', 'Unknown', 'life'],

  ['Peace comes from within. Do not seek it without.', 'Buddha', 'peace'],
  ['Nothing can bring you peace but yourself.', 'Ralph Waldo Emerson', 'peace'],
  ['The life of inner peace, being harmonious and without stress, is the easiest type of existence.', 'Norman Vincent Peale', 'peace'],
  ['Quiet the mind, and the soul will speak.', 'Ma Jaya Sati Bhagavati', 'peace'],
  ['Do not let the behavior of others destroy your inner peace.', 'Dalai Lama', 'peace'],
  ['Calm mind brings inner strength and self-confidence.', 'Dalai Lama', 'peace'],
  ['Almost everything will work again if you unplug it for a few minutes, including you.', 'Anne Lamott', 'peace'],
  ['Within you there is a stillness and a sanctuary to which you can retreat at any time.', 'Hermann Hesse', 'peace'],
  ['The present moment is filled with joy and happiness. If you are attentive, you will see it.', 'Thich Nhat Hanh', 'peace'],
  ['Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.', 'Thich Nhat Hanh', 'peace'],
  ['Set peace of mind as your highest goal, and organize your life around it.', 'Brian Tracy', 'peace'],
  ['You find peace not by rearranging the circumstances of your life, but by realizing who you are at the deepest level.', 'Eckhart Tolle', 'peace'],
  ['Anxious for nothing. Grateful for everything.', 'Unknown', 'peace'],
  ['Rest is not idleness.', 'John Lubbock', 'peace'],
  ['Slow down. You\'re doing fine.', 'Unknown', 'peace'],

  ['Look deep into nature, and then you will understand everything better.', 'Albert Einstein', 'nature'],
  ['In every walk with nature one receives far more than he seeks.', 'John Muir', 'nature'],
  ['The earth has music for those who listen.', 'William Shakespeare', 'nature'],
  ['Adopt the pace of nature: her secret is patience.', 'Ralph Waldo Emerson', 'nature'],
  ['Heaven is under our feet as well as over our heads.', 'Henry David Thoreau', 'nature'],
  ['The poetry of the earth is never dead.', 'John Keats', 'nature'],
  ['Nature does not hurry, yet everything is accomplished.', 'Lao Tzu', 'nature'],
  ['To sit in the shade on a fine day and look upon verdure is the most perfect refreshment.', 'Jane Austen', 'nature'],
  ['Study nature, love nature, stay close to nature. It will never fail you.', 'Frank Lloyd Wright', 'nature'],
  ['The mountains are calling and I must go.', 'John Muir', 'nature'],
  ['Live in the sunshine, swim the sea, drink the wild air.', 'Ralph Waldo Emerson', 'nature'],
  ['There is a pleasure in the pathless woods.', 'Lord Byron', 'nature'],
  ['The clearest way into the Universe is through a forest wilderness.', 'John Muir', 'nature'],
  ['Leave the road, take the trails.', 'Pythagoras', 'nature'],
  ['Those who contemplate the beauty of the earth find reserves of strength that will endure as long as life lasts.', 'Rachel Carson', 'nature'],

  ['A day without laughter is a day wasted.', 'Charlie Chaplin', 'humor'],
  ['I am so clever that sometimes I don\'t understand a single word of what I am saying.', 'Oscar Wilde', 'humor'],
  ['I can resist everything except temptation.', 'Oscar Wilde', 'humor'],
  ['The secret of life is honesty and fair dealing. If you can fake that, you\'ve got it made.', 'Groucho Marx', 'humor'],
  ['I have never let my schooling interfere with my education.', 'Mark Twain', 'humor'],
  ['Always remember that you are absolutely unique. Just like everyone else.', 'Margaret Mead', 'humor'],
  ['If you think you are too small to make a difference, try sleeping with a mosquito.', 'Dalai Lama', 'humor'],
  ['I used to think I was indecisive, but now I\'m not so sure.', 'Unknown', 'humor'],
  ['Behind every great man is a woman rolling her eyes.', 'Jim Carrey', 'humor'],
  ['People say nothing is impossible, but I do nothing every day.', 'A. A. Milne', 'humor'],
  ['I\'m not arguing, I\'m just explaining why I\'m right.', 'Unknown', 'humor'],
  ['The road to success is always under construction.', 'Lily Tomlin', 'humor'],
  ['Age is an issue of mind over matter. If you don\'t mind, it doesn\'t matter.', 'Mark Twain', 'humor'],
  ['I told my wife she was drawing her eyebrows too high. She looked surprised.', 'Unknown', 'humor'],
  ['Light travels faster than sound. This is why some people appear bright until you hear them speak.', 'Unknown', 'humor'],
];

export const QUOTES: Quote[] = raw.map(([text, author, category], index) => ({
  id: `q${String(index + 1).padStart(3, '0')}`,
  text,
  author,
  category,
}));

export function getQuoteById(id: string): Quote | undefined {
  return QUOTES.find((q) => q.id === id);
}

export function quotesByCategory(category: CategoryId): Quote[] {
  return QUOTES.filter((q) => q.category === category);
}

export function searchQuotes(query: string): Quote[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return QUOTES.filter(
    (item) =>
      item.text.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.category.includes(q),
  );
}

export function dailyQuote(date = new Date()): Quote {
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let hash = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const index = Math.abs(hash) % QUOTES.length;
  return QUOTES[index];
}

export function randomQuote(exceptId?: string): Quote {
  const pool = exceptId ? QUOTES.filter((q) => q.id !== exceptId) : QUOTES;
  return pool[Math.floor(Math.random() * pool.length)];
}
