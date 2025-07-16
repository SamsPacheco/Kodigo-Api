import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import { cancelBooking, getBookings } from "../services/bookingsService";
import { ModalDetalleReservaciones, Sidebar } from "../components";
import Swal from "sweetalert2";

const Calendario = styled.div`
  width: 90%;
  margin: 20px auto;

  .fc {
    background-color: #f0f0f0;
  }

  .fc-event {
    margin: 2px;
    font-weight: bold;
    padding: 5px;
  }

  .fc .fc-col-header-cell-cushion {
    color: #000;
    font-weight: bold;
  }

  .fc-daygrid-day-number {
    color: #000 !important;
    text-decoration: none !important;
  }
`;

const Input = styled.input`
  width: 18rem;
`;

const Button = styled.button`
  width: 11rem;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;

const Consultar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  label {
    margin-right: 10px;
    font-weight: bold;
  }
`;

export const Bookings = () => {
  const [events, setEvents] = useState([]);
  const [filterAccommodation, setFilterAccommodation] = useState("");
  const [allBookings, setAllBookings] = useState([]);
  const [modalDetalleRecervaciones, setModalDetalleRecervaciones] =
    useState(false);
  const [reservacionSeleccionada, setReservaSeleccionada] = useState(null);

  const calcularNoches = (inicio, fin) => {
    const inDate = new Date(inicio);
    const outDate = new Date(fin);
    const diff = Math.abs(outDate - inDate);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Carga inicial de datos
  const obtenerdatos = async () => {
    try {
      const response = await getBookings();
      setAllBookings(response);
      filtrarEventos(response, filterAccommodation);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Función para filtrar los eventos según accommodation
  const filtrarEventos = (bookings, filter) => {
    const eventosFiltrados = bookings
      .filter((res) =>
        filter === ""
          ? true
          : res.accomodation.toLowerCase().includes(filter.toLowerCase())
      )
      .map((res) => ({
        id: res.id,
        title: `${res.user} - ${res.accomodation}`,
        start: res.check_in_date,
        end: res.check_out_date,
        color: res.status === "CONFIRMED" ? "green" : "red",
        titleTooltip: "Estado: " + res.status,
      }));
    setEvents(eventosFiltrados);
  };

  // Cuando cambia el filtro, actualizar los eventos
  const handleFilterChange = (e) => {
    const filtro = e.target.value;
    setFilterAccommodation(filtro);
    filtrarEventos(allBookings, filtro);
  };

  useEffect(() => {
    obtenerdatos();
  }, []);

  return (
    <>
      <section className="d-flex">
        <Sidebar />
        <main className="p-4 flex-grow-1 position-relative">
          <Calendario>
            {/* Selector para filtrar */}
            <div style={{ marginBottom: "1rem" }}>
              <Consultar>
                <div>
                  <label htmlFor="filter">Filtrar por alojamiento: </label>
                  <Input
                    type="text"
                    id="filter"
                    value={filterAccommodation}
                    onChange={handleFilterChange}
                    placeholder="Escribe el nombre del alojamiento..."
                  />
                </div>
                <Button type="submit" className="btn btn-dark">
                  + Nueva reservación
                </Button>
              </Consultar>
            </div>
            {/* Calendario */}
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              buttonText={{ today: "Mes actual" }}
              height={"80vh"}
              eventDidMount={(info) => {
                info.el.setAttribute(
                  "title",
                  info.event.extendedProps.titleTooltip
                );
              }}
              eventClick={(info) => {
                const id = Number(info.event.id);
                const reserva = allBookings.find((b) => b.id === id);
                if (reserva) {
                  setReservaSeleccionada({
                    id: reserva.id,
                    estado: reserva.status,
                    nombre: reserva.accomodation,
                    direccion: reserva.address || "Dirección no disponible",
                    checkIn: reserva.check_in_date,
                    checkOut: reserva.check_out_date,
                    huesped: reserva.user,
                    noches: calcularNoches(
                      reserva.check_in_date,
                      reserva.check_out_date
                    ),
                  });
                  setModalDetalleRecervaciones(true);
                }
              }}
            />
            {modalDetalleRecervaciones && reservacionSeleccionada && (
              <ModalDetalleReservaciones
                datos={reservacionSeleccionada}
                cerrarModalDetalleReservaciones={() =>
                  setModalDetalleRecervaciones(false)
                }
                onCancelarReserva={async (id) => {
                  try {
                    console.log("se ejecuto onCncel",id)
                    await cancelBooking(id);
                    Swal.fire(
                      "Cancelada",
                      "La reservación ha sido cancelada",
                      "success"
                    );
                    setModalDetalleRecervaciones(false);
                    obtenerdatos();
                  } catch (error) {
                    Swal.fire("Error", error.message, "error");
                  }
                }}
              />
            )}
          </Calendario>
        </main>
      </section>
    </>
  );
};