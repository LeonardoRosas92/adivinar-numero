/* eslint-disable no-await-in-loop */
import Swal from "sweetalert2";
let intentos = 0;
const btnIniciar = document.querySelector("#btnIniciar");

const adivinarNumero = async () => {
  let min = 1;
  let max = 100;

  while (min <= max) {
    const medio = Math.floor((min + max) / 2);
    const respuesta = await preguntar(`¿Es ${medio} tu número?`);
    intentos++;
    console.log(respuesta);
    if (respuesta) {
      mostrarMensaje(`¡Adiviné tu número (${medio}) en ${intentos} intentos!`);
      break;
    } else if (medio > 1) {
      const pista = await preguntar(`¿Tu número es menor que ${medio}?`);
      if (pista) {
        max = medio - 1;
      } else {
        min = medio + 1;
      }
    } else {
      mostrarMensaje("¡No has dicho la verdad! Tu número no puede ser menor que 1.", "error");
      break;
    }
  }
};

const preguntar = async (mensaje) => {
  const promesa = Swal.fire({
    title: mensaje,
    showDenyButton: true,
    confirmButtonText: "Si",
    denyButtonText: "No",
  }).then((result) => result.isConfirmed);
  const res = await promesa.then(response => response);
  return res;
};

const mostrarMensaje = (mensaje, icon = "success") => {
  Swal.fire({
    icon,
    text: mensaje,
  });
};
const initGame = async () => {
  intentos = 0;
  adivinarNumero();
};

btnIniciar.addEventListener("click", initGame);
