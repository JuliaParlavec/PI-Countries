const { Router } = require("express");
const axios = require("axios");
const { Countries, Activities } = require("../db");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/*Aquí se trae toda la información de la API y se la envía a la base de datos.*/
const apiInfo = async () => {
  const AllApi = await axios.get("https://restcountries.com/v3/all");

  const allCountries = AllApi.data.map((x) => {
    return {
      id: x.cca3,
      name: x.name.common,
      flags: x.flags[0], 
      region: x.region,
      capital: x.capital ? x.capital : [],
      subregion: x.subregion,
      area: x.area,
      population: x.population,
    };
  });
  await Countries.bulkCreate(allCountries);
}; 

/*Este callback se encarga de dos cosas. Primero se fija si hay un query por parámetro.
En ese caso, envía el país específico. De lo contrario envía todos los países.*/
router.get("/countries", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const countryName = await Countries.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        include: {
          model: Activities,
        },
      });
      
      if (countryName) {
        res.json(countryName);
      } else {
        res.json("Name of city not equal country exist");
      }
    } else {
      const verification = await Countries.count();
      if (verification > 1) {
        const data = await Countries.findAll();
        res.json(data);
      } else {
        await apiInfo();
        const data = await Countries.findAll();
        res.json(data);
      }
    }
  } catch (error) {
    res.json(error);
  }
});

/*Este callback se encarga de crear una nueva actividad y guardarla en la base de datos.*/
router.post("/activities", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body; 

  if (name && difficulty && duration && season && countries) {
    const [instance] = await Activities.findOrCreate({
      where: {
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
      },
    });

    countries.forEach(async (countryName) => {
      const pais = await Countries.findOne({ where: { name: countryName } });
      await pais.addActivity(instance); 
    });

    res.send("Activity created successfully.");
  } else {
    return res
      .status(400)
      .json({ message: "The activity could not be created." });
  }
});

/*Este callback se encarga de enviar un país específico pedido mediante parámetro.*/
router.get("/countries/:id", async (req, res) => {
  const { id } = req.params;

  if (id) {
    let pais = await Countries.findOne({
      where: { id: { [Op.iLike]: `%${id}%` } },
      include: {
        model: Activities,
        attributes: ["name", "difficulty", "duration", "season"],
        through: { attributes: [] },
      },
    });
    pais
      ? res.status(200).json(pais)
      : res.status(404).json("The entered country is not found.");
  }
});

/*Este callback se encarga de dos cosas. Primero se fija si hay un query por parámetro.
En ese caso, envía el país específico. De lo contrario envía todos los países.*/
router.get("/allActivities", async (req, res) => {
  try {
    const allActivities = await Activities.findAll();
    const { name } = req.query; 

    if (name) {
      const hasActiv = await Countries.findAll({
        include: Activities,
      });

      const count = await hasActiv.filter((x) => {
        for (let i = 0; i < x.activities.length; i++) {
          if (x.activities[i].name.toLowerCase() === name.toLowerCase()) {
            return true;
          }
        }
      });

      if (count.length) {
        return res.status(200).send(count);
      } else {
        return res
          .status(404)
          .send("There are no countries with that activity.");
      }
    }

    res.status(200).send(allActivities);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
