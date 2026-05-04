const request = require("supertest");
const app = require("../src/app");

describe("GET /api/health", () => {
  it("should return 200 and status ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "ok");
  });
});

describe("Product routes", () => {
  it("returns the product list", async () => {
    const res = await request(app).get("/api/products");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("returns a product by id", async () => {
    const res = await request(app).get("/api/products/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", 1);
  });
});

describe("Cart routes", () => {
  it("returns the cart", async () => {
    const res = await request(app).get("/api/cart");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("adds an item to the cart", async () => {
    const res = await request(app)
      .post("/api/cart")
      .send({ productId: 1, qty: 2 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject({
      productId: 1,
      qty: 2,
      name: "Classic Tee",
    });
  });

  it("removes an item from the cart", async () => {
    const addRes = await request(app)
      .post("/api/cart")
      .send({ productId: 3, qty: 1 });

    const removeRes = await request(app).delete(`/api/cart/${addRes.body.id}`);

    expect(removeRes.statusCode).toEqual(200);
    expect(removeRes.body).toEqual({ success: true });
  });
});
