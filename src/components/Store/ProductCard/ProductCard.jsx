export default function ProductCard({ title, price, image }) {
  return (
    <div>
      <img src={image} />
      <h3>{title}</h3>
      <p>{price}</p>
      <button>Add to Cart</button>
    </div>
  );
}
