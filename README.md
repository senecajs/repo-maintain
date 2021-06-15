# repo-maintain
Maintenance automation for Seneca repos.

To test script/search.js :
    > Ensure node.js is installed and working correctly on your machine
    > Navigate to the /script folder in the console
    > Run the node.js script by typing "node search" and press enter
    > Expected (console) :
        TOTAL 1804
        ITEMS LEN 3
        TypeError: data.values(...).forEach is not a function
        at doSearch
    > Expected (initialTest.csv) :
        (null - no such file exists)