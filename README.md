# repo-maintain
Maintenance automation for Seneca repos.

To test script/search.js :
    > Ensure node.js and npm are installed and working correctly on your machine
    > Navigate to the /script folder in the console
    > Run the node.js script by typing "node search" and press enter
    > Expected (console) :
        Search function initiated.
        [1] 100 results fetched...
        [1] Results appended to file.
        (...)
        [10] 100 results fetched...
        [10] Results appended to file.
        TypeError: Cannot read property 'length' of undefined
        at doSearch
    > Expected (results.json):
        [{"id":1012745,"node_id":"MDEwOlJlcG9zaXRvcnkxMDEyNzQ1","name":"seneca",
        (...)

To test script/filter.js :
    > Ensure node.js and npm are installed and working correctly on your machine
    > Navigate to the /script folder in the console
    > Run the node.js script by typing "node filter" and press enter
    > Expected (console) :
       undefined:1
        ../data/json/results.json
        SyntaxError: Unexpected token . in JSON at position 0
            at JSON.parse (<anonymous>)
            at Object.<anonymous>

To test Google Sheets API Quickstart file (scrips/sheetsQuickstart.js) :
    > Ensure node.js and npm are installed and working correctly on your machine
    > Navigate to the /script folder in the console
    > Run the sheetsQuickstart script by typing "node sheetsQuickstart" and press enter
    > Follow the proposed URL and select the google account to sign into "SenecaJS Repo Maintain".
    > Copy the given string and paste it back into the console
    > Expected (console) :
        Token stored to token.json
        Name, Major:
        Alexandra, English
        Andrew, Math
        (...)
        Thomas, Art
        Will, Math
    > Expected (token.json) :
        {"access_token":"ya29.a0AfH6SMB-vRBmhJ6h9xHqUfjr56rGqqq7yWWLeeCurrvbYK13YElPMfYof10ZyiAwjMN88yR_29vSxG1vp0-MOwrt3unWsE0P6PRK-zajuUoNydE41ltLa8adF12bFGuKg4635aPz4wHqieLl5X3iXSdXfJfU","refresh_token":"1//03qNRH1D3hDduCgYIARAAGAMSNwF-L9IrxqJiu-rCUzTgHHzY6lis9MrpMWAHzyNK9l5shkmSq3UraTqvgRLbMKhqkzBNrYqJUoc","scope":"https://www.googleapis.com/auth/spreadsheets.readonly","token_type":"Bearer","expiry_date":1623779062767}