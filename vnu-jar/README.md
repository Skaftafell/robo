# The Nu Html Checker (v.Nu) [![Chat room][1]][2] [![Download latest][3]][4]

   [1]: https://img.shields.io/badge/[matrix]-chat%20%E2%86%92-brightgreen.svg
   [2]: https://matrix.to/#/#validator_validator:gitter.im
   [3]: https://img.shields.io/badge/download-latest%20%E2%86%92-blue.svg
   [4]: https://github.com/validator/validator/releases/latest

The Nu Html Checker (v.Nu) helps you [catch unintended mistakes in your HTML,
CSS, and SVG][5]. It enables you to [batch-check documents from the command
line][6] and from other scripts/apps, and to [deploy your own instance of the
checker as a service][7] (like [validator.w3.org/nu][8]). Its [source code is
available][9], as are [instructions on how to build, test, and run the
code][10].

   [5]: https://validator.w3.org/nu/about.html#why-validate
   [6]: https://validator.github.io/validator/#usage
   [7]: https://validator.github.io/validator/#standalone
   [8]: https://validator.w3.org/nu/
   [9]: https://github.com/validator/validator
   [10]: https://validator.github.io/validator/#build-instructions

`vnu.jar` is a packaged version of the Nu Html Checker for batch-checking
documents from the command line and from other scripts/apps.

You can work with `vnu.jar` in CommonJS modules.

## Install latest release version

```sh
npm install --save vnu-jar
```

## Install 'next' version

```sh
npm install --save vnu-jar@next
```

## Example

```js
'use strict';

const { execFile } = require('child_process');
const vnu = require('vnu-jar');

// Print path to vnu.jar
console.log(vnu);

// Work with vnu.jar, for example get vnu.jar version
execFile('java', ['-jar', `"${vnu}"`, '--version'], { shell: true }, (error, stdout) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }

    console.log(stdout);
});
```
## UsageRun the checker with one of the following invocations:

• `vnu-runtime-image/bin/vnu OPTIONS FILES` (Linux or macOS)

• `vnu-runtime-image\bin\vnu.bat OPTIONS FILES` (Windows)

• `java -jar ~/vnu.jar OPTIONS FILES` (any system with Java8+ installed)

…where _`FILES`_ are the documents to check, and _`OPTIONS`_ are zero or more of
the following options:

    --errors-only --Werror --exit-zero-always --stdout --asciiquotes
    --user-agent USER_AGENT --no-langdetect --no-stream --filterfile FILENAME
    --filterpattern PATTERN --css --skip-non-css --also-check-css --svg
    --skip-non-svg --also-check-svg --html --skip-non-html
    --format gnu|xml|json|text --help --verbose --version

The [Options][27] section below provides details on each option, and the rest of
this section provides some specific examples.

   [27]: https://validator.github.io/validator/#options

**Note:** Throughout these examples, replace `~/vnu.jar` with the actual path to
that jar file on your system, and replace `vnu-runtime-image/bin/vnu` and
`vnu-runtime-image\bin\vnu.bat` with the actual path to the `vnu` or `vnu.bat`
program on your system — or if you add the `vnu-runtime-image/bin` or
`vnu-runtime-image\bin` directory your system `PATH` environment variable, you
can invoke the checker with just `vnu`.

To check one or more documents from the command line:

      vnu-runtime-image/bin/vnu      FILE.html FILE2.html FILE3.html...

      vnu-runtime-image\bin\vnu.bat  FILE.html FILE2.html FILE3.html...

      java -jar ~/vnu.jar            FILE.html FILE2.html FILE3.html...

**Note:** If you get a `StackOverflowError` error when invoking the checker, try
adjusting the thread stack size by providing the `-Xss` option to java:

      java -Xss512k -jar ~/vnu.jar ...

      vnu-runtime-image/bin/java -Xss512k \
          -m vnu/nu.validator.client.SimpleCommandLineValidator ...

To check all documents in a particular directory `DIRECTORY_PATH` as HTML:

      java -jar ~/vnu.jar            DIRECTORY_PATH

      vnu-runtime-image/bin/vnu      DIRECTORY_PATH

      vnu-runtime-image\bin\vnu.bat  DIRECTORY_PATH

#### More examples

**Note:** The examples in this section assume you have the
`vnu-runtime-image/bin` or `vnu-runtime-image\bin` directory in your system
`PATH` environment variable. If you’re using the jar file instead, replace `vnu`
in the examples with `java -jar ~/vnu.jar`.

To check all documents in a particular directory `DIRECTORY_PATH` as HTML, but
skip any documents whose names don’t end with the extensions `.html`, `.htm`,
`.xhtml`, or `.xht`:

      vnu --skip-non-html DIRECTORY_PATH

To check all documents in a particular directory as CSS:

      vnu --css DIRECTORY_PATH

