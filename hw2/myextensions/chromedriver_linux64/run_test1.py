import sys
import requests
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys

TIMEOUT = 5

def parse_csv(csv):
    urls = csv.split(',')
    urls = set(urls)
    return urls

def test1(driver, exfil_url):
    try:
        # basic URL tests
        URLS = ["https://www.google.com/",  "https://www.youtube.com/", "http://www.baidu.com/", "https://www.wikipedia.org/", "http://example.com/"]

        for url in URLS:
            driver.get(url)


        # test basic links
        url = "https://www.microsoft.com/en-us/sitemap.aspx"
        driver.get(url)
        time.sleep(2)
        button = driver.find_element_by_link_text("Shop")
        button.click()
        wait = WebDriverWait(driver, TIMEOUT)
        # should have accessed https://www.microsoft.com/en-us/store/b/home and https://www.microsoft.com/en-us

        # test POST and keyboard RETURN
        url = "https://www.facebook.com"
        driver.get(url)
        wait = WebDriverWait(driver, TIMEOUT)
        username = "username"
        password = "password"
        element = driver.find_element_by_id("email")
        element.send_keys(username)
        element = driver.find_element_by_id("pass")
        element.send_keys(password)
        element.send_keys(Keys.RETURN)

        wait = WebDriverWait(driver, TIMEOUT)

        driver.quit()

    except Exception as e:
        print(e)
        print("[-] Browsing failed. Try again.")
        exit(-2)

    ANSWERS = URLS
    #ANSWERS.append("https://www.microsoft.com/en-us/store/b/home")
    #ANSWERS.append("https://www.microsoft.com/en-us")
    #ANSWERS.append("https://www.facebook.com/")
    #ANSWERS.append("https://www.facebook.com/login/device-based/regular/login/?login_attempt=1")


    exfil_raw = requests.get(exfil_url).text
    assert(exfil_raw is not None)

    exfil_s = parse_csv(exfil_raw)
    fail = False
    for answer in ANSWERS:
        if (answer not in exfil_s):
            fail = True
            print("[-] Missing URL: %s" % answer)
    return fail


def init_driver(ext_path):
    options = Options()
    options.add_argument('--load-extension={}'.format(ext_path))
    driver = webdriver.Chrome(options=options)
    return driver


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("python3 run_test1.py <absolute_path_to_extension> <localhost_url_for_exfiltrated_file>")
        exit(-1)
    ext_path = sys.argv[1]
    exfil_url = sys.argv[2]

    d = init_driver(ext_path)
    fail = test1(d, exfil_url)

    if fail:
        print("[-] Test 1 Failed.")
        exit(-1)
    else:
        print("[+] Test 1 Passed!")
        exit(0)


