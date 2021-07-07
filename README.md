# repo-maintain
Maintenance automation for Seneca repos.
---

### checks.js
Runs a series of tests on the downloaded files of a set of plugins and outputs the results as a JSON file (pluginChecks.json).
> Status of file (does it exist online where it should)
> Content of file (nonzero number of characters)

### download.js
Downloads the README.md and package.json files of a predefined list of plugins from GitHub and saves them locally.
> Files are saved with standard names within unique directories.
> If file does not exist where it should as it should, the error message "404: Not Found" is saved as the file content instead.

### filter.js

### format.js

### isolate.js

### plugins.js

### repoMaintain.js

### search.js
Gathers as many repos under the search term "seneca-" as possible, and outputs their JSON information as a single JSON file (results.json).
> Due in part to limitations of the Search API, only ~1200 of the ~1800 results have been logged.

### upload.js