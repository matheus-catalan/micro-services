'use strict'

const Database = use('Database')

const SignatureContractDefaultHook = (exports = module.exports = {})

SignatureContractDefaultHook.create = async (contract) => {
  await Database.table('signature_contracts').insert({
    contract_id: contract.id,
  })
}
