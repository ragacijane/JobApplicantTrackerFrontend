import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type User = {
  idKandidata: number,
  idKorisnika: number,
  idTipa: TipKorisnika,
  username: string,
  password: string,
};
export type TipKorisnika = {
  idTipa: number,
  nazivTipa: string,
}
export type Kandidati = {
  idKandidata: number,
  imeKandidata: string,
  prezimeKandidata: string,
  jmbg: string,
  email: string,
  telefon: string,
  grad: string,
  zeljenaPlata: string,
  obrazovnaUstanova: string,
  idDiplome: Diplome,
  idKorisnika: User,
  tipPosla: []
}
export type Diplome = {
  idDiplome: number,
  nazivDiplome: string
}
export type Poslovi = {
  idPosla: number,
  nazivPosla: string
}