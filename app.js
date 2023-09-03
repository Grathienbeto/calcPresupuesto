const wordQuantityInput = document.querySelector(".input_palabras");
const btnCalcular = document.querySelector(".btnCalcular");
const corrElem = document.getElementsByName("checkCorr");
const maqElem = document.getElementsByName("maquetacion");
const maqDig = document.querySelector("#check1m");

const tipoPortada = document.getElementsByName("tipoPortada");
const formato = document.getElementsByName("formato");
const complejidad = document.getElementsByName("complejidad");

btnCalcular.addEventListener("click", (e) => {
  e.preventDefault();

  const palabras = getWordCount();

  const totalCorreccion = calculateCorreccion(palabras);
  const totalMaquetacion = calculateMaquetacion(palabras);
  const totalPortada = calcularPortada();
  const total = totalCorreccion + totalMaquetacion + totalPortada;

  pintarResultado(total);
});

// Recibe la cantidad de la palabras introducidos por el usuario
function getWordCount() {
  return wordQuantityInput.value;
}

// Calcula el subtotal de la seccion correccion
function calculateCorreccion(palabras) {
  let parcialCorreccion = 0;

  if (corrElem[0].checked) {
    parcialCorreccion += 3 * (palabras / 1000);
  }

  if (corrElem[1].checked) {
    parcialCorreccion += 2 * (palabras / 1000);
  }

  if (corrElem[2].checked) {
    if (palabras <= 30999) {
      parcialCorreccion += 45;
    } else if (palabras <= 50999) {
      parcialCorreccion += 60;
    } else if (palabras <= 80999) {
      parcialCorreccion += 85;
    } else if (palabras <= 100999) {
      parcialCorreccion += 120;
    } else if (palabras <= 150999) {
      parcialCorreccion += 165;
    } else if (palabras > 150999) {
      parcialCorreccion += 220;
    }
  }

  if (corrElem[3].checked && corrElem[2].checked === false) {
    if (palabras <= 30999) {
      parcialCorreccion += 35;
    } else if (palabras <= 50999) {
      parcialCorreccion += 50;
    } else if (palabras <= 80999) {
      parcialCorreccion += 70;
    } else if (palabras <= 100999) {
      parcialCorreccion += 95;
    } else if (palabras <= 150999) {
      parcialCorreccion += 125;
    } else if (palabras > 150999) {
      parcialCorreccion += 160;
    }
  }

  if (corrElem[4].checked) {
    parcialCorreccion += 1.5 * (palabras / 1000);
  }

  return parcialCorreccion;
}

corrElem[2].addEventListener("click", () => {
  corrElem[3].checked = true;
});

// Calculo de el subtotal de la seccion maquetacion
function calculateMaquetacion(palabras) {
  let parcialMaquetacion = 0;
  if ((maqElem[0].checked || maqElem[1].checked) && maqDig.checked) {
    if (maqElem[0].checked) {
      parcialMaquetacion += calcularMaquetacion(palabras, 0);
    } else if (maqElem[1].checked) {
      parcialMaquetacion += calcularMaquetacion(palabras, 1);
    }
    parcialMaquetacion += calcularDigital(palabras, 0);
  } else if (maqElem[0].checked || maqElem[1].checked) {
    if (maqElem[0].checked) {
      parcialMaquetacion += calcularMaquetacion(palabras, 0);
    } else if (maqElem[1].checked) {
      parcialMaquetacion += calcularMaquetacion(palabras, 1);
    }
  } else if (
    maqElem[0].checked === false &&
    maqElem[1].checked === false &&
    maqDig.checked
  ) {
    parcialMaquetacion += calcularDigital(palabras, 1);
  }

  return parcialMaquetacion;
}

function calcularMaquetacion(palabras, value) {
  let parcial = 0;
  const precios = [
    [2.25, 2, 1.8, 1.5],
    [4, 3.7, 3.5, 3.3],
  ];

  if (palabras <= 20999) {
    parcial += precios[value][0] * (palabras / 1000);
  } else if (palabras <= 50999) {
    parcial += precios[value][1] * (palabras / 1000);
  } else if (palabras <= 100999) {
    parcial += precios[value][2] * (palabras / 1000);
  } else if (palabras > 100999) {
    parcial += precios[value][3] * (palabras / 1000);
  }

  return parcial;
}

function calcularDigital(palabras, value) {
  let parcial = 0;
  const precios = [
    [18, 35, 65, 80],
    [30, 70, 90, 120],
  ];

  if (palabras <= 20999) {
    parcial += precios[value][0];
  } else if (palabras <= 50999) {
    parcial += precios[value][1];
  } else if (palabras <= 100999) {
    parcial += precios[value][2];
  } else if (palabras > 100999) {
    parcial += precios[value][3];
  }

  return parcial;
}

// Calculo de el subtotal de la Portada
function calcularPortada() {
  let parcial = 0;

  if (tipoPortada[0].checked) {
    if (formato[0].checked) {
      if (complejidad[0].checked) {
        parcial += 20;
      }
      if (complejidad[1].checked) {
        parcial += 40;
      }
    } else if (formato[1].checked) {
      if (complejidad[0].checked) {
        parcial += 40;
      }
      if (complejidad[1].checked) {
        parcial += 70;
      }
    }
  }
  if (tipoPortada[1].checked) {
    if (formato[0].checked) {
      if (complejidad[0].checked) {
        parcial += 64;
      }
      if (complejidad[1].checked) {
        parcial += 94;
      }
    } else if (formato[1].checked) {
      if (complejidad[0].checked) {
        parcial += 94;
      }
      if (complejidad[1].checked) {
        parcial += 120;
      }
    }
  }

  return parcial;
}

// Pinta el resultado en pantalla
function pintarResultado(total) {
  const displayDiv = document.querySelector("#resultado");
  displayDiv.innerHTML = `<p>TOTAL: $${total}</p>
  <p>COMISION CON PAYPAL: $${total * 1.054 + 0.3}</p>`;
}
