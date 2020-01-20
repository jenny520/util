const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const t = require('babel-types')
const generate = require('babel-generator').default
const path = require('path')

const code = fs.readFileSync(path.join(__dirname, './init.js'), 'utf-8')
const ast = babylon.parse(code, {
  sourceType: 'module'
})
const myVisitor = {
  IfStatement(path) {
    const consequent = path.node.consequent,
      alternate = path.node.alternate,
      test = path.node.test
    if (consequent && alternate) {
      let consequentExp = consequent.body[0],
        alternateExp = alternate.body[0]
      if (
        t.isReturnStatement(consequentExp) &&
        t.isReturnStatement(alternateExp)
      ) {
        let node = t.returnStatement(
          t.conditionalExpression(
            test,
            consequentExp.argument,
            alternateExp.argument
          )
        )
        path.replaceWith(node)
      }
    }
  }
}

traverse(ast, myVisitor)

const output = generate(ast, {}, code)
fs.writeFile(path.join(__dirname, './output.js'), output.code, err => {
  if (err) {
    console.log(err)
  }
})
