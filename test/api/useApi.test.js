import userAPI from "../../src/api/userApi"

describe('Pruebas de userAPI', () => {
    test("Debe de tener el baseURL correcto", () => {
        expect(userAPI.defaults.baseURL).toBe(process.env.VITE_API_URL)
    })
})