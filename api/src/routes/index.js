const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/////////////////////////////////////////////////
// Funciones controladoras
/////////////////////////////////////////////////
// Función controladora p/ extraer info desde la API.
const getCountriesInfoFromApi = async () => {
    try {
        // Traemos todos los países desde la API restcountries con las propiedades solicitadas.
        const countriesApiUrl = await axios.get('https://restcountries.com/v3/all');
        const countriesApiInfo = await countriesApiUrl.data.map(el => {
            return {
                id: el.cca3,
                name: el.name.common,
                img: el.flags[1],
                continent: el.continents[0],
                capital: el.capital ? el.capital[0] : 'No existe Capital',
                subregion: el.subregion ? el.subregion : 'No existe Subregión',
                area: el.area,
                population: el.population
            };
        });
        // Guardarmos la info extraída en su base de datos (countries).
        const countriesDbInfo = await Country.bulkCreate(countriesApiInfo);
        return countriesDbInfo;
    } catch (error) { res.send(error) }
};
// Invocamos la función para cargar la BD.
getCountriesInfoFromApi();

// Función controladora para extraer los países desde la BD (sin las actividades turísticas).
async function getCountriesInfoFromDb() {
    try {
        const countries = await Country.findAll({
            include: {
                model: Activity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: []
                }
            }
        });
        return countries;
    } catch (error) { console.log(error); }
};

/////////////////////////////////////////////////
// Rutas
/////////////////////////////////////////////////

// GET /countries y GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto).
// Si no existe ningún país mostrar un mensaje adecuado.
// Obtener un listado de los paises.
router.get('/countries', async (req, res) => {
    const { name } = req.query;
    const totalCountries = await getCountriesInfoFromDb();
    //console.log(totalCountries);
    if (name) {
        let countryName = await totalCountries
            .filter(el => el.name
                .toLowerCase()
                .includes(name.toLowerCase()));

        countryName ?
            res.status(200).send(countryName) :
            res.status(404).send('No se encuentra el país.');
    } else {
        res.status(200).send(totalCountries);
    };
});

// GET /activity
router.get('/activity', async (req, res) => {
    const findActivity = await Activity.findAll();
    res.send(findActivity);
})

// DELETE /activity/:id
router.delete('/activity/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAct = await Activity;

        await deleteAct.destroy({
            where: { id: id }
        });
        res.send('Actividad eliminada')
    }
    catch (error) {
        res.status(404).send(error);
    }
});

// POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body.
// Crea una actividad turística en la base de datos.
router.post('/activity', async (req, res) => {
    const {
        name,
        difficulty,
        duration,
        season,
        countryId } = req.body;

    let [activityMatch, created] = await Activity.findOrCreate({
        where: { name: name },
        defaults: {
            name: name,
            difficulty: difficulty,
            duration: duration,
            season: season
        }
    });

    const countrySelectedByActivity = await Country.findAll({ where: { id: countryId } });
    console.log('countrySelectedByActivity', countrySelectedByActivity);

    for (let value of countrySelectedByActivity) {
        await value.addActivity(activityMatch.dataValues.id);
    }

    res.status(200).send('¡Actividad creada con éxito!');
});

// GET /countries/{idPais}:
// Obtener el detalle de un país en particular.
// Debe traer solo los datos pedidos en la ruta de detalle de país.
// Incluir los datos de las actividades turísticas correspondientes.
router.get('/countries/:countryId', async (req, res) => {
    try {
        const { countryId } = req.params;
        const getCountryById = await Country.findByPk(
            countryId.toUpperCase(),
            {
                include: {
                    model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through: {
                        attributes: []
                    }
                }
            }
        );
        getCountryById ?
            res.json(getCountryById) :
            res.status(404).send('El ID del país ingresado no existe.');
    } catch (error) {
        res.status(404).send(error);
    };
});

module.exports = router;