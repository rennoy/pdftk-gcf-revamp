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

const util = require('util')
const exec = util.promisify(require('child_process').exec)

const files = async() => {
        const { stdout, stderr } = await exec('ls', ['a', '-l' ])
        if (stderr) {
                console.log(stderr)
        }   
        console.log(`the list of files in this directory is: ${stdout}`)
}
files()

try {
  if (fs.existsSync(`${PWD}/${BIN}/pdftk`)) {
    console.log("pdftk file found")
  }
} catch(err) {
  console.error(err)
}

module.exports.version = () => {
  return new Promise((resolve, reject) => {
    require('child_process').exec(
      `${process.env.PATH}/pdftk --version`,
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
