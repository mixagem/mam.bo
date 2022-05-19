import autogoEngine
import json
# Vai buscar ao json, os inputs necessários
ficheiro = open('D:\\xampp\\htdocs\\mambo\\engine\\mambots\\woo-install.json')
jsondata = json.load(ficheiro)
# print(jsondata)

# Inicializar o Chrome Driver
driverpath = autogoEngine.driverpath('D:\\xampp\\htdocs\\mambo\\engine\\drivers\\chromedriver.exe')
driver, act = autogoEngine.autogoStart(driverpath)
autogoEngine.maxiWindow(driver)

# Executa o JSON
for step in (jsondata):
    # executa o step
    match (step[2]):
        case 'focus':
            autogoEngine.focusEle(driver, step[3])
        case 'write':
            autogoEngine.writeText(driver, act, step[3], step[4])
        case 'clear':
            autogoEngine.clearText(driver, act, step[3])
        case 'delay':
            autogoEngine.delay(int(step[3]))
        case 'waitfor':
            autogoEngine.waitfor(driver, step[3], step[4])
        case 'mouse-click':
            autogoEngine.clickEle(driver, step[3])
        case 'mouse-over':
            autogoEngine.overEle(driver, step[3])
        case 'chrome-goto-url':
            autogoEngine.goToURL(driver, step[3])
    autogoEngine.delay(1)