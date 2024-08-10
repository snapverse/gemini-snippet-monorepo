import {
	GoogleGenerativeAI
} from '@google/generative-ai';

import env from '@/env';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

// The Gemini 1.5 models are versatile and work with most use cases
export default genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
