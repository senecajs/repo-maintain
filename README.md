# repo-maintain
Maintenance automation for Seneca repos.

To test script/search.js :
    > Ensure node.js and npm are installed and working correctly on your machine
    > Navigate to the /script folder in the console
    > Run the node.js script by typing "node search" and press enter
    > Expected : creation of results.json file.

To test script/filter.js :
    > Ensure node.js and npm are installed and working correctly on your machine
    > Navigate to the /script folder in the console
    > Run the node.js script by typing "node filter" and press enter
    > Expected (console) :
        Previous filter.json file deleted.
        ITEMS TO FILTER :  1000
        FILTERED ITEMS :  63
    > Expected (filter.json) :
        [{"id":1012745,"node_id":"MDEwOlJlcG9zaXRvcnkxMDEyNzQ1",
        (...)

To test script/format.js :
    > Ensure node.js and npm are installed and working correctly on your machine
    > Navigate to the /script folder in the console
    > Run the node.js script by typing "node format" and press enter
    > Expected: creation of results.csv file.

To test Google Sheets API Quickstart file (scrips/tests/sheetsQuickstart.js) :
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