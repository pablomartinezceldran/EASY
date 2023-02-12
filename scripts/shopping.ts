export type ShoppingItem = {
  id: string;
  item: CatalogItem;
  quantity: number;
};

export type CatalogItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  photo: string;
};

export function createCatalogItemId(): string {
  const date = new Date();
  const month = date.getMonth() + 1;
  return (
    "catalogItem-" +
    date.getDate() +
    "-" +
    month +
    "-" +
    date.getFullYear() +
    "-" +
    date.getHours() +
    "-" +
    date.getMinutes() +
    "-" +
    date.getSeconds() +
    "-" +
    date.getMilliseconds()
  );
}

export function createNewCatalogItem(
  newName: string,
  newDescription: string,
  newPrice: string,
  newPhoto: string
) {
  const newCatalogItem: CatalogItem = {
    id: createCatalogItemId(),
    name: newName,
    description: newDescription,
    price: newPrice,
    photo: newPhoto,
  };
  return newCatalogItem;
}

export function createShoppingItemId(): string {
  const date = new Date();
  const month = date.getMonth() + 1;
  return (
    "shoppingItem-" +
    date.getDate() +
    "-" +
    month +
    "-" +
    date.getFullYear() +
    "-" +
    date.getHours() +
    "-" +
    date.getMinutes() +
    "-" +
    date.getSeconds() +
    "-" +
    date.getMilliseconds()
  );
}

export function createNewShoppingItem(newCatalogItem: CatalogItem, newQuantity: number) {
  const newShoppingItem: ShoppingItem = {
    id: createShoppingItemId(),
    item: newCatalogItem,
    quantity: newQuantity,
  };
  return newShoppingItem;
}
