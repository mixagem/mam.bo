document.querySelector('#getJSON').addEventListener('click', createJSON)
document.querySelector('#addStep').addEventListener('click', addStep)
let object2JSON;
let currentSteps = 1;

function createJSON() {
    // selecionar a linha
    const casos = document.querySelectorAll('.test-steps-row')
    // objeto para guardar inputs
    let allInputsArray = [];
    let inputObject = {};

    for (caso of casos) {
        // loop para guardar todos os inputs
        for (valor of caso.children) {
            // dá skip caso o elemento não seja um input
            if (valor.children[0].tagName == 'INPUT') {
                // inrtoduzir no objeto com key=id, valor=valor do input             
                inputObject[valor.children[0].name] = (valor.children[0].value)
            }
        }
        allInputsArray.push(inputObject)
    }
    object2JSON = JSON.stringify(allInputsArray);
    saveJSON();
}

function saveJSON() {
    // Create a blob of the data
    const JSONdownload = new Blob([object2JSON], {
        type: 'application/json'
    });
    // Save the file
    saveAs(JSONdownload, 'casoteste.json');
}

function addStep() {
    currentSteps = currentSteps + 1
    newStep = document.createElement('div')
    newStep.className = 'test-steps-row row';
    newStep.innerHTML = `<div class="col-md-2 order"># <input name="order"></div><div class="col-md-5 desc">Desc<input name="desc"></div><div class="col-md-5 action">Action<input list="action-list-${currentSteps}" name="action"><datalist id="action-list-${currentSteps}"><option value="Focus"><option value="Escrever"><option value="Limpar"><option value="Click"><option value="Mouseover"><option value="Tab"><option value="Enter"><option value="Delay"></datalist></div><div class="col-md-6 select">Select<input name="select"></div><div class="col-md-6 value">Value<input name="value"></div></div>`
    document.querySelector('#test-steps-container').appendChild(newStep)
}