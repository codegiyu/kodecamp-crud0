const request = require("supertest");
const app = require("../index");

const loginReqBody = {
    userName: "PetKassy",
    password: "KassyPat123"
}

const registerReqBody = {
    fullName: "Kasie Ugwu",
    role: "admin",
    ...loginReqBody
}

const newProductDetails = {
    name: "Mens Polo T-shirt",
    description: "Breathable and classy",
    price: 9000,
    isInStock: true
}

let token;
let productId;

test('for successful admin registration', async () => {
    const response = await request(app)
        .post("/v1/auth/register")
        .set("Content-Type", "application/json")
        .send(registerReqBody);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User account created successfully!");
})

test('for successful login', async () => {
    const response = await request(app)
        .post("/v1/auth/login")
        .set("Content-Type", "application/json")
        .send(loginReqBody);

    token = response.body.token;

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
})

test('for successful shopitem creation', async () => {
    expect.assertions(2);
    if (!token) {
        throw new Error('Token is not available from the login test');
    }

    const response = await request(app)
    .post("/v1/shop/add-product")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .send(newProductDetails);

    productId = response.body.data?.item._id || "6539b9d66d44f68c1cdae2b3";
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Shop item created successfully");
})


test('for getting all shopitems', async () => {
    expect.assertions(2);
    if (!token) {
        throw new Error('Token is not available from the login test');
    }

    const response = await request(app)
    .get("/v1/shop/products")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("All products fetched successfully");
    // expect(Array.isArray(response.body.data)).toBe(true);
})


test('for shopitem deletion', async () => {
    expect.assertions(2);
    if (!token) {
        throw new Error('Token is not available from the login test');
    }

    if (!productId) {
        throw new Error('ProductId is not available from the shopitem creation test');
    }

    const response = await request(app)
    .delete(`/v1/shop/product/${productId}`)
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Shop item deleted successfully");
})