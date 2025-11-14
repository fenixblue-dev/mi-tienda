import Item from "../Item/Item";

export default function ItemList({ products = [] }) {
  return (
    <>
      {products.map((p) => (
        <Item key={p.id} product={p} />
      ))}
    </>
  );
}
