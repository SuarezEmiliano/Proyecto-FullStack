import React from "react";
import { useForm } from "react-hook-form";

// harcodeo de categorias
const Categorias = [
  { IdCategoria: 1, Nombre: "ACCION" },
  { IdCategoria: 2, Nombre: "AVENTURA" },
  { IdCategoria: 3, Nombre: "DEPORTIVO" },
  { IdCategoria: 4, Nombre: "ESTRATEGIA" },
  { IdCategoria: 5, Nombre: "SIMULACION" },
  { IdCategoria: 6, Nombre: "CARRERAS" },
  { IdCategoria: 7, Nombre: "ROL" },
  { IdCategoria: 8, Nombre: "PUZZLE" },
  { IdCategoria: 9, Nombre: "TERROR" },
  { IdCategoria: 10, Nombre: "SUPERVIVENCIA" },
];
export default function VideojuegosRegistro({
    AccionABMC, /* Estado */
    Item, /* Estado */
    Grabar, /* Funcion */
    Volver, /* Funcion */
}) {
  const { /* Hace uso de librería useForm */
      register,
      handleSubmit,
      formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
      Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre", { /* Validaciones del lado del Frontend */
                    required: { 
                      value: true, 
                      message: "Nombre es requerido" 
                    },
                    minLength: {
                      value: 4,
                      message: "Nombre debe tener al menos 4 caracteres",
                    },
                    maxLength: {
                      value: 55,
                      message: "Nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Nombre ? "is-invalid" : "")
                }
              />
              {errors?.Nombre && touchedFields.Nombre && (
                <div className="invalid-feedback">
                  {errors?.Nombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Precio */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Precio">
                Precio<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number" 
                step=".01"
                {...register("Precio", {
                  required: { 
                    value: true,
                    message: "Precio es requerido" 
                  },
                  min: {
                    value: 0.01,
                    message: "Precio debe ser mayor a 0",
                  },
                  max: {
                    value: 99999.99,
                    message: "Precio debe ser menor o igual a 99999.99",
                  },
                })}
                className={
                  "form-control " + (errors?.Precio ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Precio?.message}</div>            
            </div>
          </div>

          {/* campo idCategoria */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdCategoria">
                Categoria<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("IdCategoria", {
                  required: { 
                    value: true, 
                    message: "Categoria es requerida" 
                  },
                })}
                className={
                  "form-control " + (errors?.IdCategoria ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Categorias?.map((x) => (
                  <option value={x.IdCategoria} key={x.IdCategoria}>
                    {x.Nombre}
                  </option>
                  ))}
            </select>
            </div>
          </div>

          {/* campo FechaSalida */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaSalida">
                Fecha Salida<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="date"
                {...register("FechaSalida", {
                  required: { 
                    value: true, 
                    message: "Fecha Salida es requerido" 
                  }
                })}
                className={
                  "form-control " + (errors?.FechaSalida ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.FechaSalida?.message}</div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>
        
        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}