'use strict'

/*
|--------------------------------------------------------------------------
| OfficeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Office = use('App/Models/Office')

class OfficeSeeder {
  async run() {
    await Office.createMany([
      { name: 'Estagiário de Desginer Gráfico' },
      { name: 'Designer Gráfico Júnior' },
      { name: 'Designer Gráfico Pleno' },
      { name: 'Designer Gráfico Senior' },
      { name: 'Estagiário Administrativo' },
      { name: 'Auxiliar Administrativo Júnior' },
      { name: 'Auxiliar Administrativo Pleno' },
      { name: 'Auxiliar Administrativo Senior' },
      { name: 'Analista Administrativo Júnior' },
      { name: 'Analista Administrativo Pleno' },
      { name: 'Analista Administrativo Senior' },
      { name: 'Gerente Administrativo Júnior' },
      { name: 'Gerente Administrativo Pleno' },
      { name: 'Gerente Administrativo Senior' },
      { name: 'Estagiário de Marketing' },
      { name: 'Auxiliar de Marketing Júnior' },
      { name: 'Auxiliar de Marketing Pleno' },
      { name: 'Auxiliar de Marketing Senior' },
      { name: 'Analista de Marketing Júnior' },
      { name: 'Analista de Marketing Pleno' },
      { name: 'Analista de Marketing Senior' },
      { name: 'Gerente de Marketing Júnior' },
      { name: 'Gerente de Marketing Pleno' },
      { name: 'Gerente de Marketing Senior' },
      { name: 'Estagiário TI' },
      { name: 'Téc. Informática Júnior' },
      { name: 'Téc. Informática Pleno' },
      { name: 'Téc. Informática Senior' },
      { name: 'Tecnologo da Informação Júnior' },
      { name: 'Tecnologo da Informação Pleno' },
      { name: 'Tecnologo da Informação Senior' },
      { name: 'Téc. Infra Instrutura Júnior' },
      { name: 'Téc. Infra Instrutura Pleno' },
      { name: 'Téc. Infra Instrutura Senior' },
      { name: 'Analista de infra instrutura Júnior' },
      { name: 'Analista de infra instrutura Pleno' },
      { name: 'Analista de infra instrutura Senior' },
      { name: 'Dev Estagiário' },
      { name: 'Dev Front-End Júnior' },
      { name: 'Dev Front-End Pleno' },
      { name: 'Dev Front-End Senior' },
      { name: 'Dev Back-End Júnior' },
      { name: 'Dev Back-End Pleno' },
      { name: 'Dev Back-End Senior' },
      { name: 'Dev Ops Júnior' },
      { name: 'Dev Ops Pleno' },
      { name: 'Dev Ops Senior' },
      { name: 'CTO' },
      { name: 'CDO' },
      { name: 'DPO' },
      { name: 'COO' },
      { name: 'CEO' },
    ])
  }
}

module.exports = OfficeSeeder
