import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";
require('dotenv').config();


const configuration = new Configuration({ 
    const apiKey= process.env.API_KEY;
});
const openai = new OpenAIApi(configuration);
const prompt = 'Two long roads diverging into a forest during the autumn season';
// taken from "two roads diverged in a yellow woods" by Robert Frost

const result = await openai.createImage({
    prompt,
    n: 1,
    size: "512x512"
});

const url = result.data.data[0].url;
console.log(url);

const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync('./img/${Date.now()}.png', buffer);

