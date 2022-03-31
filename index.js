import axios from 'axios';
import { createReadStream, createWriteStream, writeFileSync } from 'fs';

const getQuote = async () => {
	try {
		const { data } = await axios.get('https://api.quotable.io/random');
		return data;
	} catch (err) {
		console.error(err.message);
		return {};
	}
};

(async () => {
	const { content, author } = await getQuote();
	if (!content) return;

	writeFileSync('README.md', `_**${content}**_\n\n${author}\n\n`, (err) => {
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
