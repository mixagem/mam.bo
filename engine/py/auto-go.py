import autogoEngine
import json
# Vai buscar ao json, os inputs necessários
ficheiro = open('engine\\casoteste.json')
jsondata = json.load(ficheiro)
# print(jsondata)

# Inicializar o Chrome Driver
driverpath = autogoEngine.driverpath('drivers\\chromedriver.exe')
driver, act = autogoEngine.autogoStart(driverpath)
autogoEngine.maxiWindow(driver)

# Executa o JSON
for step in (jsondata):
    match (step['action']):
        case 'Focus':
            autogoEngine.focusEle(driver, step['select'])
        case 'Escrever':
            autogoEngine.inputText(act, step['value'])
        case 'Click':
            autogoEngine.clickEle(driver, step['select'])
        case 'Delay':
            autogoEngine.delay(int(step['value']))