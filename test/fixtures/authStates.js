export const initialState = {
    status: 'checking',
    user: {},
    images: [],
    errorMessage: undefined
}
export const authenticatedState = {
    status: 'authenticated',
    user: {
        uid: '123',
        name: "Testing",
        surname: "User",
        email: "testinggus@test.com.ar",
    },
    images: [],
    errorMessage: undefined
}
export const notAuthenticatedState = {
    status: 'not-authenticated',
    user: {},
    images: [],
    errorMessage: undefined
}