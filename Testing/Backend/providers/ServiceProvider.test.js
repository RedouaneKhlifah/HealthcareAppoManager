import request from "supertest";
import app from "../../../Backend/app.js";
import { v4 } from "uuid";

describe("Service API crud", () => {
    let createdServiceId;
    let title = `test${v4()}`;
    console.log(title);
    it("POST /Service - should create a new Service record and return it", async () => {
        const reqBody = {
            title: title,
            description: "Test Description"
        };

        const res = await request(app).post("/Service").send(reqBody);

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            title: title,
            description: "Test Description"
        });

        // Store the created Service ID for later use
        createdServiceId = res.body.id;
    });

    it("GET /Service - should return all Service records", async () => {
        const res = await request(app).get("/Service");

        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: title,
                    description: "Test Description"
                })
            ])
        );
    });

    it("GET /Service/:id - should return a specific Service record", async () => {
        const res = await request(app).get(`/Service/${createdServiceId}`);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            title: title,
            description: "Test Description"
        });
    });

    it("PATCH /Service/:id  - should upadte a Service and return it ", async () => {
        const reqBody = {
            title: title,
            description: "Test Description"
        };
        const res = await request(app)
            .get(`/Service/${createdServiceId}`)
            .send(reqBody);
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            title: title,
            description: "Test Description"
        });
    });
});
