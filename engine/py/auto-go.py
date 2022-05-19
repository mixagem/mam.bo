import mamBO
import json
# Vai buscar ao json, os inputs necessários
ficheiro = open('D:\\xampp\\htdocs\\mambo\\engine\\mambots\\woo-setup.json')
jsondata = json.load(ficheiro)
# print(jsondata)

# Inicializar o Chrome Driver
driverpath = mamBO.driverpath('D:\\xampp\\htdocs\\mambo\\engine\\drivers\\chromedriver.exe')
driver, act = mamBO.autogoStart(driverpath)
mamBO.maxiWindow(driver)

# Executa o JSON
for step in (jsondata):
    # executa o step
    match (step[2]):
        case 'focus':
            mamBO.focusEle(driver, step[3])
        case 'write':
            mamBO.writeText(driver, act, step[3], step[4])
        case 'clear':
            mamBO.clearText(driver, act, step[3])
        case 'delay':
            mamBO.delay(int(step[3]))
        case 'waitfor':
            mamBO.waitfor(driver, step[3], step[4])
        case 'mouse-click':
            mamBO.clickEle(driver, step[3])
        case 'mouse-over':
            mamBO.overEle(driver, step[3])
        case 'chrome-goto-url':
            mamBO.goToURL(driver, step[3])
    mamBO.delay(1)