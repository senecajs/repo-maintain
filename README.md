![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

> A module to help you standardize your [Seneca.js](https://www.npmjs.com/package/seneca) plugin.

# repo-maintain

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |

## Description

This module is designed for contributors to the Seneca family of plugins. If you wish, you may use this to scan your own plugin prior to publishing to see if it meets our standardisation specifications.

If you're using this module, and need help, you can:

- Post a [github issue](https://github.com/senecajs/repo-maintain/issues),
- Tweet to [@senecajs](http://twitter.com/senecajs),
- Ask the [author](https://github.com/stokesriona).

If you are new to Seneca in general, please take a look at [senecajs.org](https://www.npmjs.com/package/seneca). We have everything from tutorials to sample apps to help get you up and running quickly.

## Installation and Usage

**repo-maintain is not currently published as an npm package. Please check back regularly for updates.**

See below for what each check means in the event of it failing.

Please note: if your repository contains file name duplicates (for example, two package.json files), the module will return a SyntaxError. This is a known issue.

## Checks

### content_readme

This check scans the content of the README.md file for the keyword "Voxgig". If the file does not exist, the check will fail.

### exist_codeconduct

This checks looks for the existence of a CODE_OF_CONDUCT.md file. Details for this file can be found by visiting the [Contributor Covenant website](https://www.contributor-covenant.org/).

### exist_license

This check looks for the existence of a LICENSE file. A LICENSE file saved under a different name or with any file extension will count as a fail.

### exist_pkgjson

This check looks for the existence of a package.json file. It does not scan for a package-lock.json file.

### exist_readme

This check looks for the existence of a README.md file. A README saved under a different file name or extension will count as a fail.

### test_pkgjson

This check scans the content of the package.json file for the existence of a scripts.test value. The content of the value is not read. If the file does not exist, or if there is no "test" key, the check will fail.

### exist_entry

This check searches for an entry.js file, where entry matches the value of "main" in the package.json file. An empty string or a value of "index.js" will cause the check to fail. This is a JavaScript-specific check.

### exist_dist

This check searches for an entry.ts file, where entry matches the value of "main" in the package.json file (in the format dist/entry.js). An empty string or a value of "dist/index.js" will cause the check to fail. This is a TypeScript-specific check.

### version_codeconduct

This checks scans the content of the CODE_OF_CONTENT file for a mention of the latest version (v2.1). It searches for the keyword "version 2.1" and the [URL of the current version](https://www.contributor-covenant.org/version/2/1/), as described on the site.

### check_default

This check looks at the name of the default branch on GitHub. The check will fail if it is not named "main".

## Contributing

The [Senecajs org](https://github.com/senecajs) encourages open participation. If you feel you can help in any way, be it with documentation, examples, extra testing, or new features, please get in touch.

## License

Licensed under [MIT](./LICENSE).
