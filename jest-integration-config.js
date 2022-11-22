/**Esse aqui tem tudo que o jest.config.js tinha, mas estou alterando
 * a propriedade .testMatch para rodar apenas os testes de integração(com .test no nome) */
const config = require('./jest.config')
config.testMatch = ["**/*.test.ts"]
module.exports = config