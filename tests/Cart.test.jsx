import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../src/components/Cart/Cart";
import { fireEvent } from "@testing-library/react";

const mockUseOutletContext = vi.fn();
const mockSetCart = vi.fn();
vi.mock("react-router", () => ({
  useOutletContext: () => mockUseOutletContext(),
}));

beforeEach(() => {
  mockSetCart.mockReset();
  if (window.fetch && "mockClear" in window.fetch) {
    window.fetch.mockClear();
  }
  mockUseOutletContext.mockReturnValue([
    {
      id: 1,
      products: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ],
    },
    mockSetCart,
  ]);
});

window.fetch = vi.fn((url) => {
  const match = String(url).match(/products\/(\d+)/);
  const id = match ? Number(match[1]) : 0;
  return Promise.resolve({
    json: () => Promise.resolve({ id, title: `product-${id}`, price: 1 }),
  });
});
describe("Cart", () => {
  it("renders the cart items", async () => {
    render(<Cart />);
    const productCards = await screen.findAllByTestId("ProductCard");
    expect(productCards).toHaveLength(2);
    expect(screen.getByText("product-1")).toBeInTheDocument();
    expect(screen.getByText("product-2")).toBeInTheDocument();
  });
  it("deletes item correctly", async () => {
    const user = userEvent.setup();
    render(<Cart />);
    await screen.findByText("product-1");
    await user.click(screen.getByTestId("delete-1"));

    expect(mockSetCart).toHaveBeenCalledWith({
      id: 1,
      products: [{ productId: 2, quantity: 2 }],
    });
    expect(window.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/carts/1",
      expect.objectContaining({ method: "PUT" })
    );
    expect(screen.queryByText("product-1")).not.toBeInTheDocument();
  });

  it("changes quantity correctly", async () => {
    render(<Cart />);
    await screen.findByText("product-1");
    const qtyInput = screen.getByTestId("qty-1");
    fireEvent.change(qtyInput, { target: { value: "3" } }); //fireEvent instead of userEvent because nothing works!
    expect(qtyInput).toHaveValue(3);
    expect(mockSetCart).toHaveBeenCalledWith({
      id: 1,
      products: [
        { productId: 1, quantity: 3 },
        { productId: 2, quantity: 2 },
      ],
    });
    expect(window.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/carts/1",
      expect.objectContaining({ method: "PUT" })
    );
  });
});
