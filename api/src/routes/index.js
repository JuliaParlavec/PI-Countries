const { Router } = require('express');
const axios = require('axios')
const {Countries, Activities} = require ('../db')
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//- [ ] __GET /countries__:
// - En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
// - Obtener un listado de los paises.
// - [ ] __GET /countries?name="..."__:
//   - Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
//   - Si no existe ningún país mostrar un mensaje adecuado
router.get('/countries', async (req, res) => {
    const {name} = req.query; //lo que escribo en la url, en el front de usa para usar por nombre
    const api = await axios.get('https://restcountries.com/v3/all') //traigo la info de la api y la guardo en api
    
    const info = api.data.map(x => { //q me guarde en la variable info solo lo que me interesa, q es lo que le voy a pasar abajo
        return {
            id: x.cca3, 
            name: x.name.common,
            flags: x.flags[0], //devuelve dos links, por eso pongo el primero ([0])
            region: x.region,
            capital: x.capital ? x.capital : [],
            subregion: x.subregion,
            area: x.area,
            population: x.population
        }
    }); 
    await Countries.bulkCreate(info) //info -> array, bulcreate va creando cada elemento del array 
    if (name) { //si hay un pais q me pasan por query 
        const countryName = await Countries.findAll({
            where: {
              name: {
                [Op.iLike]: "%" + name + "%",
              },
              include: {
                model: Activities,
                attributes: ["name", "difficulty", "duration", "season"],
                through: { attributes: [] },
              }}})
              
        countryName.length ? //si tiene un largo -> si esta
        res.status(200).send(countryName): //se envia un 200 con el pais
        res.status(404).send('The entered country is not found.')
    } else { //osea si no hay un query 
        res.status(200).send(info) //manda el listado de paises.
    }
})


// - [ ] __POST /activities__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
//   - Crea una actividad turística en la base de datos, relacionada con los países correspondientes

router.post('/activities', async (req,res) => {
    const {name, difficulty, duration, season, countries } = req.body; //creo una constante con todo lo que me quiero traer por body y q me pase los paises tambien
   
    if (name && difficulty && duration && season && countries) { //si pasa todas las propiedades
        const [instance] = await Activities.findOrCreate({ //que se fije si esta o que cree dentro de actividades la nueva actividad y la guarde dentro
            // de la constante instance, los corchetes son un destructuring ya q el fin or create hace un arreglo con la propiedad instance: donde se guarda la actividad, entonces como q ahi entras durectamente
          where: {
            name: name,
            difficulty: difficulty,
            duration: duration,
            season: season,
          },
        });

    countries.forEach(async (countryName) => { //dentro de los countries que me pasa, le hago un foreach, q vaya iterando y guarde dentro de la constante pais, aquel que dentro del modelo country, el nombre del pais coincida con el nombre que me pasaron
        const pais = await Countries.findOne({ where: { name: countryName } });
      
        await pais.addActivity(instance); //entonces una vez encontrado, sequalize crea la funcion addAvtivity donde le podemos sumar al modelo de actividad la actividad (q previamente habiamos guardado en instancia)
        });    
        
    res.send("Activity created successfully.");
    } else {
      return res.status(400).json({ message: "The activity could not be created."});
    }
})

// - [ ] __GET /countries/{idPais}__:
//   - Obtener el detalle de un país en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de país
//   - Incluir los datos de las actividades turísticas correspondientes
router.get('/countries/:id', async (req, res) => {
    const {id} = req.params //es lo que me pasan por parametro
    
    if(id) { //si me pasan un id
        let pais = await Countries.findOne({ //devuelve como objeto
            where: { id: { [Op.iLike]: `%${id}%` } },
            include: {
              model: Activities,
              attributes: ["name", "difficulty", "duration", "season"],
              through: { attributes: [] },
            },
          });
            console.log(pais)
        pais ?
        res.status(200).json(pais) :
        res.status(404).json('The entered country is not found.')
    }
})

module.exports = router;

