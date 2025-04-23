let matriz1, matriz2;

async function generarMatrices(){
    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);
    let matricesDiv = document.getElementById("matrices");
    matricesDiv.innerHTML = '';

    matriz1 = tf.randomUniform([filas, columnas], 1, 21, 'int32');
    matriz2 = tf.randomUniform([filas, columnas], 1, 21, 'int32');
    
    for (let i = 1; i <= 2; i++){
        let matrizDiv = document.createElement("div");
        matrizDiv.className = "matriz";
        matrizDiv.style.display = "grid";
        matrizDiv.style.gridTemplateColumns=`repeat(${columnas},auto)`;

        for (let f = 0; f < filas; f++){
            for(let c = 0; c < columnas; c++){
                let input = document.createElement('input');
                input.type='number';
                input.className=`matriz${i}`;
                input.disabled = true;
                matrizDiv.appendChild(input);
            }
        }
        matricesDiv.appendChild(matrizDiv);
    }

    const datos1 = await matriz1.array();
    const datos2 = await matriz2.array();

    let inputs1 = document.querySelectorAll('.matriz1');
    let inputs2 = document.querySelectorAll('.matriz2');

    let index= 0;
    datos1.forEach(fila => fila.forEach(valor => {
        inputs1[index].value = valor;
        index++;
    }));

    index = 0;
    datos2.forEach(fila => fila.forEach(valor =>{
        inputs2[index].value = valor;
        index++;
    }));
}


function sumarMatrices(){
    if(!matriz1 || !matriz2) {
        alert("Genera las matrices primero.");
        return;
    }

    let resultado = tf.add(matriz1, matriz2);
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    resultadoDiv.style.display = "grid";
    resultadoDiv.style.gridTemplateColumns = `repeat(${matriz1.shape[1]}, auto)`;

    resultado.array().then(data =>{
        data.forEach(fila =>{
            fila.forEach(valor => {
                let cell = document.createElement('div');
                cell.textContent = valor;
                resultadoDiv.appendChild(cell);
            });
        });
    });
}
