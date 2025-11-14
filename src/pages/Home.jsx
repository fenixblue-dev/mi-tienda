import ItemListContainer from "../components/ItemListContainer/ItemListContainer";

export default function Home() {
  return (
    <>
      <div className="py-5 text-white" style={{ background: "linear-gradient(90deg,#0f172a,#071429)" }}>
        <div className="container text-center">
          <h1>Tienda</h1>
          <p className="lead">Productos disponibles</p>
        </div>
      </div>

      <div className="my-4">
        <div className="container">
          <ItemListContainer />
        </div>
      </div>
    </>
  );
}
