exports.seed = function (knex) {
  
  return knex('resources')
    .truncate()
    .then(function () {
      
      return knex('resources').insert([
        { name: 'food', quantity: 100 },
        { name: 'gold', quantity: 200 },
        { name: 'wood', quantity: 150 },
        { name: 'stone', quantity: 120 },
      ]);
    });
};
