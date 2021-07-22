# repo-maintain

Maintenance automation for Seneca repos.
---

## Design/Checks folder
### checks.js
Script file to hold all checks to run and their specifications.
> Format extensible for future additions

### execute.js
Original design outline for what became runChecks.js .


## Script folder
*Organised alphabetically.*

### download.js
Downloads a predefined list of files from GitHub and saves them locally (data/downloads).
> List of files to download is defined in checks.js.
> 
> Files are saved within unique directories - one directory per plugin.

### filter.js
Creates a JSON file of the repos within results.json that include the name "seneca" (filter.json).  

### format.js
Takes a JSON file and reformats it as a CSV file, saving it locally (data/csv).
> Currently includes code for reformatting results.json and pluginChecks.json

### isolate.js
[TODO : Returns a JSON file with only specified information from each repo from a given list.]

### plugins.js
Creates a JSON file for a handpicked list of plugins.
> Currently contains 11 repos.
>
> Format extensible for inclusion of future features.

### repoMaintain.js
[Placeholder : The top-level script for complete automation of Repo Maintain task.]

### runChecks.js
Runs a series of tests specified in checks.js on a number of files, organised by plugin.
> Current check types : file_exist and content_contains

### search.js
Gathers as many repos under the search term "seneca-" as possible, and outputs their JSON information as a single JSON file (results.json).
> Due in part to limitations of the Search API, only ~1200 of the ~1800 results have been logged.

### upload.js
[TODO : Uploads a csv file to a Google Sheets spreadsheet using the Google Sheets API.]
> Current issue: credentials not providing sufficient permission for task. Complete refactoring needed.

---
## Design/checks folder
### checks.js
Names and info of checks to run on each plugin in a given list.
> Extensible js format (Not JSON - includes trailing commas)

### execute.js
Placeholder code - script to run checks for each plugin (as described in checks.js).