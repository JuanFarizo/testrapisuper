exports.seed = async (knex) => {
  try {
    await knex('address').del();
    await knex('address').insert([{
      id: 1,
      address: 'Arturo Illia 752',
      city: 'San Carlos Centro',
      userID: 1,
    }, ]);
  } catch (error) {
    console.log(error);
  }
};

// exports.seed = (knex) => {
//   return knex('address')
//     .del()
//     .then(() => {
//       return knex('address').insert([
//         {
//           id: 1,
//           address: 'Arturo Illia 752',
//           city: 'San Carlos Centro',
//           userID: 1,
//         },
//       ]);
//     });
// };