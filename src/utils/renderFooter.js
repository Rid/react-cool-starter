/* eslint-disable lodash/prefer-lodash-method */

import serialize from 'serialize-javascript';

export default (
  head: Object,
  extractor: Function,
  initialState: Object
): string =>
  `
    </div>
        <!-- Insert bundled styles into <link> tag -->
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}

        <!-- Store the initial state into window -->
        <script>
          // Use serialize-javascript for mitigating XSS attacks. See the following security issues:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__INITIAL_STATE__=${serialize(initialState)};
        </script>

        <!-- Insert bundled scripts into <script> tag -->
        ${extractor.getScriptTags()}

        ${head.script.toString()}
      </body>
    </html>
  `;
