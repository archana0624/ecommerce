import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


class BuyNestAdminTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        cls.driver.maximize_window()
        cls.base_url = "http://localhost:3000"  # frontend

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def login_as_admin(self, email="admin@buynest.com", password="admin123"):
        driver = self.driver
        driver.get(f"{self.base_url}/admin-login")
        time.sleep(2)

        driver.find_element(By.NAME, "email").clear()
        driver.find_element(By.NAME, "email").send_keys(email)

        driver.find_element(By.NAME, "password").clear()
        driver.find_element(By.NAME, "password").send_keys(password)

        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(3)

    # ✅ SUCCESSFUL LOGIN
    def test_1_admin_login_success(self):
        self.login_as_admin()
        self.assertIn("/admin", self.driver.current_url, "Admin did not reach dashboard after login")

    # ❌ FAILED LOGIN
    def test_2_admin_login_failure(self):
        driver = self.driver
        driver.get(f"{self.base_url}/admin-login")
        time.sleep(1)

        driver.find_element(By.NAME, "email").send_keys("wrong@admin.com")
        driver.find_element(By.NAME, "password").send_keys("wrongpass")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(2)

        message = driver.find_element(By.CLASS_NAME, "message").text
        self.assertIn("Invalid admin credentials", message)

    # ➕ ADD PRODUCT
    def test_3_add_product(self):
        driver = self.driver
        self.login_as_admin()

        driver.find_element(By.NAME, "name").send_keys("Test Product")
        driver.find_element(By.NAME, "price").send_keys("999")
        driver.find_element(By.NAME, "description").send_keys("This is a Selenium test product")

        # update path with a valid image on your system
        image_input = driver.find_element(By.NAME, "image")
        image_input.send_keys(r"C:\Users\Hp\Desktop\slipper.jpg")

        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(3)

        self.assertIn("Test Product", driver.page_source)

    # ✏️ UPDATE PRODUCT
    def test_4_update_product(self):
        driver = self.driver
        self.login_as_admin()

        update_btns = driver.find_elements(By.XPATH, "//button[text()='Update']")
        self.assertGreater(len(update_btns), 0, "No product available to update")

        update_btns[0].click()
        time.sleep(2)

        desc_field = driver.find_element(By.NAME, "description")
        desc_field.clear()
        desc_field.send_keys("Updated by Selenium")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(3)

        self.assertIn("Updated by Selenium", driver.page_source)

    # 🔍 SEARCH PRODUCT
    def test_5_search_product(self):
        driver = self.driver
        self.login_as_admin()

        search_box = driver.find_element(By.CLASS_NAME, "search-input")
        search_box.clear()
        search_box.send_keys("Test Product")
        time.sleep(2)

        rows = driver.find_elements(By.XPATH, "//table/tbody/tr")
        self.assertGreater(len(rows), 0, "No products found in search")

    # ❎ DELETE PRODUCT
    def test_6_delete_product(self):
        driver = self.driver
        self.login_as_admin()

        delete_btns = driver.find_elements(By.XPATH, "//button[text()='Delete']")
        if delete_btns:
            delete_btns[0].click()
            time.sleep(1)

            # Handle JS confirm alert
            alert = driver.switch_to.alert
            alert.accept()
            time.sleep(3)

            self.assertNotIn("Test Product", driver.page_source)
        else:
            self.skipTest("No product available to delete")


if __name__ == "__main__":
    unittest.main()
