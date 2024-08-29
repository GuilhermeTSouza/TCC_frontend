export interface Disciplina {
  nome: string;
  cargaHoraria: string;
  professor: string;
  observacoes: string;
}

export interface Course {
  id: number;
  name: string;
  disciplinas?: Disciplina[][];
}
