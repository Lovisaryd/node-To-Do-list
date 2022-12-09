import app from './index';
import request from 'supertest';

describe("GET /todos", () => {
    it("should return 200", async ()=> {
        const response = await request(app).get('/toDos');
        expect(response.statusCode).toBe(200);
    })
    it("should return todos", async () => {
        const response = await request(app).get('/toDos');
    })
});

describe("POST /toDos", () => {
    const newTodo = {
        task: "Drick vatten"
    }
    it("should add an item to todos array", async () => {
        const response = await request(app).post("/toDos").send(newTodo);
        expect(response.statusCode).toBe(201);
        })
})

describe("error POST", () => {
    const newTodo = {
        name: "tjena"
    }
    it("should get error", async () => {
        const response = await request(app).post("/toDos").send(newTodo);
        expect(response.statusCode).toBe(400);
    })
})

describe("update todo", () => {
    const newTodo = {
       task: "Måla tavla"
    }
    it("should update todo", async () => {
        const response = await request(app).put(`/toDos/1`).send(newTodo);
        expect(response.statusCode).toBe(201);
    })
})

describe("delete todo", () => {
    it("should delete todo", async () => {
        const response = await request(app).delete(`/toDos/1`);
        expect(response.statusCode).toBe(202);
    })
})

describe("error DELETE", () =>{
    it("should get error", async () => {
        const response = await request(app).delete("/toDos/3");
        expect(response.statusCode).toBe(400);
    })
})