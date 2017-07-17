# scss-concat
Concatenation for scss files (not compilation)


# install

    npm install scss-concat


# use

## import

```
let scssConcat = require('../scss-concat');
```

## call concat method

```
scssConcat.concat({
	src: './tests/vectors/test1/index.scss',
	dest: './tests/concatenationmagic.scss'
});
```

or without dest, just to get concatenation result:

```
scssConcat.concat({
	src: './tests/vectors/test1/index.scss'
}).then(fileContent => console.log(fileContent.length));
```