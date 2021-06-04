const reservas = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

//Por cada persona adicional sumarle 40 € al precio de cada noche.
//IVA sumarle un 21% al total.

class ReservasHotel {
  constructor() {
    this._reservash = [];
    this._subtotal = 0;
    this._total = 0;
  }

  calculaSubtotal() {
    this._subtotal = this._reservash.reduce(
      (acumulado, { tipoHabitacion, desayuno, pax, noches }) => {
        let cantidad = (pax - 1) * 40;
        if (tipoHabitacion === "standard") {
          if (desayuno) cantidad += pax * 15;
          return acumulado + (cantidad + 100) * noches;
        } else {
          if (desayuno) cantidad += pax * 15;
          return acumulado + (cantidad + 150) * noches;
        }
      },
      0
    );
  }

  calculaTotal() {
    this._total = this._subtotal * 1.21;
  }

  get subtotal() {
    return this._subtotal;
  }

  get total() {
    return this._total;
  }

  set reservash(reservas) {
    this._reservash = reservas;
    this.calculaSubtotal();
    this.calculaTotal();
  }
}

class ReservasHotelTour extends ReservasHotel {
  calculaSubtotal() {
    this._subtotal = this._reservash.reduce(
      (acumulado, { desayuno, pax, noches }) => {
        let cantidad = (pax - 1) * 40;
        if (desayuno) cantidad += pax * 15;
        return acumulado + (cantidad + 100) * noches;
      },
      0
    );
  }
  calculaTotal() {
    this._total = this._subtotal * 1.21 * 0.85;
  }
}

console.log("** Reservas de hotel normales ***");
const reserva = new ReservasHotel();
reserva.reservash = reservas;
console.log("subtotal", reserva.subtotal);
console.log("total", reserva.total);

console.log("** Reservas de hotel para tour operador ***");
const reservatour = new ReservasHotelTour();
reservatour.reservash = reservas;
console.log("subtotal", reservatour.subtotal);
console.log("total", reservatour.total);
