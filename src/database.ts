import { createClient } from '@supabase/supabase-js'
import type { Score } from './logic/Game';

const config = {
  supabaseUrl: "https://sruqthlxgubmswtqxklp.supabase.co",
  supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNydXF0aGx4Z3VibXN3dHF4a2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc4MjE0OTIsImV4cCI6MTk4MzM5NzQ5Mn0.-rcXYj9qLLoRh1ytlBESay2SlhqeP2KhINZ6oxOKaSk"
}

const supabase = createClient(config.supabaseUrl, config.supabaseKey)

export enum Filiere {
  SN = 'SN',
  _3EA= '3EA',
  MFEE= 'MFEE',
  SN_FISA= 'SN-FISA',
  _3EA_FISA='3EA-FISA',
  MFEE_FISA= 'MFEE-FISA',
}
export enum Annee {
  _1A = '1A',
  _2A = '2A',
  _3A = '3A',
  _4A = '4A',
  _4A_PLUS = '4A+',
}
export enum Sexe {
  HOMME = 'Homme',
  FEMME = 'Femme',
  AUTRE = 'Autre',
  NO = 'Ne souhaite repondre'
}

export interface Player {
  filiere: Filiere;
  annee: Annee;
  sexe: Sexe;
}

export const submitEntry = (score: Score, player: Player, game_version: string) => {
  return supabase
    .from('submissions')
    .insert({
      score,
      player,
      game_version,
    })
}

export const submitHelp = (content: string) => {
  return supabase
    .from('help')
    .insert({
      content,
    })
}

