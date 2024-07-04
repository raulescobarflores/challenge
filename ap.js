const textarea = document.getElementById('miTextarea');
const miTextarea2 = document.getElementById('miTextarea2');

let textoLimpiado = false; // Variable para almacenar el estado de limpieza

// Función para limpiar el textarea
function limpiarTextarea() {
    if (!textoLimpiado) {
        textarea.value = '';
        textoLimpiado = true; // Marcar como limpiado
        localStorage.setItem('textareaLimpio', true); // Guardar en Local Storage
    }
}

// Agregar evento click al textarea
textarea.addEventListener('click', limpiarTextarea);

// Verificar estado inicial del textarea
const textareaLimpioStorage = localStorage.getItem('textareaLimpio');
if (textareaLimpioStorage === 'true') {
    textoLimpiado = true; // Marcar como limpiado si ya se limpió antes
}

// Función para validar la entrada de texto
function validarCaracteres(texto) {
    const regex = /^[a-zñ\s]+$/;  // Permitir letras minúsculas, ñ y espacios
    let valido = true;

    // Verificar si el primer caracter es una mayúscula
    if (texto[0] && texto[0].toUpperCase() === texto[0]) {
        valido = false;
        return false; // Salir de la función si hay mayúscula
    }

    // Verificar todos los caracteres en el texto
    for (let i = 1; i < texto.length; i++) {
        if (!regex.test(texto[i])) {
            valido = false;
            break;
        }
    }

    const botonEncriptar = document.querySelector('.presentacion__enlaces__link:first-child');
    const botonDesencriptar = document.querySelector('.presentacion__enlaces__link:last-child');

    if (valido) {
        botonEncriptar.disabled = false;
        botonDesencriptar.disabled = false;
    } else {
        botonEncriptar.disabled = true;
        botonDesencriptar.disabled = true;
    }

    return valido;
}

// Función para eliminar la imagen y el parrafo del DOM
function eliminarElementos() {
    const imagen = document.querySelector('.presentacion__contenido__imagen');
    const parrafoTitulo = document.querySelector('.presentacion__imagen__contenido_titulo');
    const parrafoSubtitulo = document.querySelector('.presentacion__imagen__contenido_subtitulo');

    if (imagen) imagen.remove();
    if (parrafoTitulo) parrafoTitulo.remove();
    if (parrafoSubtitulo) parrafoSubtitulo.remove();
}

// Función para copiar el contenido al portapapeles
function copiarContenido() {
    const contenido = miTextarea2.value;
    const textarea = document.createElement('textarea');
    textarea.value = contenido;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Contenido copiado al portapapeles');
}


// Modificar las funciones de encriptar y desencriptar para mostrar el botón de copiar
function encriptar() {
    const textarea = document.querySelector('#miTextarea');
    const contenidoTextarea = textarea.value;

    if (validarCaracteres(contenidoTextarea)) {
        let textoEncriptado = "";
        for (let i = 0; i < contenidoTextarea.length; i++) {
            let caracter = contenidoTextarea.charAt(i);
            let codigoAscii = caracter.charCodeAt(0);

            // Desplazar solo letras minúsculas (a-z)
            if (codigoAscii >= 97 && codigoAscii <= 122) {
                let nuevoCodigo = codigoAscii + 3; // Desplazar 3 posiciones

                // Corregir si pasa de la 'z'
                if (nuevoCodigo > 122) {
                    nuevoCodigo = nuevoCodigo - 26;
                }
                caracter = String.fromCharCode(nuevoCodigo);
            }
            textoEncriptado += caracter;
        }

        eliminarParrafos(); // Eliminar párrafos existentes antes de agregar el nuevo

        // Mostrar el textarea2
        const miTextarea2 = document.getElementById('miTextarea2');
        miTextarea2.style.display = 'flex';
        miTextarea2.value = textoEncriptado;

        // Mostrar el botón de copiar
        const copiarBtn = document.getElementById('copiarBtn');
        copiarBtn.style.display = 'flex';

        // Eliminar elementos del DOM después de la encriptación
        eliminarElementos();

    } else {
        alert("Caracteres incorrectos. Solo se permiten letras minúsculas y sin acentos.");
    }
}

function desencriptar() {
    const textarea = document.querySelector('#miTextarea');
    const contenidoTextarea = textarea.value;

    if (validarCaracteres(contenidoTextarea)) {
        let textoDesencriptado = "";

        for (let i = 0; i < contenidoTextarea.length; i++) {
            let caracter = contenidoTextarea.charAt(i);
            let codigoAscii = caracter.charCodeAt(0);

            // Desplazar solo letras minúsculas (a-z)
            if (codigoAscii >= 97 && codigoAscii <= 122) {
                let nuevoCodigo = codigoAscii - 3; // Desplazar 3 posiciones hacia atrás

                // Corregir si pasa de la 'a'
                if (nuevoCodigo < 97) {
                    nuevoCodigo = nuevoCodigo + 26;
                }

                caracter = String.fromCharCode(nuevoCodigo);
            }

            textoDesencriptado += caracter;
        }
        // Mostrar el texto desencriptado en miTextarea2
        const miTextarea2 = document.getElementById('miTextarea2');
        miTextarea2.style.display = 'block'; // Cambiar a 'block' para mostrar el textarea
        miTextarea2.value = textoDesencriptado;

        // Mostrar el botón de copiar
        const copiarBtn = document.getElementById('copiarBtn');
        copiarBtn.style.display = 'flex';

        // Eliminar elementos del DOM después de la desencriptación
        eliminarElementos();

    } else {
        alert("Caracteres incorrectos. Solo se permiten letras minúsculas y sin acentos.");
    }
}

// Función para eliminar párrafos existentes
function eliminarParrafos() {
    const parrafos = document.querySelectorAll('.presentacion__imagen__contenido p');
    parrafos.forEach(parrafo => parrafo.remove());
}
