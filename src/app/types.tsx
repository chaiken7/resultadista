export interface Match {
    event_key: number;
    event_final_result: string | null;
    event_status: string | null;
    cards: any[];
    goalscorers: any[];
    league_key: any;
  }

  export interface Liga{
    league_logo: any;
    league_name: string;
    leagueData: any[];
    league_key: any;
  }

  export interface Fixture {
    event_home_team: string;
    event_away_team: string;
    home_team_logo: any;
    away_team_logo: any;
    event_key: number;
    event_time: number;
    event_status: any;
    event_final_result: any;
    cards: any[];
    goalscorers: any[];
    league_key: any;
  }

  export interface LigaProps {
    fixtureDay: Fixture[];
    matches: Match[];
    leagueData: Liga[] | null;
  }

  export interface Posiciones {
    standing_team: string;
    standing_place_type: string;
    standing_PTD: number;
  }