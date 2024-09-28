import axios from 'axios';
import { createReadStream, createWriteStream, writeFileSync } from 'fs';

const getQuote = async () => {
  try {
    const { data } = await axios.get('https://quotes-api-self.vercel.app/quote');
    return data;
  } catch (err) {
    console.error(err.message);
    return {};
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
