<h1>Gemi Slice | Gemini Snippet on Search ✨</h1>

<h2>Table of Contents</h2>
<ol>
  <li><a href="#overview">Overview</a></li>
  <li><a href="#how-to-use-it">How to use it</a></li>
  <li><a href="#start-the-project">Start the project</a></li>
  <li><a href="#uninstall">Uninstall</a></li>
  <li><a href="#support">Support</a></li>
  <li><a href="#contributing">Contributing</a></li>
</ol>

<h2 id="overview">Overview</h2>
<p>The easiest way to find your code solutions in Google Chrome.</p>
<p><b>Gemi Slice</b> is a Chrome extension designed to enhance your programming workflow. It automatically generates and displays relevant code snippets directly in your Google search results whenever you perform a programming-related query. With features like instant code copying, code explanation via text-to-speech, and the ability to regenerate snippets, this extension saves you time and helps you better understand the code you’re working with. Perfect for both learners and experienced developers, Gemini Snippet on Search makes coding more accessible and efficient.</p>

<h2 id="how-to-use-it">How to use it</h2>

<h3>Manually</h3>
<ul>
  <li>Install the extension from the <a href="https://chrome.google.com/webstore">Chrome Web Store</a>.</li>
  <li>Enable the extension in your Chrome browser.</li>
  <li>Perform a search related to programming on Google.</li>
  <li>View the relevant code snippets directly in your search results.</li>
  <li>Use the copy feature to quickly add the code to your project.</li>
</ul>

<h3>Automatically</h3>
<i>Soon on Chrome Web Store</i>

<h2 id="start-the-project">Start the project</h2>

<h3>Quick open</h3>
<a href="https://idx.google.com/import?url=https%3A%2F%2Fgithub.com%2Fsnapverse%2Fgemini-snippet-monorepo">
  <img
    height="32"
    alt="Open in IDX"
    src="https://cdn.idx.dev/btn/open_dark_32@2x.png">
</a>

<p>Or just press <kbd>.</kbd> key</p>

<h3>Locally</h3>

<h4>Clone it</h4>
<pre lang="bash">
<code>
git clone https://github.com/snapverse/gemini-snippet-monorepo.git
# or
gh repo clone snapverse/gemini-snippet-monorepo
</code>
</pre>


<h4>Install dependencies</h4>
<pre lang="bash">
<code>
npm i -g pnpm
pnpm i
</code>
</pre>

<h4>Start the server & build extension</h4>
<pre lang="bash">
<code>
# extension
# the build process will create a dist directory; just select that folder
# at chrome://extensions with developer mode on
# each rebuild may require a forced refresh
pnpm run build:chrome
# api
# go to 0.0.0.0:[PORT]/docs to see the Swagger documentation
pnpm run api:develop
</code>
</pre>

<h3>Project IDX</h3>
<i>Soon...</i>

<h3>Dev Container (VSCode)</h3>
<i>Soon...</i>

<h2 id="uninstall">Uninstall</h2>
<p>To uninstall the Gemi Slice extension:</p>
<ul>
  <li>Go to <code>chrome://extensions</code> in your Chrome browser.</li>
  <li>Find the Gemi Slice extension card.</li>
  <li>Click the <code>Remove</code> button to uninstall.</li>
</ul>

<h2 id="support">Support</h2>
<p>If you encounter any issues or have questions, feel free to <a href="https://github.com/snapverse/gemini-snippet-monorepo/issues">open an issue</a> on GitHub.</p>
<p>You can also reach out to our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>

<h2 id="contributing">Contributing</h2>
<p>We are excited to see your contributions! Please read our <a href="https://github.com/snapverse/gemini-snippet-monorepo/blob/main/CONTRIBUTING.md">contributing guidelines</a> before submitting a pull request.</p>
<p>Check out the <a href="https://github.com/snapverse/gemini-snippet-monorepo/pulls">open pull requests</a> and feel free to join the conversation!</p>

<p>❤ Happy Coding!</p>
