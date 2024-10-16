const request = require("supertest");
const server = require("./index");

describe("Operaciones CRUD de cafes", () => {

    // Prueba para obtener la lista de cafés
    it("debería obtener todos los cafés", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);  // Verifica que la respuesta sea 200 (OK)
        expect(response.body).toBeInstanceOf(Array);  // Verifica que el cuerpo de la respuesta sea un array
    });

    // Prueba para agregar un nuevo café
    it("debería agregar un nuevo café", async () => {
        const nuevoCafe = { nombre: "Café Mocha", precio: 2000 };
        const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe);
        expect(response.status).toBe(201);  // Verifica que la respuesta sea 201 (Creado)
        expect(response.body).toHaveProperty("id");  // Verifica que el nuevo café tenga un ID
    });

    // Prueba para actualizar un café
    it("debería actualizar un café existente", async () => {
        const cafeActualizado = { nombre: "Café Americano", precio: 1800 };
        const response = await request(server)
            .put("/cafes/1")  // Suponiendo que el ID del café a actualizar es 1
            .send(cafeActualizado);
        expect(response.status).toBe(200);  // Verifica que la respuesta sea 200 (OK)
    });

    // Prueba para eliminar un café
    it("debería eliminar un café", async () => {
        const response = await request(server)
            .delete("/cafes/1");  // Suponiendo que el ID del café a eliminar es 1
        expect(response.status).toBe(204);  // Verifica que la respuesta sea 204 (Sin contenido)
    });

});
