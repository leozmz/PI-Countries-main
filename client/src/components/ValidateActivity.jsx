export default function ValidateForm(input) {
    let error = {};
    
    if (/\d/.test(input.name)) {
        error.name = "No se permiten números en el nombre de Actividad";
    }
    if (!/^[A-Z]+$/i.test(input.name)) {
        error.name = "La Actividad turística debe contener sólo letras";
    }
    if (!input.difficulty) {
        error.difficulty = "Seleccionar una Dificultad";
    }
    if (!input.duration) {
        error.duration = "Indicar duración (en horas) de la Actividad";
    }
    if (!input.season) {
        error.season = "Seleccionar una Temporada del año"
    }
    if (input.countryId.length === 0) {
        error.countryId = "Seleccionar uno o más países"
    }
    return error;
}