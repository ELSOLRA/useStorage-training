import Card from "../Card/Card";
import { data } from "../constants/constants";
import "./products.scss";

type Props = {};

const Products = (props: Props) => {
  const card = data.map((pokemon) => (
    <Card

      id={pokemon.id}
      name={pokemon.name}
      desc={pokemon.desc}
      price={pokemon.price}
      buttonText={pokemon.buttonText}
    />
  ));
  return (
    <section className="products-wrapper">
      <h3>Products</h3>

      <section className="products-wrapper__cards">{card}</section>
    </section>
  );
};

export default Products;
