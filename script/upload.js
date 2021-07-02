// Google Sheets API - specific requirements
const Readline = require('readline')
const {google} = require('googleapis')
const Express = require ('express')
const Fs = require ('fs')
const Request = require ('request')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = '../data/json/token.json';

// Load client secrets from a local file.
Fs.readFile('../data/json/sheetsCredentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), uploadCSV);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  Fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      Fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function uploadCSV(auth){
    // upload to existing sheet
    // modify single cell on repo sheet
    console.log("hewwo?")
    const sheets = google.sheets({version: 'v4', auth});
    console.log("uwuu")
    return new Promise((resolve, reject) => {
        const emptySheetParams = {
            spreadsheetId: "1vgL0ZiL1A33h0RANncoQBgliwFkdcNlyyoCDvr2aioY",
            resource: {
                requests: [
                    {
                        addSheet: {
                            properties: {
                                    title: "totalResults",
                                    index: 1,
                                    gridProperties: {
                                    rowCount: 2000,
                                    columnCount: 2000,
                                    frozenRowCount: 1
                                }
                            }
                        }
                    }
                ]
            }
        }
        sheets.spreadsheets.batchUpdate(emptySheetParams, function(err, response) {
            if (err) {
            reject("The Sheets API returned an error: " + err)
            } else {
            const sheetId = response.data.replies[0].addSheet.properties.sheetId
            console.log("Created empty sheet: " + sheetId)
            resolve(sheetId)
            }
        }
        );
    });
}
