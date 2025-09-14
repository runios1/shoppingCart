export default function ProductCard({ title, price, image, children }) {
  return (
    <div>
      <img src={image} />
      <h3>{title}</h3>
      <p>{price}</p>
      {children}
    </div>
  );
}
