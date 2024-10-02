// Importar los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

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

  // Inicializar Firebase y Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", async (ev) => {
    ev.preventDefault(); // Prevenir el comportamiento por defecto

    // Validaciones
    const nombre = document.getElementById("name").value;
    const errorNombre = document.getElementById("nameError");
    if (nombre.value === "") {
      errorNombre.textContent = "Este campo no puede estar vacío";
      errorNombre.classList.add("error-message");
    } else {
      errorNombre.classList.remove("error-message");
      errorNombre.textContent = "";
    }
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

    // Enviar datos a Firestore
    try {
      const docRef = await addDoc(collection(db, "users"), {
        nombre: nombre,
        email: email,
        contraseña: pass,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("El formulario enviado con éxito");
      formulario.reset(); // Limpiar el formulario
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  });
});
