# Extend Module

Extend a NPM module(s) by requiring and then merging with the given object(s).

## Why?
Often I find myself writting code that does the same thing and writting the code elsewhere and then merging those common parts can save time on both development and maintenance.

## Installation
Installation is simple:

```bash
$ npm i extend-module
```

## Usage

In Sails you can define your base model as follows:

>eg: `api/base/models/Details.js` base model

```js
module.exports = {
  attributes: {
    name: {
        type: 'string',
    },
    age: {
         type: 'number',
    },
  },
}
```

An extending model can then use this package to extend the above base model as follows:


>eg: `api/models/Person.js` model

```js
const extend = require('extend-module');

module.exports = extend('../base/models/Details', {
  attributes: {
    name: {
        description: 'the name of the person',
        required: true,
    },
    sex: {
         type: 'string',
    },
  },
});
```

The resulting model will be as follows:


>eg: resulting model

```js
{
  attributes: {
    name: {
        type: 'string',
        description: 'the name of the person',
        required: true,
    },
    age: {
        type: 'number',
    },
    sex: {
         type: 'string',
    },
  },
}
```

Using the same method other models can inherit the same base attributes by extending the base details model.


>Tips:
>- You can use actual NPM packages to create your base models and use them in different apps:
>   - `... extend('my-base-model', {...});`
>   - In that example `my-base-model` is a NPM package installed as a dependency using NPM ie: `npm i my-base-model`.
>- You can specify multiple modules to require by passing an array of module names or paths:
>   - `... extend(['my-base-model', 'my-other-base-model', ... ], {...});`
>   - Each module will extend the one before it in the order of left to right
>   - The final module will be a merge of all the fiven modules
>- You can specify multiple extending objects, all of them will extend the given module(s):
>   - `... extend(['my-base-model', 'my-other-base-model', ... ], {...}, {...}, {...}, ... );`
>- To extend using only modules pass in an empty extending object:
>   - `... extend(['my-base-model', 'my-other-base-model', ... ], {});`
>   - The modules will extend each other as usual, but the extending object will just be nothing.
>   - It works the same if you pass just the first param `... extend(['my-base-model', 'my-other-base-model', ... ]);`


## Author

Emmanuel Mahuni. (c) 2018 MIT


## Attributions

Andy Sutherland [Sails Model Extension Example](https://github.com/asuthy/extend-sails-model)

---
