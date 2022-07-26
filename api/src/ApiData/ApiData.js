const axios = require('axios')

// router.get('/countries', async (req, res) => {
//     const {name} = req.query; //lo que escribo en la url, en el front de usa para usar por nombre
//     const api = await axios.get('https://restcountries.com/v3/all') //traigo la info de la api y la guardo en api
    
//     const info = api.data.map(x => { //q me guarde en la variable info solo lo que me interesa, q es lo que le voy a pasar abajo
//         return {
//             id: x.cca3, 
//             name: x.name.common,
//             flags: x.flags[0], //devuelve dos links, por eso pongo el primero ([0])
//             region: x.region,
//             capital: x.capital ? x.capital : [],
//             subregion: x.subregion,
//             area: x.area,
//             population: x.population
//         }
//     }); 
//     await Countries.bulkCreate(info) //info -> array, bulcreate va creando cada elemento del array 
//     if (name) { //si hay un pais q me pasan por query 
//         const countryName = await Countries.findAll({
//             where: {
//               name: {
//                 [Op.iLike]: "%" + name + "%",
//               },
//               include: {
//                 model: Activities,
//                 attributes: ["name", "difficulty", "duration", "season"],
//                 through: { attributes: [] },
//               }}})
              
//         countryName.length ? //si tiene un largo -> si esta
//         res.status(200).send(countryName): //se envia un 200 con el pais
//         res.status(404).send('The entered country is not found.')
//     } else { //osea si no hay un query 
//         res.status(200).send(info) //manda el listado de paises.
//     }
// })


// else { //osea si no hay un query 
//   const verification= await Countries.count()
//   if(verification > 1){
//        const data = await Countries.findAll()
//       res.json(data)
//   }else{
//       await api()
//       const data = await Countries.findAll()
//       res.json(data)
//   }
// }

module.exports = apiData