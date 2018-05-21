exports.seed = function(knex, Promise) {
  return knex('users').del()
  .then(function () {
    return knex('users').insert([
      {
        id: 1,
        email: 'nigel@email.com',
        password: 'password0'
      },
      {
        id: 2,
        email: 'nakaz@email.com',
        password: 'password1'
      },
      {
        id: 3,
        email: 'jaywon@email.com',
        password: 'password2'
      }
    ]);
  });
};