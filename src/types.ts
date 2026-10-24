//This is like a class object from Java, 
// but in TypeScript we use type to define the shape of an object.
export type Drink = {
  id: number;
  name: string;
  price: number;
  category: "beer" | "cocktail" | "soft";
};
