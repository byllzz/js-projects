"use strict"

const quotes = [
  { quote: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { quote: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
  { quote: 'Stay hungry, stay foolish.', author: 'Stewart Brand' },
  {
    quote: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
  },
  {
    quote: 'It does not matter how slowly you go as long as you do not stop.',
    author: 'Confucius',
  },
  { quote: 'Everything you’ve ever wanted is on the other side of fear.', author: 'George Addair' },
  {
    quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
  },
  {
    quote: 'Hardships often prepare ordinary people for an extraordinary destiny.',
    author: 'C.S. Lewis',
  },
  { quote: "Believe you can and you're halfway there.", author: 'Theodore Roosevelt' },
  {
    quote: "Your time is limited, so don't waste it living someone else's life.",
    author: 'Steve Jobs',
  },
  { quote: 'The mind is everything. What you think you become.', author: 'Buddha' },
  { quote: 'An unexamined life is not worth living.', author: 'Socrates' },
  { quote: 'Eighty percent of success is showing up.', author: 'Woody Allen' },
  {
    quote: "Your imagination is your preorder of life's coming attractions.",
    author: 'Albert Einstein',
  },
  { quote: 'Do what you can, with what you have, where you are.', author: 'Theodore Roosevelt' },
  { quote: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
  { quote: "Life is what happens when you're busy making other plans.", author: 'John Lennon' },
  { quote: "Don't count the days, make the days count.", author: 'Muhammad Ali' },
  {
    quote: "Whether you think you can or you think you can't, you're right.",
    author: 'Henry Ford',
  },
  { quote: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates' },
  { quote: 'In the middle of every difficulty lies opportunity.', author: 'Albert Einstein' },
  {
    quote: 'Happiness is not something ready-made. It comes from your own actions.',
    author: 'Dalai Lama',
  },
  { quote: "It always seems impossible until it's done.", author: 'Nelson Mandela' },
  {
    quote: 'If you want to lift yourself up, lift up someone else.',
    author: 'Booker T. Washington',
  },
  {
    quote: 'Great minds discuss ideas; average minds discuss events; small minds discuss people.',
    author: 'Eleanor Roosevelt',
  },
  {
    quote: "I have not failed. I've just found 10,000 ways that won't work.",
    author: 'Thomas Edison',
  },
  { quote: 'The power of imagination makes us infinite.', author: 'John Muir' },
  { quote: 'Action is the foundational key to all success.', author: 'Pablo Picasso' },
  { quote: 'Quality is not an act, it is a habit.', author: 'Aristotle' },
  { quote: 'The standard you walk past is the standard you accept.', author: 'David Hurley' },
  { quote: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { quote: 'Do one thing every day that scares you.', author: 'Eleanor Roosevelt' },
  { quote: 'What we achieve inwardly will change outer reality.', author: 'Plutarch' },
  { quote: 'Small deeds done are better than great deeds planned.', author: 'Peter Marshall' },
  {
    quote: 'Logic will get you from A to B. Imagination will take you everywhere.',
    author: 'Albert Einstein',
  },
  {
    quote:
      'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
    author: 'Ralph Waldo Emerson',
  },
  {
    quote: 'The only limit to our realization of tomorrow will be our doubts of today.',
    author: 'Franklin D. Roosevelt',
  },
  {
    quote: 'A person who never made a mistake never tried anything new.',
    author: 'Albert Einstein',
  },
  { quote: 'It is never too late to be what you might have been.', author: 'George Eliot' },
  {
    quote: "Life isn't about finding yourself. Life is about creating yourself.",
    author: 'George Bernard Shaw',
  },
  { quote: 'Knowledge speaks, but wisdom listens.', author: 'Jimi Hendrix' },
  { quote: 'We are what we repeatedly do.', author: 'Aristotle' },
  { quote: 'The best revenge is massive success.', author: 'Frank Sinatra' },
  { quote: 'Turn your wounds into wisdom.', author: 'Oprah Winfrey' },
  { quote: "Don't let yesterday take up too much of today.", author: 'Will Rogers' },
  { quote: 'I would rather die on my feet than live on my knees.', author: 'Emiliano Zapata' },
  { quote: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { quote: 'You miss 100% of the shots you don’t take.', author: 'Wayne Gretzky' },
  { quote: 'Dream big and dare to fail.', author: 'Norman Vaughan' },
  { quote: "If you're going through hell, keep going.", author: 'Winston Churchill' },
];

function createWrapper () {
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  wrapper.innerHTML = `
  <div class="temps">
   <span></span>
  <span></span>
  </div>
   <h1 id="quote"></h1>
   <span id="author"></span>
   <button id="randomBtn">Get Random Quote</button>
  `
 document.body.appendChild(wrapper);
return ({
     quote : wrapper.querySelector('#quote'),
    author :  wrapper.querySelector('#author'),
     random_btn  : wrapper.querySelector("#randomBtn")
})
};


 function print_quote () {
 const {quote , author , random_btn}  =createWrapper();
   let  random_logic  = () => {
    let random_arr = Math.floor(Math.random() * this.length);
    const rm_quote = this[random_arr];
    return rm_quote;
   };

   quote.innerHTML === '' ? quote.textContent = 'Press (Button in bottom right to get inspiring Quotes...!)' : '';
   author.innerHTML === "" ? author.textContent = "---- undefined ----" : '';

  random_btn.addEventListener("click" ,()=> {
    let random_quote = random_logic();
      if (random_quote) {
        try {
          quote.textContent = random_quote.quote;
          author.textContent = `---- ${random_quote.author} ----`;
        } catch {
          console.error('I think array is missing');
        }
      }
  })

 };

print_quote.call(quotes);

