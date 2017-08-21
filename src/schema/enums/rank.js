export default {
  MARSHAL: 'Marechal',
  ARMY_GENERAL: 'General de Exército',
  DIVISION_GENERAL: 'General de Divisão',
  BRIGADIER_GENERAL: 'General de Brigada',
  COLONEL: 'Coronel',
  LIEUTENANT_COLONEL: 'Tenente Coronel',
  MAJOR: 'Major',
  CAPTAIN: 'Capitão',
  FIRST_LIEUTENANT: '1º Tenente',
  SECOND_LIEUTENANT: '2º Tenente',
  OFFICER_ASPIRANT: 'Aspirante a Oficial',
  CADET: 'Cadete',
  SUB_LIEUTENANT: 'Subtenente',
  FIRST_SARGENT: 'Primeiro-Sargento',
  SECOND_SARGENT: 'Segundo-Sargento',
  THIRD_SARGENT: 'Terceiro-Sargento',
  CORPORAL: 'Cabo',
  SOLDIER: 'Soldado',
  FOREMAN: 'Taifeiro-mor',
  STEWARD_FIRST_CLASS: 'Taifeiro de 1ª Classe',
  STEWARD_SECOND_CLASS: 'Taifeiro de 2ª Classe',
};

export const groupedRanks = [
  {
    label: 'Posto - Oficiais Generais',
    ranks: ['MARSHAL', 'ARMY_GENERAL', 'DIVISION_GENERAL', 'BRIGADIER_GENERAL'],
  },
  {
    label: 'Posto - Oficiais Superiores',
    ranks: ['COLONEL', 'LIEUTENANT_COLONEL', 'MAJOR'],
  },
  {
    label: 'Posto - Oficiais Intermediários',
    ranks: ['CAPTAIN'],
  },
  {
    label: 'Posto - Oficiais Subalternos',
    ranks: [ 'FIRST_LIEUTENANT', 'SECOND_LIEUTENANT', 'OFFICER_ASPIRANT'],
  },
  {
    label: 'Graduados',
    ranks: [
      'CADET',
      'SUB_LIEUTENANT',
      'FIRST_SARGENT',
      'SECOND_SARGENT',
      'THIRD_SARGENT',
      'CORPORAL',
      'SOLDIER',
      'FOREMAN',
      'STEWARD_FIRST_CLASS',
      'STEWARD_SECOND_CLASS',
    ],
  },
];
