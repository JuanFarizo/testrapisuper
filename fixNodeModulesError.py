# REQUISITOS:
# Tener instalado el package "script"
# Tener instalado python

# EJECUTAR CÓDIGO (en Atom)
# ctrl + shift + b || Y si no funciona: ctrl + shift + p -> script run


import fileinput
import sys

def replaceAll(file,searchExp,replaceExp):
    for line in fileinput.input(file, inplace=1):
        if searchExp in line:
            line = line.replace(searchExp,replaceExp)
        sys.stdout.write(line)

foldersList = ['admin', 'Client']

for folder in foldersList:
    file = folder + '/node_modules/eslint/lib/config.js'
    search = 'const directory = filePath ? path.dirname(filePath) : this.options.cwd'
    replace = 'const directory = this.options.cwd'
    replaceAll(file, search, replace)
    file = folder + '/node_modules/postcss-load-config/src/index.js'
    search = 'path = path ? resolve(path) : process.cwd()'
    replace = 'path = process.cwd()'
    replaceAll(file, search, replace)
