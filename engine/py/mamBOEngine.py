import time
from selenium.webdriver import Chrome
from selenium.webdriver import Firefox
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.wait import WebDriverWait
import selenium.webdriver.support.expected_conditions as ec


def driverpath(path):
    driverpath = path
    return driverpath


def chromeStart(driverpath):
    driver = Chrome(driverpath)
    act = ActionChains(driver)
    return driver, act


def firefoxStart(driverpath):
    options = Options()
    service = Service(driverpath)
    driver = Firefox(service=service, options=options)
    act = ActionChains(driver)
    return driver, act


def maxiWindow(driver):
    return driver.maximize_window()


def focusEle(driver, path):
    return driver.find_element(By.XPATH, path).click()


def writeText(driver, act, keys, path=''):
    if path == '':
        return act.send_keys(keys).perform()
    else:
        return driver.find_element(By.XPATH, path).send_keys(Keys.CONTROL + "a"), driver.find_element(By.XPATH, path).send_keys(Keys.DELETE), driver.find_element(By.XPATH, path).send_keys(keys)


def clearText(driver, act, path):
    return driver.find_element(By.XPATH, path).send_keys(Keys.CONTROL + "a"), driver.find_element(By.XPATH, path).send_keys(Keys.DELETE)


def waitfor(driver, path, text=''):
    if (text != ''):  # max timeout v                           Selecionar o elemento v         v texto do elemento
        return WebDriverWait(driver, 100).until(ec.text_to_be_present_in_element((By.XPATH, path), text))


def delay(s):
    return time.sleep(s)


def clickEle(driver, path):
    return driver.find_element(By.XPATH, path).click()


def overEle(driver, act, path):
    return act.move_to_element(driver.find_element(By.XPATH, path)).perform()


def goToURL(driver, url):
    return driver.get(url)


def backspace(act, n):
    i = 1
    n = int(n)
    while i <= n:
        act.send_keys(Keys.BACKSPACE).perform()
        i += 1
    return act


def enter(act):
    return act.send_keys(Keys.ENTER).perform()


def tab(act, n):
    i = 1
    n = int(n)
    while i <= n:
        act.send_keys(Keys.TAB).perform()
        i += 1
    return act


def newTab(driver, url):
    return driver.switch_to.new_window('tab'), driver.get(url)


def newWindow(driver, url):
    return driver.switch_to.new_window('window'), driver.get(url)


def windowCapture(driver, totalcaptures, step):
    return driver.get_screenshot_as_file(f'D:\\xampp\\htdocs\\mambo\\engine\\captures\\screenshot{totalcaptures}-passo{step}.png')
