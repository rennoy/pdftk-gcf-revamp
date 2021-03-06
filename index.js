const fs = require('fs');

const { PATH, PWD } = process.env

const BIN = 'node_modules/pdftk-gcf/bin'

console.log("PATH")
console.log(`${PATH}`)
console.log("PWD")
console.log(`${PWD}`)
console.log("new PATH")
console.log(`${PATH}:${PWD}/${BIN}`)
console.log("LD_LIBRARY_PATH")
console.log(`${PWD}/${BIN}`)
console.log("PKG_CONFIG_PATH")
console.log(`${PWD}/${BIN}`)

process.env.PATH = `${PATH}:${PWD}/${BIN}`
process.env.LD_LIBRARY_PATH = `${PWD}/${BIN}`
process.env.PKG_CONFIG_PATH = `${PWD}/${BIN}`

try {
  if (fs.existsSync(`${PWD}/${BIN}/pdftk`)) {
    console.log("pdftk file found")
    
    try {
      fs.accessSync(`${PWD}/${BIN}/pdftk`, fs.constants.X_OK);
      console.log('can execute');
    } catch (err) {
      console.error('no executable access!');
    } 

    try {
      fs.accessSync(`${PWD}/${BIN}/pdftk`, fs.constants.R_OK);
      console.log('can read');
    } catch (err) {
      console.error('no read access!');
    }
    
  }
} catch(err) {
  console.error(err)
}

module.exports.version = () => {
  return new Promise((resolve, reject) => {
    require('child_process').exec(
      `pdftk --version`,
      (error, stdout, stderr) => {
        if (error) reject(error)
        else resolve(stdout)
      }
    )
  })
}

module.exports.flatten = (path, out_file) => {
  return new Promise((resolve, reject) => {
    require('child_process').exec(
      'pdftk ' + path + ' output ' + out_file + ' flatten' ,
      (error, stdout, stderr) => {
        if (error) reject(error)
        else resolve(stdout)
      }
    )
  })
}

module.exports.fill_and_flatten = (path_to_form, path_to_fdf, path_to_out_file) => {
  return new Promise((resolve, reject) => {
    require('child_process').exec(
      'pdftk ' + path_to_form + ' fill_form ' + path_to_fdf + ' output ' + path_to_out_file + ' flatten' ,
      (error, stdout, stderr) => {
        if (error) reject(error)
        else resolve(stdout)
      }
    )
  })
}
