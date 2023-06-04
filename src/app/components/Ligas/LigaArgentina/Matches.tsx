import React from "react";
import { Match, Fixture, Liga, LigaProps } from "@/app/types";

const Home: React.FC<LigaProps> = ({ matches, fixtureDay, leagueData }) => {
  let leagueName = ""; // Variable para almacenar el nombre de la liga

  // Verificar y asignar el nombre de la liga
  if (leagueData) {
    leagueData.forEach((liga) => {
      if (
        !leagueName &&
        (liga.league_key === matches?.[0]?.league_key ||
          liga.league_key === fixtureDay[0].league_key)
      ) {
        leagueName = liga.league_name;
      }
    });
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="fixture">
            <div className="row">
              <div className="col-12">
                {leagueName && (
                  <div className="d-flex align-items-center league-space">
                    <img
                      className="league-logo"
                      src={
                        leagueData &&
                        leagueData.find(
                          (liga) => liga.league_name === leagueName
                        )?.league_logo
                      }
                      alt="League Logo"
                    />
                    <div className="league-name">
                      {leagueName && <h2>{leagueName}</h2>}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {fixtureDay.map((fixture: Fixture) => {
              const match =
                matches && matches.length > 0
                  ? matches.find(
                      (match: Match) => match.event_key === fixture.event_key
                    )
                  : undefined;
              const isFinished = fixture.event_status === "Finished";
              const isHalfTime = match?.event_status === "Half Time";

              const statusText = isFinished ? "F" : isHalfTime ? "ET" : "";
              //Tarjetas Fixture
              const homeFaultCards = fixture.cards.filter(
                (card: any) => card.home_fault && card.card == "red card"
              );
              const cardsHome = homeFaultCards
                .map((card: any) => card.card)
                .join(", ");

              const awayFaultCards = fixture.cards.filter(
                (card: any) => card.away_fault && card.card == "red card"
              );
              const cardsAway = awayFaultCards
                .map((card: any) => card.card)
                .join(", ");

              //Tarjetas en Vivo
              const homeLiveFaultCards =
                match && match.cards //Posible error, si no hay tarjetas en el partido en vivo me va a mostrar homeFaultCards.
                  ? match.cards.filter(
                      (card: any) => card.home_fault && card.card === "red card"
                    )
                  : homeFaultCards;
              const cardsLiveHome = homeLiveFaultCards
                .map((card: any) => card.card)
                .join(", ");

              const awayLiveFaultCards =
                match && match.cards
                  ? match.cards.filter(
                      (card: any) => card.away_fault && card.card === "red card"
                    )
                  : awayFaultCards;
              const cardsLiveAway = awayLiveFaultCards
                .map((card: any) => card.card)
                .join(", ");

              //Goles
              //Gol Local
              let homeScorersCount = 0;
              const goalscorers = fixture.goalscorers;
              const homeGoleadores =
                match && match.goalscorers //Posible error: Si match.goleadores es falso (es decir, no hay goles) Me tiene que mostrar 0 y no el resultado del fixture. Evaluar con un partido en vivo
                  ? match.goalscorers
                      .filter((goleador: any) => {
                        if (goleador.home_scorer !== "") {
                          // Incrementar el contador si home_scorer es verdadero
                          homeScorersCount++;
                          return true;
                        }
                        return false;
                      })
                      .map((goleador: any) => (
                        <span key={goleador.time}>
                          {goleador.time + "'"}
                          {goleador.home_scorer + "; "}
                        </span>
                      ))
                  : goalscorers
                      .filter((goleador: any) => {
                        if (goleador.home_scorer !== "") {
                          // Incrementar el contador si home_scorer es verdadero
                          homeScorersCount++;
                          return true;
                        }
                        return false;
                      })
                      .map((goleador: any) => (
                        <span key={goleador.time}>
                          {goleador.time + "'"}
                          {goleador.home_scorer + "; "}
                        </span>
                      ));
              //Gol Visitante
              let awayScorersCount = 0;
              const awayGoleadores =
                match && match.goalscorers
                  ? match.goalscorers
                      .filter((goleador: any) => {
                        if (goleador.away_scorer !== "") {
                          awayScorersCount++;
                          return true;
                        }
                        return false;
                      })
                      .map((goleador: any) => (
                        <span key={goleador.time}>
                          {goleador.time + "'"}
                          {goleador.away_scorer + "; "}
                        </span>
                      ))
                  : goalscorers
                      .filter((goleador: any) => {
                        if (goleador.away_scorer !== "") {
                          awayScorersCount++;
                          return true;
                        }
                        return false;
                      })
                      .map((goleador: any) => (
                        <span key={goleador.time}>
                          {goleador.time + "'"}
                          {goleador.away_scorer + "; "}
                        </span>
                      ));

              const shouldRenderSecondRow =
                homeGoleadores ||
                cardsLiveHome ||
                awayGoleadores ||
                cardsLiveAway;

              return (
                <div
                  className="row mb-3"
                  id="fixture-row"
                  key={fixture.event_key}
                >
                  <div className="col-1 time-col d-flex mt-2">
                    {" "}
                    <span>
                      {match
                        ? match.event_status === "Half Time"
                          ? "ET"
                          : match.event_status + `'`
                        : fixture.event_status === "Finished"
                        ? "F"
                        : fixture.event_status || fixture.event_time}
                    </span>
                  </div>
                  <div className="col-4">
                    <div className="team-col text-end d-flex justify-content-end">
                      <div className="d-flex align-items-center">
                        <h4 className="team-name team1-name truncate">
                          {fixture.event_home_team}
                        </h4>
                        <img
                          className="team-logo"
                          src={fixture.home_team_logo}
                          alt={fixture.event_home_team}
                        />
                      </div>
                    </div>
                    <div className="row align-items-center">
                      {shouldRenderSecondRow && (
                        <div className="col-12 goleador">
                          {" "}
                          <span>{homeGoleadores}</span>{" "}
                          {homeLiveFaultCards.length > 0 && (
                            <span>{cardsLiveHome}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-2 goals-col d-flex flex-column mt-2">
                    <div className="text-center">
                      <span>
                        {matches &&
                        matches.length > 0 &&
                        matches.find(
                          (match: Match) =>
                            match.event_key === fixture.event_key
                        )
                          ? matches.find(
                              (match: Match) =>
                                match.event_key === fixture.event_key
                            )?.event_final_result
                          : fixture.event_final_result}
                      </span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="team2-col text-start d-flex justify-content-start">
                      <div className="d-flex align-items-center">
                        <img
                          className="team-logo"
                          src={fixture.away_team_logo}
                          alt={fixture.event_away_team}
                        />
                        <h4 className="team-name team1-name truncate">
                          {fixture.event_away_team}
                        </h4>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      {shouldRenderSecondRow && (
                        <div className="col-12 goleador">
                          {" "}
                          <span>{awayGoleadores}</span>{" "}
                          {awayLiveFaultCards.length > 0 && (
                            <span>{cardsLiveAway}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
