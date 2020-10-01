import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dni: "",
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  cuentaContrato: "",
  titularCuenta: "",
  celular: "",
  esTitular: "",
  submitted: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserValues: (state, action) => {
      const {
        dni,
        nombre,
        apellido,
        email,
        codArea,
        telefono,
        cuentaContrato,
        titularCuenta,
        esTitular,
        celular,
      } = action.payload;
      state.dni = dni;
      state.nombre = nombre;
      state.apellido = apellido;
      state.email = email;
      state.telefono = codArea+telefono;
      state.cuentaContrato = cuentaContrato;
      state.titularCuenta = titularCuenta;
      state.celular = celular;
      state.esTitular = esTitular;
      state.submitted = !state.submitted;
    },
    resetUserValues: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserValues, resetUserValues } = userSlice.actions;