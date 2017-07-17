function getImports(content, baseDir) {
  const re = /@import ['"]([^'"]+)['"];/g;
  let imports = [];
  while ((m = re.exec(content)) !== null) {
    let filePath = m[1];
    let fileBaseDir = baseDir;
    if (filePath.includes('../../node_modules')) {
        fileBaseDir = '';
        filePath = filePath.replace('../../', '')
    }

    imports.push({
      path: defineExtension(path.join(fileBaseDir, filePath)),
      string2replace: m[0]
    });
  }
  return imports;
}

function defineExtension(filePath) {

  const justScss = filePath + '.scss';
  if (fs.existsSync(justScss)) {
    return justScss;
  }

  let temp = filePath.split('/');
  temp[temp.length - 1] =  '_' + temp[temp.length - 1];
  const dependancyPath = temp.join('/') + '.scss';
  if (fs.existsSync(dependancyPath)) {
    return dependancyPath;
  }
  if (fs.existsSync(filePath + '.css')) {
    return filePath + '.css';
  }

  throw new Error(`No file for module ${filePath}, ${JSON.stringify(errorTrancer)}`);
}


function concatScss(fullFilePath) {

  return readFile(fullFilePath)
    .then(fileContent => {
      //const imports = getImports(fileContent, path.dirname(fullFilePath)).filter(importInfo => !importInfo.path.includes('node_modules'));
      const imports = getImports(fileContent, path.dirname(fullFilePath));

      let innerPromises = [];

      if (imports.length > 0) {
        imports.forEach(importInfo => {
          let innerPromise = concatScss(importInfo.path);

          innerPromise.then(innerFileContent => {
            fileContent = fileContent.replace(importInfo.string2replace, innerFileContent);
          });

          innerPromises.push(innerPromise);
        });
      }

      return Promise.all(innerPromises).then(() => fileContent);
    });
}

let scssConcat = {};
scssConcat.concat = concatScss;
module.export=scssConcat;