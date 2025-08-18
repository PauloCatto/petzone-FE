type PetType = 'dog' | 'cat' | 'fish';
type PetSex = 'Masculino' | 'Feminino';

export interface PetSummary {
  id: number;
  name: string;
  type: PetType;
  price: number;
  image: string;
}

export interface HomeResponse {
  products: PetSummary[];
  backgroundAsset: string;
}

export interface Pet {
  id: number;
  name: string;
  type: PetType;
  price: number;
  image: string;
  color: string;
  sex: PetSex;
}
