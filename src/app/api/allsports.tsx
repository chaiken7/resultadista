import { API_HOST } from "../utils/constats";
import moment from "moment-timezone";

//Partidos En Vivo
export async function fetchMatches() {
  const res = await fetch(
    `${API_HOST}met=Livescore&APIkey=19d778c06cfc0498ec695d894abf6596481f682e17ce3b78c094b2e82b0a3ffc&countryId=14&leagueId=44&timezone=America/Argentina/Buenos_Aires`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.result;
}

//Fixture del día actual
export async function fetchFixtureDayLigaProfesionalArgentina() {
  const currentDate = moment().tz("America/Argentina/Buenos_Aires");
  const from = currentDate.format("YYYY-MM-DD");
  const to = from;

  const res = await fetch(
    `${API_HOST}met=Fixtures&APIkey=19d778c06cfc0498ec695d894abf6596481f682e17ce3b78c094b2e82b0a3ffc&from=2023/5/29&to=${to}&countryId=14&leagueId=44&timezone=America/Argentina/Buenos_Aires`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.result;
}

//Liga
export async function ligaData() {
  const res = await fetch(
    `${API_HOST}met=Leagues&APIkey=19d778c06cfc0498ec695d894abf6596481f682e17ce3b78c094b2e82b0a3ffc&countryId=14`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.result;
}

//Posiciones
export async function posicionesLigaArgentina(){
  const res = await fetch(
    `${API_HOST}met=Standings&leagueId=207&APIkey=19d778c06cfc0498ec695d894abf6596481f682e17ce3b78c094b2e82b0a3ffc&leagueId=44`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.result;
}
