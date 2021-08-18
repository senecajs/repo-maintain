![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A module to help you standardize your [Seneca.js](https://www.npmjs.com/package/seneca) plugin.

# repo-maintain

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|

## Description

This module is designed for contributors to the Seneca family of plugins. If you wish, you may use this plugin to scan your own prior to publishing to see if it meets our standardisation specifications.

If you're using this module, and need help, you can:

- Post a [github issue](https://github.com/senecajs/repo-maintain/issues),
- Tweet to [@senecajs](http://twitter.com/senecajs),
- Ask the [author](https://github.com/stokesriona).

If you are new to Seneca in general, please take a look at [senecajs.org](https://www.npmjs.com/package/seneca). We have everything from tutorials to sample apps to help get you up and running quickly.

## Installation and Usage

repo-maintain is not currently published as an npm package. Please check back regularly for updates.

See below for what each check means in the event of it failing.

## Checks
### exist_readme
This check looks for the existence of a README.md file. A README saved under a different file name or extension will count as a fail.

### exist_pkgjson
This check looks for the existence of a package.json file. It does not scan for a package-lock.json file.

### exist_license
This check looks for the existence of a LICENSE file. A LICENSE file saved under a different name or with any file extension will count as a fail.

### content_readme
This check scans the content of the README.md file for the keyword "Voxgig". If the file does not exist, the check will fail.

### content_pkgjson
This check scans the content of the package.json file for the existence of a scripts.test value. The content of the value is not read. If the file does not exist, or if there is no "test" key, the check will fail.

## Contributing
The [Senecajs org](https://github.com/senecajs) encourages open participation. If you feel you can help in any way, be it with documentation, examples, extra testing, or new features, please get in touch.

## License
Licensed under [MIT](./LICENSE).