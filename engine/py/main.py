from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
import selenium.webdriver.support.expected_conditions as ec
import time

## Abre o ChromeDriver
path="D:\\Arquivo\\Web Design\\MBC (mixagem's bot creator)\\engine\\drivers\\chromedriver.exe"
driver = Chrome(path)
driver.maximize_window()

#############
## Aqui introduzir o load do JSON
#############

driver.get('https://sis.phc.pt/fteixeira/html') # substituir por função da classe propria propria

#############
# enquanto este elemente nao carregar, nao passa para o proximo passo (deve ser criada função da classe propria)
wait = WebDriverWait(driver,15)
wait.until(ec.text_to_be_present_in_element((By.XPATH,'//input[@id="username"]/following-sibling::span/label/mat-label'),"Nome do utilizador ou e-mail"))
#############

driver.find_element(By.ID, 'username').send_keys('admin') # substituir por função da classe propria propria

driver.find_element(By.ID, 'password').send_keys('Qualfx') # substituir por função da classe propria propria

driver.find_element(By.XPATH, '//button[@type="submit"]').click() # substituir por função da classe propria propria

driver.close()  # substituir por função da classe propria propria