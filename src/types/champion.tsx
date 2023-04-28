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
