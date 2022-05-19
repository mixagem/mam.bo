from selenium.webdriver import Chrome
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
import time

#def driverpath(path):
    driverpath = path
    return driverpath

#def gopath(path):
    gopath = path
    return gopath

#def autogoStart(driverpath, gopath):
    driver = Chrome(driverpath)
    driver.get(gopath)
    act = ActionChains(driver)
    return driver, act

#def autogoStart(driverpath):
    driver = Chrome(driverpath)
    act = ActionChains(driver)
    return driver, act


def maxiWindow(driver):
   return driver.maximize_window()

def delay(s):
    return time.sleep(s)

def focusEle(driver, path, searchBy=By.XPATH):
    return driver.find_element(searchBy, path).click()


def textEle(driver, path, keys, searchBy=By.XPATH):
   return driver.find_element(searchBy, path).send_keys(keys)


def inputText(act, keys):
   return act.send_keys(keys).perform()

def clickEle(driver, path, searchBy=By.XPATH):
   return driver.find_element(searchBy, path).click()

