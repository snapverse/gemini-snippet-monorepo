import CodeSnippet from './components/CodeSnippet';
import GUI from './lib/gui';
import './main.css';

new GUI();

// const root = document.querySelector<HTMLElement>('#__root__');

const SHORT_LANG = 'ts';
const LONG_LANG = 'TypeScript';
const CODE_SNIPPET = `console.log("Hello, world"); // Log a string
let name = "Sandra"
console.log("Name: ", name); // Log a variable`;
const TEXT = `En TypeScript, console.log funciona de la misma manera que en JavaScript. Es una función que se utiliza para depurar y registrar información en la consola de desarrollo del navegador. <br><br> Así es como se usa:`;
const SOURCE = 'gemini';

new CodeSnippet({
  code: CODE_SNIPPET,
  explanation: TEXT,
  language: { short: SHORT_LANG, long: LONG_LANG },
  source: SOURCE
}, '#__root__');

