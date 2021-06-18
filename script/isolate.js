var headings = "Repo,Owner,Name,Description,LastUpdate\r\n" // insert the what later
Fs.writeFileSync("../data/csv/initialTest.csv", headings)

  json.items.forEach(repo => { // replace json.items with relevant

    let url = repo.html_url
    let owner = repo.owner.login
    let name = repo.name
    let desc = repo.description
    // let type = repo.(the what)
    let update = repo.updated_at.substring(0,10)
    
    dataToSave = url + "," + owner + "," + name + "," + "'" + desc + "'" + "," + update
    Fs.appendFileSync("../csv/testing/initialTest.csv", dataToSave)
    Fs.appendFileSync("../csv/testing/initialTest.csv", "\r\n") // just \n in unix
    //rename csv to data
    
  });
