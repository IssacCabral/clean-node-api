/**Esse aqui tem tudo que o jest.config.js tinha, mas estou alterando
 * a propriedade .testMatch para rodar apenas os testes unitários(com .spec no nome) */
const config = require('./jest.config')
config.testMatch = ["**/*.spec.ts"]
module.exports = config