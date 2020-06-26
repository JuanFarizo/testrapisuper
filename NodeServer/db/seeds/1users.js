const bcrypt = require('bcryptjs');

exports.seed = async (knex) => {
  try {
    //Borra user
    await knex('user').del();

    //Inserta user
    await knex('user').insert([{
        id: 1,
        email: 'NaN@NaN.com',
        username: 'NaN',
        password: await bcrypt.hash('NaN9999999999999999', 12),
        // firstName: 'NaN',
        // lastName: 'NaN',
        // birthDate: new Date(),
        // gender: 'Other',
      },
      {
        id: 2,
        email: 'admin@gmail.com',
        username: 'admin',
        password: await bcrypt.hash('admin', 12),
        // firstName: 'AdminName',
        // lastName: 'AdminLastName',
        // birthDate: new Date(),
        // gender: 'Male',
        role: 'admin',
      },
      {
        id: 3,
        email: 'user@gmail.com',
        username: 'user',
        password: await bcrypt.hash('user', 12),
        // firstName: 'UserName',
        // lastName: 'UserLastName',
        // birthDate: new Date(),
        // gender: 'Male',
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

// Otra forma de escribirlo
// exports.seed = (knex) => {
//   return knex('user')
//     .del()
//     .then(() => {
//       return knex('user').insert([
//         {
//           id: 1,
//           email: 'hola@gmail.com',
//           username: 'test',
//           password: 'test',
//         },
//       ]);
//     });
// };