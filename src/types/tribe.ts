export interface TribeMember {
  id: string;
  name: string;
  avatar: string;
  meditatedToday: boolean;
  currentStep: number;
}

export interface Tribe {
  id: string;
  name: string;
  focus: string;
  members: TribeMember[];
  tribeScore: number;
}
