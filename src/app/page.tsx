import React from "react";
import {
  fetchMatches,
  fetchFixtureDayLigaProfesionalArgentina,
  ligaData,
} from "./api/allsports";
import { Fixture, Match, Liga } from "./types";
import Matches from "./components/Ligas/LigaArgentina/Matches"

async function IndexPage() {
  let matches: Match[] = [];
  let leagueData: Liga[] | null = null;
  try {
    matches = await fetchMatches();
    leagueData = await ligaData(); // Obtiene los datos de la liga
  } catch (error) {
    console.error("Error fetching matches:", error);
  }

  const fixtureDay = await fetchFixtureDayLigaProfesionalArgentina();

  return (
    <div>
      <h1>Fecha actual, resultados de Futbol</h1>
      <div>
        {fixtureDay && fixtureDay.length > 0 ? (
          <Matches
            matches={matches}
            fixtureDay={fixtureDay}
            leagueData={leagueData}
          />
        ) : (
          <p>Nada para mostrar</p>
        )}
      </div>
    </div>
  );
}

export default IndexPage;