To check all documents in a particular directory as CSS, but skip any documents
whose names don’t end with the extension `.css`:

      vnu --skip-non-css DIRECTORY_PATH

To check all documents in a particular directory, with documents whose names end
in the extension `.css` being checked as CSS, and all other documents being
checked as HTML:

      vnu --also-check-css DIRECTORY_PATH

To check all documents in a particular directory as SVG:

      vnu --svg DIRECTORY_PATH

To check all documents in a particular directory as SVG, but skip any documents
whose names don’t end with the extension `.svg`:

      vnu --skip-non-svg DIRECTORY_PATH

To check all documents in a particular directory, with documents whose names end
in the extension `.svg` being checked as SVG, and all other documents being
checked as HTML:

      vnu --also-check-svg DIRECTORY_PATH

To check a Web document:

      vnu _URL_

      example: vnu http://example.com/foo

To check standard input:

      vnu -

      example:

      echo '<!doctype html><title>...' | vnu -

      echo '<!doctype html><title>...' | java -jar ~/vnu.jar -

### Options

When used from the command line as described in this section, the checker
provides the following options:

#### --asciiquotes

    Specifies whether ASCII quotation marks are substituted for Unicode smart
    quotation marks in messages.

    default: [unset; Unicode smart quotation marks are used in messages]

#### --errors-only

    Specifies that only error-level messages and non-document-error messages are
    reported (so that warnings and info messages are not reported).

    default: [unset; all messages reported, including warnings & info messages]

#### --Werror

    Makes the checker exit non-zero if any warnings are encountered (even if
    there are no errors).

    default: [unset; checker exits zero if only warnings are encountered]

#### --exit-zero-always

    Makes the checker exit zero even if errors are reported for any documents.

    default: [unset; checker exits 1 if errors are reported for any documents]

#### --stdout

    Makes the checker report errors and warnings to stdout rather than stderr.

    default: [unset; checker reports errors and warnings to stderr]

#### --filterfile _FILENAME_

    Specifies a filename. Each line of the file contains either a regular
    expression or starts with "#" to indicate the line is a comment. Any error
    message or warning message that matches a regular expression in the file is
    filtered out (dropped/suppressed).

    default: [unset; checker does no message filtering]

#### --filterpattern _REGEXP_

    Specifies a regular expression. Any error message or warning message that
    matches the regular expression is filtered out (dropped/suppressed).

    As with all other checker options, this option may only be specified once.
    So to filter multiple error messages or warning messages, you must provide a
    single regular expression that will match all the messages. The typical way
    to do that for regular expressions is to OR multiple patterns together using
    the "|" character.

    default: [unset; checker does no message filtering]

#### --format _format_

    Specifies the output format for reporting the results.

    default: "gnu"

    possible values: "gnu", "xml", "json", "text" [see information at URL below]

    https://github.com/validator/validator/wiki/Service-%C2%BB-Common-params#out

#### --help

    Shows detailed usage information.

#### --skip-non-css

    Check documents as CSS but skip documents that don’t have *.css extensions.

    default: [unset; all documents found are checked]

#### --css

    Force all documents to be checked as CSS, regardless of extension.

    default: [unset]

#### --skip-non-svg

    Check documents as SVG but skip documents that don’t have *.svg extensions.

    default: [unset; all documents found are checked]

#### --svg

    Force all documents to be checked as SVG, regardless of extension.

    default: [unset]

#### --skip-non-html

    Skip documents that don’t have *.html, *.htm, *.xhtml, or *.xht extensions.

    default: [unset; all documents found are checked, regardless of extension]

#### --html

    Forces any *.xhtml or *.xht documents to be parsed using the HTML parser.

    default: [unset; XML parser is used for *.xhtml and *.xht documents]

#### --also-check-css

    Check CSS documents (in addition to checking HTML documents).

    default: [unset; no documents are checked as CSS]

#### --also-check-svg

    Check SVG documents (in addition to checking HTML documents).

    default: [unset; no documents are checked as SVG]

#### --user-agent _USER_AGENT_

    Specifies the value of the User-Agent request header to send when checking
    HTTPS/HTTP URLs.

    default: "Validator.nu/LV"

#### --no-langdetect

    Disables language detection, so that documents are not checked for missing
    or mislabeled html[lang] attributes.

    default: [unset; language detection & html[lang] checking are performed]

#### --no-stream

    Forces all documents to be be parsed in buffered mode instead of streaming
    mode (causes some parse errors to be treated as non-fatal document errors
    instead of as fatal document errors).

    default: [unset; non-streamable parse errors cause fatal document errors]

#### --verbose

    Specifies "verbose" output. (Currently this just means that the names of
    files being checked are written to stdout.)

    default: [unset; output is not verbose]

#### --version

    Shows the checker version number.

