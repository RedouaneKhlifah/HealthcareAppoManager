import request from "supertest";
import app from "../../../Backend/app.js";
import { v4 } from "uuid";

describe("Succurcal API crud", () => {
    let createdSuccurcalId;
    let title = `test${v4()}`;
    console.log(title);
    it("POST /Succurcal - should create a new Succurcal record and return it", async () => {
        const reqBody = {
            title: title,
            description: "Test Description"
        };

        const res = await request(app).post("/Succurcal").send(reqBody);

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            title: title,
            description: "Test Description"
        });

        // Store the created Succurcal ID for later use
        createdSuccurcalId = res.body.id;
    });

    it("GET /Succurcal - should return all Succurcal records", async () => {
        const res = await request(app).get("/Succurcal");

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

    it("GET /Succurcal/:id - should return a specific Succurcal record", async () => {
        const res = await request(app).get(`/Succurcal/${createdSuccurcalId}`);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            title: title,
            description: "Test Description"
        });
    });

    it("PATCH /Succurcal/:id  - should upadte a Succurcal and return it ", async () => {
        const reqBody = {
            title: title,
            description: "Test Description"
        };
        const res = await request(app)
            .get(`/Succurcal/${createdSuccurcalId}`)
            .send(reqBody);
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            title: title,
            description: "Test Description"
        });
    });
});
