const request = require('supertest');
const BASE_URL = "https://petstore.swagger.io/v2";
const API_KEY = "nigleterno2w";

const PET_ID = 1005;
const PET_PAYLOAD = {
    id: PET_ID,
    category: { id: 1, name: "Dogs" },
    name: "Bulldog",
    photoUrls: ["http://example.com/dog.jpg"],
    tags: [{ id: 1, name: "bulldog" }],
    status: "available"
};

describe("Swagger Petstore API Tests", () => {
    it("adds pet", async () => {
        const response = await request(BASE_URL)
            .post("/pet")
            .send(PET_PAYLOAD);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(PET_ID);
    });

    it("gets pet by ID", async () => {
        const response = await request(BASE_URL).get(`/pet/${PET_ID}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Bulldog");
    });

    it("update pet", async () => {
        const updatedPayload = { ...PET_PAYLOAD, name: "Golden Retriever" };
        const response = await request(BASE_URL)
            .put("/pet")
            .send(updatedPayload);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Golden Retriever");
    });

    it("gets updated pet by ID", async () => {
        const response = await request(BASE_URL).get(`/pet/${PET_ID}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Golden Retriever");
    });

    it("should delete the pet", async () => {
        const response = await request(BASE_URL)
            .delete(`/pet/${PET_ID}`)
            .set("api_key", API_KEY);
        expect(response.status).toBe(200);
    });

    it("return 404 for deleted pet", async () => {
        const response = await request(BASE_URL).get(`/pet/${PET_ID}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Pet not found");
    });
});
