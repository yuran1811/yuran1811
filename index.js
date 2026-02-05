import { createReadStream, createWriteStream, writeFileSync } from 'node:fs';

const DefaultQuote = {
  quote: "Don't try to please everyone, just try to please yourself.",
  author: 'yuran1811',
};

const getQuote = async () => {
  try {
    const res = await fetch('https://quotes-api-pearl.vercel.app/quote');
    return res.ok ? await res.json() : DefaultQuote;
  } catch (err) {
    return DefaultQuote;
  }
};

(async () => {
  const { quote: content, author } = await getQuote();
  if (!content || !author) return;

  writeFileSync('README.md', `> _**${content}**_ - ${author}\n\n`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  const src = createReadStream('info.md', {
    flags: 'r',
    encoding: 'utf8',
  });
  const dest = createWriteStream('README.md', {
    flags: 'a+',
    encoding: 'utf8',
  });
  src.pipe(dest);
})();
