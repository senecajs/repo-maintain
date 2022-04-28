![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

> Run standardisation tests on the [Seneca.js](https://www.npmjs.com/package/seneca) ecosystem of plugins here on GitHub.

# repo-maintain

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |

This module is designed to give an overview of the Seneca family of plugins in relation to an evolving series of standardisation checks. The report is generated under two file formats - Markdown and Comma Separated Values (CSV). This is for legibility and post-report analysis purposes.

If you're using this module, and need help, you can:

- Post a [github issue](https://github.com/senecajs/repo-maintain/issues),
- Tweet to [@senecajs](http://twitter.com/senecajs),
- Ask the [author](https://github.com/stokesriona).

If you are new to Seneca in general, please take a look at [senecajs.org](https://www.npmjs.com/package/seneca). We have everything from tutorials to sample apps to help get you up and running quickly.

## Install

### Clone with SSH

```bash
$ git clone git@github.com:senecajs/repo-maintain.git
```

Run the above command in the directory of your choice. You will be prompted to input your SSH key password. A repo-maintain subdirectory will be created for you.

This is the preferred cloning method, as it is more secure. Don't know what an SSH key is/don't have one yet? Check out the GitHub docs on SSH keys [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

### Clone with HTTPS

```bash
$ git clone https://github.com/senecajs/repo-maintain.git
```

If you would prefer to use HTTPS cloning, run the above command in your directory of choice instead. A repo-maintain subdirectory will be created here too.

## Quick Example

This tool uses **[NodeJS](https://nodejs.org/en/)** and **[npm](https://www.npmjs.com/)**. Please [download](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and verify installation (using `node -v` and `npm -v`) before proceeding.

```bash
$ node repo-maintain [silent] [short]
```

From the repo-maintain directory, run the above command. By default, output to console is permitted - this is so you can follow the tool's progress in real time. The optional `silent` parameter will block output to console, with the exception of any errors that may arise during runtime.

Presently, the tool takes approx. 110 minutes to complete. All results can be found in the REPORT.md and REPORT.csv files at the top-level. To run a one-minute version of the tool for testing purposes, include the `short` argument.

**_Markdown -_** Check your IDE documentation for how to preview .md files within the editor (ctrl+shift+v for VSCode).

**_CSV -_** Preview within your IDE, or open file in your preferred spreadsheet application (LibreOffice Calc, Microsfot Excel, Google Sheets, etc) to take full advantage of their filter and sort functionalities.

## More Examples

### Configurations

Configurations are used to run additional checks based on the architecture of your specific plugin. At the moment, we have three configs - Base, JavaScript, and TypeScript. The base configuration is run by default, and the tool will apply language specific configurations based on the language of each plugin. No action on your part is necessary.

### Adding checks

There are two parts to each check: the specific named check including all of its components in [checks.js](./checks/checks.js), and the definition of the operation of the check in [runChecks.js](./script/runChecks.js). The latter part is separate due to the fact that some checks are of the same kind and share the same operation - for example, the exist_readme and exist_license checks.

To add a check with an already established operation, only the [checks/checks.js](./checks/checks.js) file must be modified. Any checks added to here will be included in the run. Any file under the `file` key will have its content fetched and stored in the `pluginData` object for use during operations. Refer to the existing checks for what other data to include in the check object, cross-referencing as necessary with checkOperations() ([starts line 54 in script/runChecks.js](./script/runChecks.js)).

To add a check with a new operation, you must edit both files. The `kind` value in each check object refers to the name of the operation function in [runChecks.js](./script/runChecks.js). This function is where you will detail how exactly the program executes the check - remember to `require` any external modules you may need at the top of the file. Each of these operation functions have access to the list of checks (parameter checkDetails) as well as a `pluginData` object, which contains repo-specific file content including API data - check out the [gatherData script](./script/gatherData.js) for exact details.

Remember to add your check description to this README!

## Motivation

This tool was created in order to maintain the Seneca ecosystem, in a legible and accessible way. Want your plugin to be part of the family? Check out our individual standardisation tool on npm [here](https://www.npmjs.com/package/@seneca/maintain)!

## Support

Check out our sponsors and supporters, Voxgig, on their website [here](https://www.voxgig.com).

### Check Descriptions

| Name                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **content_readme**      | The README.md file should contain the word "Voxgig" somewhere in it. [Voxgig](https://www.voxgig.com) are the sponsors and supporters of many Seneca modules.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **exist_codeconduct**   | The plugin should contain a CODE_OF_CONDUCT.md file. Please refer to [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) for further details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **exist_dist**          | This is a TypeScript configuration check. The plugin should contain a top-level file named `<plugin>.ts`, where <plugin> matches `"main": "dist/<plugin>.js"` in the package.json. Eg: a file named `maintain.ts` and a package.json main value of `dist/maintain.js`. Instances where <plugin> is equal to "index" are not accepted.                                                                                                                                                                                                                                                                                                                                                                                         |
| **exist_entry**         | This is a JavaScript configuration check. The plugin should contain a top-level file named `<plugin>.js`, where <plugin> matches `"main": "<plugin>.js"` in the package.json. Eg: a file named `maintain.js` and a package.json main value of `maintain.js`. Instances where <plugin> is equal to "index" are not accepted.                                                                                                                                                                                                                                                                                                                                                                                                   |
| **exist_license**       | The plugin should include a license file, simply named `LICENSE` - no file extension.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **exist_pkgjson**       | The plugin should include a package.json file, at the top-level. This check simply scans for its existence.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **exist_readme**        | The plugin should contain a README.md file at the top level, named exactly `README.md`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **readme_headings**     | The README.md file should contain only one H1-level heading (denoted by a single hash (`#`) in Markdown), the value of which should be `<package.name>`, where `<package.name>` is the name taken from the "name" value in the package.json file. Additionally, the README.md file should contain eight and only eight H2-level headings (denoted by a double-hash (`##`) in Markdown). The values of these H2 headings should be the following (order must be conserved): Install, Quick Example, More Examples, Motivation, Support, API, Contributing, Background. There is no limit as to how many lower-level headings can be included between these. This README.md document passes this check - refer to it if needed. |
| **test_pkgjson**        | The package.json file should include a `scripts.test` key, or a key named "test" nested within the "scripts" value. The value of this key is up to the author.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **branch_default**      | The default branch of the repository should be named `main`, as opposed to perhaps "master" - the old standard.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **version_codeconduct** | The CODE_OF_CONDUCT.md file should contain the latest version of Contributor Covenant's Code of Conduct, as denoted [here](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

## API

No API functionality is currently shipped with this tool.

## Contributing

The [SenecaJS org](http://senecajs.org/) encourages participation. If you feel you can help in any way, be
it with bug reporting, documentation, examples, extra testing, or new features, feel free
to [create an issue](https://github.com/senecajs/repo-maintain/issues/new), or better yet - [submit a Pull Request](https://github.com/senecajs/repo-maintain/pulls). For more
information on contribution, please see our [Contributing Guide](http://senecajs.org/contribute).

## Background

Check out the SenecaJS roadmap [here](https://senecajs.org/roadmap/)!

### License

Licensed under [MIT](./LICENSE).
