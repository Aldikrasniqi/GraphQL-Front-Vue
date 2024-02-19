export type Craft = {
  name: string;
  id: string;
  type: string;
  price: number;
  age: number;
  owner: {
    id: string;
    firstName: string;
    lastname: string;
    email?: string;
  };
};

export type EditCraft = {
  id?: string;  
  name: string;
  __typename: string;
  age: number;
  owner: {
    firstName: string;
    lastName: string;
    id: string;
  };
  price: string;
};
