(function mamboWrapper() {

    const mamboVariables = {
        currentSteps: 1
    }
    const mamboGridElements = {
        // linha genérica
        linha: function (previousStepNo, nextStepNo) {


            const linha = mamboGridFunctions.ele('div', '', 'row align-items-center step')

            if (isNaN(nextStepNo)) {
                linha.appendChild(mamboGridFunctions.ele('div', '', 'col-sm-1 fixed', `${Math.floor(previousStepNo) + 1}`))
            }
            else if (Number.isInteger(previousStepNo) && Number.isInteger(nextStepNo)) {
                linha.appendChild(mamboGridFunctions.ele('div', '', 'col-sm-1 fixed', `${Math.floor(previousStepNo) + .5}`))
            } else {
                return console.log('something went wrong mix')
            }

            linha.appendChild(mamboGridFunctions.ele('div', '', 'col-sm-2 fixed'))
            linha.lastChild.appendChild(mamboGridFunctions.ele('input'))
            linha.appendChild(mamboGridFunctions.ele('div', '', 'col-sm-2 fixed'))
            const actionSelect = linha.lastChild.appendChild(mamboGridFunctions.ele('select'))
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', ' -- escolher uma ação -- '))
            actionSelect.lastChild.ariaSelected; actionSelect.lastChild.ariaDisabled; actionSelect.lastChild.ariaValue;
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', 'Elemento: Focar', 'focus'));
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', 'Elemento: Escrever texto', 'write'));
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', 'Elemento: Limpar texto', 'clear'));
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', 'MAMBO: Delay', 'delay'));
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', 'MAMBO: Esperar por', 'waitfor'));
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', 'Mouse: Click', 'mouse-click'));
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', 'Mouse: Over', 'mouse-over'));
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', 'Tecla: Enter', 'key-enter'));
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', 'Tecla: Tab', 'key-tab'));
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', 'Chrome: Alternar janela', 'chrome-window-change'));
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', 'Chrome: Navegar para URL', 'chrome-goto-url'));
            actionSelect.appendChild(mamboGridFunctions.ele('option', '', '', 'Chrome: Novo separador', 'chrome-new-tab'));
            return linha
        },
        // elemento genérico col-x para fazer espaçamento
        blank: function (size) {
            const col = document.createElement('div');
            col.classList = `col-sm-${size} mambo-blank`
            return col
        },
        // elemento genérico do tipo input
        input: function (desc) {
            const inputDiv = document.createElement('div');
            inputDiv.classList = 'col-sm-3 input-div';
            inputDiv.appendChild(document.createElement('p'));
            inputDiv.lastChild.innerHTML = desc;
            inputDiv.appendChild(document.createElement('input'));
            return inputDiv
        },
        // elemento final, com as ações para adicionar / remover step
        lastDiv: function () {
            const lastDiv = document.createElement('div');
            lastDiv.classList = 'col-sm text-end add-remove-step';
            lastDiv.appendChild(document.createElement('span'))
            lastDiv.lastChild.innerHTML = '<i class="lni lni-cross-circle"></i>';
            lastDiv.lastChild.addEventListener('click', mamboGridFunctions.removeStep)
            lastDiv.appendChild(document.createElement('span'))
            lastDiv.lastChild.innerHTML = '<i class="lni lni-circle-plus"></i>';
            lastDiv.lastChild.addEventListener('click', mamboGridFunctions.addStep)
            return lastDiv
        },
        // função para agrupar todos os elementos da ação
        mergeToTemplate: function (arrayToMerge) {
            // Col 7 para encaixar na grelha principal
            const finalWrapper = document.createElement('div')
            finalWrapper.classList = 'col-sm-7';
            // row dentro do col 7, para os elementos da ação selecionada
            const focusWrapper = document.createElement('div')
            focusWrapper.classList = 'row';
            // adicionar os elementos da ação ao div
            for (ele of arrayToMerge) {
                focusWrapper.appendChild(ele)
            }
            // adicionar a row com os elementos da ação ao Col 7
            finalWrapper.appendChild(focusWrapper)
            return finalWrapper
        },
        // template para a ação focus
        focusTemplate: function () {
            return mamboGridElements.mergeToTemplate([mamboGridElements.input('Caminho XPATH'), mamboGridElements.lastDiv()])
        },
        // template para a ação write
        writeTemplate: function () {
            return mamboGridElements.mergeToTemplate([mamboGridElements.input('Texto a escrever'), mamboGridElements.blank(1), mamboGridElements.input('Caminho XPATH <span>(opcional)</span>'), mamboGridElements.lastDiv()])
        },
        // template para a ação limpar
        clearTemplate: function () {
            return mamboGridElements.mergeToTemplate([mamboGridElements.input('XPATH <span>(opcional)</span>'), mamboGridElements.lastDiv()])
        },
        // template para a ação delay
        delayTemplate: function () {
            return mamboGridElements.mergeToTemplate([mamboGridElements.input('Tempo <span>(milisegundos)</span>'), mamboGridElements.lastDiv()])
        },
        // template para a ação waitfor
        waitforTemplate: function () {
            return mamboGridElements.mergeToTemplate([mamboGridElements.input('Caminho XPATH'), mamboGridElements.blank(1), mamboGridElements.input('Texto a procurar <span>(opcional)</span>'), mamboGridElements.lastDiv()])
        },
        // template para a ação mouse click
        mouseclickTemplate: function () {
            return mamboGridElements.mergeToTemplate([mamboGridElements.input('Caminho XPATH'), mamboGridElements.lastDiv()])
        },
        // template para a ação mouse over
        mouseoverTemplate: function () {
            return mamboGridElements.mergeToTemplate([mamboGridElements.input('Caminho XPATH'), mamboGridElements.lastDiv()])
        },
        // template para a ação enter
        pressEnterTemplate: function () {
            return mamboGridElements.mergeToTemplate([mamboGridElements.lastDiv()])
        },
        // template para a ação tab
        pressTabTemplate: function () {
            return mamboGridElements.mergeToTemplate([mamboGridElements.lastDiv()])
        },
        // template para a ação alternar janela
        changeTabTemplate: function () {
            return mamboGridElements.mergeToTemplate([mamboGridElements.input('Identificação da janela'), mamboGridElements.lastDiv()])
        },
        // template para a ação navegar para url
        goToURLTemplate: function () {
            return mamboGridElements.mergeToTemplate([mamboGridElements.input('URL destino'), mamboGridElements.lastDiv()])
        },
        // template para a ação abrir novo separador
        newTabTemplate: function () {
            return mamboGridElements.mergeToTemplate([mamboGridElements.input('URL destino <span>(do novo separador)</span>'), mamboGridElements.lastDiv()])
        },
    }

    const mamboGridFunctions = {
        // limpa os inputs da ação anterior
        clearPreviousActionTemplate: function (actionRow) {
            for (ele of actionRow.children) {
                if (!ele.classList.contains('fixed')) {
                    ele.remove();
                }
            }
        },
        // mostra os inputs de acordo com a ação selecionada
        actionChange: function (e) {
            const actionRow = e.target.parentElement.parentElement;
            mamboGridFunctions.clearPreviousActionTemplate(actionRow)
            switch (e.target.value) {
                case 'focus': actionRow.appendChild(mamboGridElements.focusTemplate())
                    break;
                case 'write': actionRow.appendChild(mamboGridElements.writeTemplate())
                    break;
                case 'clear': actionRow.appendChild(mamboGridElements.clearTemplate())
                    break;
                case 'delay': actionRow.appendChild(mamboGridElements.delayTemplate())
                    break;
                case 'waitfor': actionRow.appendChild(mamboGridElements.waitforTemplate())
                    break;
                case 'mouse-click': actionRow.appendChild(mamboGridElements.mouseclickTemplate())
                    break;
                case 'mouse-over': actionRow.appendChild(mamboGridElements.mouseoverTemplate())
                    break;
                case 'key-enter': actionRow.appendChild(mamboGridElements.pressEnterTemplate())
                    break;
                case 'key-tab': actionRow.appendChild(mamboGridElements.pressTabTemplate())
                    break;
                case 'chrome-window-change': actionRow.appendChild(mamboGridElements.changeTabTemplate())
                    break;
                case 'chrome-goto-url': actionRow.appendChild(mamboGridElements.goToURLTemplate())
                    break;
                case 'chrome-new-tab': actionRow.appendChild(mamboGridElements.newTabTemplate())
                    break;
            }
        },
        // função para adicionar um novo step
        addStep: function (e) {
            mamboVariables.currentSteps++;
            const linha = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
            const previousStepNo = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.innerHTML
            let nextStepNo;
            if (e.target.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling != null) {
                nextStepNo = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.firstElementChild.innerHTML
            }
            linha.parentElement.insertBefore(mamboGridElements.linha(Number(previousStepNo), Number(nextStepNo)), linha.nextSibling);
            mamboGridFunctions.orderSteps();
            mamboGridFunctions.addPlaceholders();
            mamboEventListeners.actionChange();
        },
        // função para remover um step
        removeStep: function (e) {
            if (mamboVariables.currentSteps === 1) {
                alert("Não posso elinimar o último passo")
                return
            }
            mamboVariables.currentSteps--;
            const linha = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
            linha.remove();
            mamboGridFunctions.orderSteps();
        },
        // função para ordenar os steps 
        orderSteps: function () {
            // const allSteps = document.querySelector('#my-steps-container').children;
            // let orderObj = {};
            // for (step of allSteps) {
            //     let stepNo = step.firstElementChild.innerText;
            //     orderObj[stepNo] = step;
            // }
            // const orderedSteps = Object.values(orderObj)
            // for (step of orderedSteps) {
            //     document.querySelector('#my-steps-container').appendChild(step)
            // }
            const allSteps = document.querySelector('#my-steps-container').children;
            for (i = 0; i < allSteps.length; i++) {
                allSteps[i].firstElementChild.innerHTML = `<p>${i + 1}</p>`
            }

        },
        addPlaceholders: function () {
            const descPlaceHolders = document.querySelectorAll('.row.align-items-center.step>div:nth-child(2) input')
            for (desc of descPlaceHolders) {
                desc.setAttribute('placeholder', '-- inserir descrição --')
            }
        },
        // createElement turbinada
        ele: function (ele, id = '', cla = '', inn = '', val = '') {
            const mambito = document.createElement(`${ele}`);
            if (id !== '') { mambito.id = `${id}` }
            if (cla !== '') { mambito.classList = `${cla}` }
            if (inn !== '') { mambito.innerHTML = `${inn}` }
            if (inn !== '') { mambito.value = `${val}` }
            return mambito
        },
    }

    const mamboJSONFunctions = {
        createJSON: function () {
            const allSteps = document.querySelector('#my-steps-container').children
            const allStepsValues = [];

            for (step of allSteps) {
                let stepID = step.children[0].innerText //id
                let stepDesc = step.children[1].firstElementChild.value // descrição
                let stepAction = step.children[2].firstElementChild.value // action
                let stepActionInputs = step.children[3].firstElementChild.children // todos os divs do col7, incluindo as ações +/- step
                let stepActionValues = []; // array com os valores dos inputs  
                for (actionsInput of stepActionInputs) {
                    // ignorar os divs de espaçamento e de ações para add/remover step
                    if (!actionsInput.classList.contains('add-remove-step') && !actionsInput.classList.contains('mambo-blank')) {
                        stepActionValues.push(actionsInput.lastChild.value)
                    }
                }
                // array com a informação completa do step, pronta para o json 
                const thisStepValues = [];
                thisStepValues.push(stepID, stepDesc, stepAction)
                for (actionValues of stepActionValues) {
                    thisStepValues.push(actionValues)
                }
                // envia para o array final de steps, o array deste step
                allStepsValues.push(thisStepValues)
            }
            const object2JSON = JSON.stringify(allStepsValues);
            mamboJSONFunctions.saveJSON(object2JSON);
        },
        saveJSON: function (obj) {
            // Create a blob of the data
            const downloadJSON = new Blob([obj], {
                type: 'application/json'
            });
            // Save the file
            saveAs(downloadJSON, 'mambo.json');
        },
        loadJSON: function () {
            const formData = new FormData();
            const files = $('#json-load')[0].files;
            // Check file selected or not
            if (files.length > 0) {
                formData.append('file', files[0]);
                $.ajax({
                    url: '../php/json-load.php',
                    type: 'post',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        console.log(response)
                    },
                });
            } else { alert("Não foi selecionado nenhum script."); }
        }
    }


    const mamboEventListeners = {
        actionChange: function () {
            for (select of document.querySelectorAll('.step select')) {
                select.addEventListener('change', mamboGridFunctions.actionChange)
            }
        },
        mamboJSON: document.querySelector('#get-json').addEventListener('click', mamboJSONFunctions.createJSON)
    }
    mamboEventListeners.actionChange();
})();