import { render, screen } from "@testing-library/react";
import { InputLabel } from "../../src/components/InputLabel";

describe('Pruebas en <InputLabel />', () => {
    test('Debe de mostrar un InputLabel con el texto "test"', () => {
        render( <InputLabel text="test" state={false} /> )
        expect( screen.getByText('test') ).toBeTruthy()
    })
})