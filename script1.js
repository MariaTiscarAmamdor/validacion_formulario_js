// Importar los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

window.addEventListener("load", function () {
  // Inicialización de Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDy-DNTLDfYxvUr4NFERMu8DaYjmel86Wg",
    authDomain: "datos-formulario-9a12b.firebaseapp.com",
    projectId: "datos-formulario-9a12b",
    storageBucket: "datos-formulario-9a12b.appspot.com",
    messagingSenderId: "1045706220155",
    appId: "1:1045706220155:web:f831a9411adb2be7ecb8de",
    measurementId: "G-S16J9QFHPS",
  };

  // Inicializar Firebase y la base de datos
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", (ev) => {
    //para prevenir comportamiento por defecto
    ev.preventDefault("formulario");

    //validar nombre
    const nombre = document.getElementById("name");
    const errorNombre = document.getElementById("nameError");
    if (nombre.value.trim() === "") {
      errorNombre.textContent = "Este campo no puede estar vacío";
      errorNombre.classList.add("error-message");
    } else {
      errorNombre.classList.remove("error-message");
      errorNombre.textContent = "";
    }

    //validar email
    const email = document.getElementById("email").value;
    const errorEmail = document.getElementById("emailError");
    const patterEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

    if (!patterEmail.test(email)) {
      errorEmail.textContent = "Por favor introduce un email correcto";
      errorEmail.classList.add("error-message");
    } else {
      errorEmail.classList.remove("error-message");
      errorEmail.textContent = "";
    }
    //validar contraseña
    const pass = document.getElementById("password").value;
    const errorPass = document.getElementById("passwordError");
    const patterPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\.!@#\\$%\^&\*])(?=.{8,})/;

    if (!patterPassword.test(pass)) {
      errorPass.textContent =
        "Por favor introduce contraseña que contenga al menos 8 caracteres, mayúsculas, minúsculas, números y un símbolo";
      errorPass.classList.add("error-message");
    } else {
      errorPass.textContent = "";
      errorPass.classList.remove("error-message");
    }

    //mandar los datos con éxito
    if (
      !errorNombre.textContent &&
      !errorEmail.textContent &&
      !errorPass.textContent
    ) {
      alert("El formulario enviado con éxito");
      document.getElementById("formulario").reset(); //limpiar formulario
    }
    // Enviar datos a Firebase Realtime Database
    const userId = Date.now(); // Crear un ID de usuario único usando la fecha actual
    set(ref(db, "users/" + userId), {
      nombre: nombre,
      email: email,
      contraseña: pass,
    })
      .then(() => {
        console.log("Datos guardados exitosamente");
        alert("El formulario enviado con éxito");
        formulario.reset(); // Limpiar el formulario
      })
      .catch((error) => {
        console.error("Error al guardar los datos: ", error);
      });
  });
});
