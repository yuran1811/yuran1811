import axios from 'axios';
import { createReadStream, createWriteStream, writeFileSync } from 'fs';

const getQuote = async () => {
	try {
		const { data } = await axios.get('https://quotes.rest/qod?language=en');
		return data.contents.quotes[0];
	} catch (err) {
		console.error(err.message);
		return {};
	}
};

(async () => {
	const { quote, author } = await getQuote();
	if (!quote) return;

	writeFileSync(
		'README.md',
		`_**${quote}**_\n\n${author}
	
`,
		(err) => {
			if (err) {
				console.error(err);
				return;
			}
		}
	);

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
