dr-mark test case with seneca docs

to replicate:

```sh

git clone https://github.com/davidmarkclements/seneca-doc
cd seneca-doc
sudo npm -g install dr-mark
dr --styles > styles.css
dr --head header.html --foot footer.html test.md > test.html
```

<https://davidmarkclements.github.io/seneca-doc> should show the result