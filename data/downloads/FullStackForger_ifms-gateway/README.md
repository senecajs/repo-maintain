# IFMS Portal 

Seneca microservice auto-updating and serving static pages content
  
## Feature list

### Completed features

- service settings stored in `config.json`
- pages directory verification
  - create directory if one doesn't exist 
- git cloning and fast forwarding
  - cloning static pages from configured repositories
  - fast forwarding static pages from configured repositories
- `ignore` flag allowed for `page` config object
- utilise seneca framework as microservice
- `interval` (config) based auto update
- serving link to a static file on request
- broadcasting update message on repository update (page.update object)

### Feature request list

- action removing all repositories from pages directory
- action reloading config.json without app reboot
- action providing pages update status
- store config in database
- add `access` flag to page config option (owner = 0, logged in = 1, guest = 2)
- web interface (reconfiguration, reloading)