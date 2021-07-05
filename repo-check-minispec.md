# Repo Check Mini Spec

For each plugin seneca repo, we wish to validate consistency accross multiple files.

# Basic Approach
1. Store a list of plugins in a local JSON file, use the format: `{ "<org/name>": { "kind":"plugin"} }` where org/name is the github repo. This format is extensible for future features.
2. For each plugin in the list, download a standard list of files, for now, ["README.md","package.json"]
3. For each plugin in the list, run a set of checks against the downloaded files, for now:
  a.  confirm all files exist, with exactly correct (case sensitive) names
  b.  confirm all files are not empty (more than 0 characters)
4. Output the results of the tests to another JSON file - you decide the format!
5. Upload the results to our spreadsheet, placing them in another sheet (not the main one), keyed by the reo name (OK, this one is for later after we've solved google spreadsheets!)  
  
