process.env.NODE_ENV = "test";// this will set DB_URI to list-test

const request = require("supertest");//import supertest to make requests to server

const app = require("../app");
const db = require("../db");

let item;

//need a beforeEach, an afterEach, and a afterAll
beforeEach(async () => {
    const resp = await request(app).post(`/list`).send({name: "pizza", price: 5.55});
    item = resp.body['added'];
})

afterEach(async () => {
    db.query(`DELETE FROM list`);
})

afterAll(async function () {
  await db.end();
});

//so here's where we test

//we'll need one for get
describe("GET /list", () => {
    test("returns all items on list", async () => {
        const resp = await request(app).get(`/list`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body[0]).toEqual(item);
    })
})

//two for get by name (success and 404)
describe("GET /list/:name", () => {
    test("returns item on list by name", async () => {
        const resp = await request(app).get(`/list/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(item);
    })
    test("returns 404 with invalid item name", async () => {
        const resp = await request(app).get(`/list/blah`);
        expect(resp.statusCode).toBe(404);
    })
})

// two for post (success and wrong json body)
describe("POST /list", () => {
    test("creates a new item and saves it to database", async () => {
        const newItem = {name: "candy", price: .50};
        const resp = await request(app).post(`/list`).send(newItem);
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({added: newItem});

        const getItemResp = await request(app).get(`/list/${newItem.name}`);
        expect(getItemResp.body).toEqual(newItem);
    })

    // test("Returns error with improper json body passed in", async () => {
    //     const badItem = {what: 56, no: "wha"};
    //     const resp = await request(app).post(`list`).send(badItem);
    //     expect(resp.statusCode).toBe(404);
    // })
})


// //three for patch (success, 404, and wrong json body)
// describe("PATCH /list/:name", () => {
//     test("patches a new item and updates it's data", async () => {
//         const newItem = {name: "candy", price: .50};
//         const resp = await request(app).patch(`/list/${item.name}`).send(newItem);
//         expect(resp.statusCode).toBe(200);
//         expect(resp.body).toEqual({updated: newItem});

//         const getItemResp = await request(app).get(`/list/`);
//         expect(resp.body[0]).toEqual(newItem);
//         expect(resp.body).toHaveLength(1);
//     })

//     test("returns 404 with bad name passed in", async () => {
//         const resp = await request(app).patch(`/list/blah`).send("unneeded");
//         expect(resp.statusCode).toBe(404);
//     })
// })
// //two for delete (success and 404)

// describe("DELETE /list/:name", () => {
//     test("deletes item by name", async () => {
//         const resp = await request(app).delete(`/list/${item.name}`);
//         expect(resp.statusCode).toBe(202);
//         expect(resp.body).toEqual({message: "Deleted"});
//     })

//     test("return 404 with bad name passed in", async () => {
//         const resp = await request(app).delete(`list/blah`);
//         expect(resp.statusCode).toBe(404);
//     })
// })

// // //This testing pattern is the best because it doesn't just test the database OR the api

// // //IT TESTS BOTH!!!!!!!!!!!!
// // describe("POST /cats", async function () {
// //     test("Creates a new cat", async function () {
// //       const response = await request(app)
// //         .post(`/cats`)
// //         .send({
// //           name: "Ezra"
// //         });
// //       expect(response.statusCode).toBe(201);
// //       expect(response.body).toEqual({
// //         cat: { name: "Ezra" }
// //       });

// //       const getCatsResponse = await request(app).get(`/cats`)
// //       expect(response.body[0]).toEqual({ name:"Ezra" });
// //       expect(response.body).toHaveLength(1);
// //     });
// //   });