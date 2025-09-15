import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Store from "../src/components/Store/Store";

const mockUseOutletContext = vi.fn();
vi.mock("react-router", () => ({
  useOutletContext: () => mockUseOutletContext(),
}));

const mockSetCart = vi.fn();
mockUseOutletContext.mockReturnValue([{ products: [] }, mockSetCart]);

window.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, title: "item-1" },
        { id: 2, title: "item-2" },
      ]),
  })
);

describe("Store", () => {
  it("renders product list", async () => {
    render(<Store />);
    const productCards = await screen.findAllByTestId("ProductCard");
    expect(productCards).toHaveLength(2);
    expect(screen.getByText("item-1")).toBeInTheDocument();
    expect(screen.getByText("item-2")).toBeInTheDocument();
  });
  it("adds the correct product to the cart", async () => {
    const user = userEvent.setup();
    render(<Store />);
    await screen.findByText("item-1");

    await user.click(screen.getByTestId("Add to Cart 1"));
    expect(mockSetCart).toHaveBeenCalledWith({
      products: [{ productId: 1, quantity: 1 }],
    });
  });
});
