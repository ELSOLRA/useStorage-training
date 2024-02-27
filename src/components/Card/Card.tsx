import { useNavigate } from "react-router-dom";
import "./card.scss";

export type Props = {
  id: number | string;
  name: string;
  desc: string;
  buttonText: string;
  price: string;
};

const Card = ({ id, name, desc, buttonText }: Props) => {
  const navigate = useNavigate();

  return (
    <article key={id} className="card">
      <h4>{name}</h4>
      <p>{desc}</p>
      <button onClick={() => navigate(`product/${id}`)}>{buttonText}</button>
    </article>
  );
};

export default Card;
