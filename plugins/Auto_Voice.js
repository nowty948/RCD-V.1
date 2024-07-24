const { tlang, cmd } = require('../lib');
const Config = require('../config');
const axios = require('axios');

// URL with modified words and their corresponding audio URLs
const url = 'https://gist.github.com/purnapurna2007/c78c88f763b70239ce3fb4ef31958d1a';

cmd({
    pattern: "bgmnsew",
    category: "owner",
    use: '',
}, async (Void, citel, text, { isCreator }) => {
    try {
        // Fetch the data from the URL
        let { data } = await axios.get(url);

        // Loop through the data to check if the text contains any of the words
        for (let vr in data) {
            // Use regular expression to check for the word in the text
            if ((new RegExp(`\\b${vr}\\b`, 'gi')).test(citel.text)) {
                // Send audio message if a match is found
                return Void.sendMessage(citel.chat, {
                    audio: { url: data[vr] },
                    mimetype: 'audio/mpeg',
                    ptt: true
                }, { quoted: citel });
            }
        }
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
});
