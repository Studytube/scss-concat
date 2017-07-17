let scssConcat = require('../scss-concat');

scssConcat.concat({
	src: './tests/vectors/test1/index.scss',
	dest: './tests/concatenationmagic.scss'
});


scssConcat.concat({
	src: './tests/vectors/test1/index.scss'
}).then(fileContent => console.log(fileContent.length));