import CodeSnippet from './components/CodeSnippet';
import GUI from './lib/gui';
import './main.css';

new GUI();

const LONG_LANG = 'cpp';
const CODE_SNIPPET =
  '#include <iostream>\n\nint main() {\n  std::cout << "Hello, world!" << std::endl;\n  return 0;\n}\n';
const TEXT =
  'This is a basic C++ program that prints "Hello, world!" to the console.\n\n* `#include <iostream>` brings in the standard input/output library, allowing the program to interact with the user.\n* `int main()` is the starting point of the program.\n* `std::cout << "Hello, world!" << std::endl;` displays the message on the screen.\n* `return 0;` indicates successful program execution. \n';
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
