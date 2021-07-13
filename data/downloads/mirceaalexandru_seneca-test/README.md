# Seneca test

- __Lead Maintainer:__ [Mircea Alexandru][lead]
- __Sponsor:__ [nearForm][]

A test module for seneca.

# Installing

Install this module by clonning the project:

```
git clone git@github.com:mirceaalexandru/seneca-test.git
```

Install dependencies

```
npm install
```

# Running the tests

```
node index.js options
```

where options are:

# Options

 * s - choose testing strategy. Available strategies are: `module` or `seneca`.
 * m - choose module to be tested. To be used with "-s module" option. Available modules for testing are set into `config/modules.json` file
 * f - force stop testing on first error. If not set it will run all tests then display results.
 * h - Print help message.
 
# Strategies
 
There are two available strategies:

## Module

`module` strategy will create Docker images with:
- cloning modules github master repository - so this must be used before publishing a module.
- installing all configured seneca versions defined in `config/modules.json` 
- run test for each combination `seneca version` <-> `node version` <-> `unpublished version of module to be tested`

## Seneca

`seneca` strategy will create Docker images with:
- cloning each configured module github master repository from `config/modules.json`.
- installing github master seneca repository. 
- run test for each combination `module master repository` <-> `node version` <-> `seneca master repository`

# Examples

```
node index.js -s seneca
```

```
node index.js -s module -m seneca-cron
```

# License
Copyright (c) 2016, Mircea Alexandru and other contributors.
Licensed under [MIT][].

[MIT]: ./LICENSE
[lead]: https://github.com/mirceaalexandru
[nearForm]: http://www.nearform.com/
