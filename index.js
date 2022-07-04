const { PATH, CODE_LOCATION } = process.env

const BIN = 'node_modules/pdftk-gcf/bin'

console.log("pointers")
console.log(`${PATH}:${CODE_LOCATION}/${BIN}`)
console.log(`${CODE_LOCATION}/${BIN}`)

process.env.PATH = `${PATH}:${CODE_LOCATION}/${BIN}`
process.env.LD_LIBRARY_PATH = `${CODE_LOCATION}/${BIN}`
process.env.PKG_CONFIG_PATH = `${CODE_LOCATION}/${BIN}`

module.exports.version = () => {
  return new Promise((resolve, reject) => {
    require('child_process').exec(
      'pdftk --version',
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
