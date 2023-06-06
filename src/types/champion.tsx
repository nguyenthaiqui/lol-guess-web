export interface IChampion {
  gender: string;
  resource: string;
  roles: string[];
  title: string;
  portrait: string;
  species: string;
  name: string;
  lanes: string[];
  ids: {
    ddragon: string;
    kebab: string;
    cdragon: number;
    wiki: string;
    universe: string;
  };
  region: string;
  splash: string;
  releaseDate: string;
  rangeType: string;
  releasePatch: string;
}

export interface IHistory {
  gameId: string;
  result: {
    gender: number;
    resource: number;
    species: number;
    roles: number;
    lanes: number;
    range_type: number;
    region: number;
  };
  championGuess: IChampion;
  champion: IChampion;
  order: number;
}
