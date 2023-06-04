import React from 'react'
import { posicionesLigaArgentina } from '@/app/api/allsports'
import Posiciones from '../components/Ligas/LigaArgentina/Posiciones'

function Page({ posiciones }: { posiciones: Posiciones[] }) {
  // Renderiza los datos en una tabla de posiciones
  return (
    <div>
      <h1>Tabla de posiciones</h1>
      <table>
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {posiciones && posiciones.map((equipo) => (
            <tr key={equipo.standing_team}>
              <td>{equipo.standing_team}</td>
              <td>{equipo.standing_PTD}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Utiliza getServerSideProps para obtener los datos del servidor
export async function getServerSideProps() {
  // Llama a la función posicionesLigaArgentina para obtener los datos
  const posiciones = await posicionesLigaArgentina();

  // Devuelve los datos como propiedades para el componente Page
  return {
    props: {
      posiciones,
    },
  };
}

export default Page;