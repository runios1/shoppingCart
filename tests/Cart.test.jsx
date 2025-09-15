import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Cart from "../src/components/Cart/Cart";

const mockUseOutletContext = vi.fn();
vi.mock("react-router", () => ({
  useOutletContext: () => mockUseOutletContext(),
}));

mockUseOutletContext.mockReturnValue([
  { products: [{ productId: 1 }, { productId: 2 }] },
]);

let productCount = 1;

window.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ id: productCount, title: "product-" + productCount++ }),
  })
);
describe("Cart", () => {
  it("renders the cart items", async () => {
    render(<Cart />);
    const productCards = await screen.findAllByTestId("ProductCard");
    expect(productCards).toHaveLength(2);
    expect(screen.getByText("product-1")).toBeInTheDocument();
    expect(screen.getByText("product-2")).toBeInTheDocument();
  });
});
