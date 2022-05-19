import mamBOEngine
import json

ficheiro = open('D:\\xampp\\htdocs\\mambo\\engine\\mambots\\woo-setup.json')
jsondata = json.load(ficheiro)

# Inicializar o Chrome Driver
driverpath = mamBOEngine.driverpath(
    'D:\\xampp\\htdocs\\mambo\\engine\\drivers\\chromedriver.exe')
driver, act = mamBOEngine.chromeStart(driverpath)

# Inicializar o Firefox Driver
# driverpath = mamBOEngine.driverpath(
#     'D:\\xampp\\htdocs\\mambo\\engine\\drivers\\geckodriver.exe')
# driver, act = mamBOEngine.firefoxStart(driverpath)


mamBOEngine.maxiWindow(driver)

# Guardar o ID da janela principal, a ser utilizado em futuras funções
# mainWindow = driver.current_window_handle

# variável com o número de capturas efetuadas
numCapturas = 0

# Executa o JSON
for step in (jsondata):
    # executa o step
    match (step[2]):
        case 'focus':
            mamBOEngine.focusEle(driver, step[3])
        case 'write':
            mamBOEngine.writeText(driver, act, step[3], step[4])
        case 'clear':
            mamBOEngine.clearText(driver, act, step[3])
        case 'delay':
            mamBOEngine.delay(int(step[3]))
        case 'waitfor':
            mamBOEngine.waitfor(driver, step[3], step[4])
        case 'mouse-click':
            mamBOEngine.clickEle(driver, step[3])
        case 'mouse-over':
            mamBOEngine.overEle(driver, act, step[3])
        case 'chrome-goto-url':
            mamBOEngine.goToURL(driver, step[3])
        case 'key-backspace':
            mamBOEngine.backspace(act, step[3])
        case 'key-enter':
            mamBOEngine.enter(act)
        case 'key-tab':
            mamBOEngine.tab(act, step[3])
        case 'chrome-new-tab':
            mamBOEngine.newTab(driver, step[3])
        case 'chrome-new-window':
            mamBOEngine.newWindow(driver, step[3])
        case 'chrome-screen-capture':
            numCapturas = numCapturas + 1
            mamBOEngine.windowCapture(driver, numCapturas, step[0])

        # case 'chrome-tab-change':
        # case 'chrome-winow-change':
            # adicionar loop a percorrer os tabs todos, e a guardar em array o [título da página], [url da página] e o [id do tab]
            # adicionar input de procura c/radio button, [nome da página] ou [url da página]

    # delay entre os vários steps
    mamBOEngine.delay(1)
    
# fecha todas as janelas associadas com o bot (pode vir a ser um parametro opcional)
driver.quit();