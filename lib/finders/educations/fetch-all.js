const _ = require('lodash')
const bodybuilder = require('bodybuilder')
const { connection, item: { findAll } } = require('../../elasticsearch/index')

const DOCUMENTS_LIMIT = 200

module.exports = async (context) => {
  const body = bodybuilder()
    .sort('@timestamp', 'asc')
    .size(DOCUMENTS_LIMIT)
    .build()

  const queryResult = await findAll(connection, { index: `publisher-${context.publisherId}-educations`, body })

  return _.isEmpty(queryResult.body.hits.hits) ? [] : queryResult.body.hits.hits
}