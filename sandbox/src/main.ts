import CodeSnippet from './components/CodeSnippet';
import GUI from './lib/gui';
import './main.css';

new GUI();

const LONG_LANG = 'TypeScript';
const CODE_SNIPPET = `console.log("Hello, world"); // Log a string
let name = "Sandra"
console.log("Name: ", name); // Log a variable`;
const TEXT = `En TypeScript, console.log funciona de la misma manera que en JavaScript. Es una función que se utiliza para depurar y registrar información en la consola de desarrollo del navegador. <br><br> Así es como se usa:`;
const SOURCE = 'gemini';

new CodeSnippet(
  {
    explanation: TEXT,
    language: LONG_LANG,
    code: CODE_SNIPPET,
    source: SOURCE
  },
  '#__root__'
);
