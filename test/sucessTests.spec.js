const request = require("supertest");
const { app, server, mongoose } = require("../index");
const { users } = require("../app/models");

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
let registerWasSuccessful = false;

test('for successful admin registration', async () => {
    expect.assertions(2);

    try {
        const response = await request(app)
            .post("/v1/auth/register")
            .set("Content-Type", "application/json")
            .send(registerReqBody);

        if (response.status === 201) {
            registerWasSuccessful = true;
        }

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User account created successfully!");   
        
    } catch (error) {
        
    }
})

test('for successful login', async () => {
    expect.assertions(2);

    try {
        const response = await request(app)
            .post("/v1/auth/login")
            .set("Content-Type", "application/json")
            .send(loginReqBody);

        token = response.body.token;

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Login successful");   

    } catch (error) {
        
    }
})

test('for successful shopitem creation', async () => {
    expect.assertions(2);

    try {
        if (!token) {
            throw new Error('Token is not available from the login test');
        }
    
        const response = await request(app)
            .post("/v1/shop/add-product")
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send(newProductDetails);
    
        productId = response.body.data?.item._id;
    
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Shop item created successfully");
        
    } catch (error) {
        
    }
})


test('for getting all shopitems', async () => {
    expect.assertions(2);

    try {
        if (!token) {
            throw new Error('Token is not available from the login test');
        }
    
        const response = await request(app)
            .get("/v1/shop/products")
            .set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("All products fetched successfully");
        
    } catch (error) {
        
    }
})


test('for shopitem deletion', async () => {
    expect.assertions(2);

    try {
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
        
    } catch (error) {
        
    }
})


afterAll(() => {
    const deleteTestRegisteredUser = async () => {
        await users.deleteOne({ userName: "PetKassy" });
    }

    const shutDown = async () => {
        if (registerWasSuccessful) {
            await deleteTestRegisteredUser();
        }

        await mongoose.disconnect();
        server.close();
    }

    shutDown();
})