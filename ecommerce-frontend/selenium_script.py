import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

class BuyNestE2ETests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        cls.driver.maximize_window()
        cls.base_url = "http://localhost:3000"  # React app base URL

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test_full_flow_signup_to_cart_and_buy_now(self):
        driver = self.driver

        # ---- SIGNUP ----
        driver.get(f"{self.base_url}/login")
        time.sleep(2)

        driver.find_element(By.CLASS_NAME, "toggle").click()
        time.sleep(1)

        driver.find_element(By.NAME, "name").send_keys("Test User")
        driver.find_element(By.NAME, "email").send_keys("testuser6@example.com")
        driver.find_element(By.NAME, "password").send_keys("Password123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(3)

        self.assertIn("/products", driver.current_url)
        print("Signup successful, redirected to products page")

        # ---- LOGOUT + LOGIN ----
        driver.execute_script("window.localStorage.clear();")
        driver.get(f"{self.base_url}/login")
        time.sleep(2)

        driver.find_element(By.NAME, "email").send_keys("testuser6@example.com")
        driver.find_element(By.NAME, "password").send_keys("Password123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(3)

        self.assertIn("/products", driver.current_url)
        print("Login successful, redirected to products page")

        # ---- PRODUCTS ----
        product_cards = driver.find_elements(By.CLASS_NAME, "product-card")
        self.assertGreater(len(product_cards), 0, "No products found")

        # Add first product to cart
        first_product = product_cards[0]
        add_btn = first_product.find_element(By.XPATH, ".//button[contains(text(),'Add to Cart')]")
        add_btn.click()
        time.sleep(1)
        print("Product added to cart")
        # ✅ Handle alert: "Product added to cart!"
        try:
            alert = driver.switch_to.alert
            alert.accept()
            time.sleep(1)
        except:
            print("No alert appeared after adding to cart")

        # ---- CART ----
        driver.get(f"{self.base_url}/cart")
        time.sleep(2)

        cart_items = driver.find_elements(By.CLASS_NAME, "cart-item")
        self.assertGreater(len(cart_items), 0, "Cart is empty after adding product")

        plus_btn = cart_items[0].find_element(By.XPATH, ".//button[text()='+']")
        plus_btn.click()
        time.sleep(1)

        remove_btn = cart_items[0].find_element(By.XPATH, ".//button[contains(text(),'❎')]")
        remove_btn.click()
        time.sleep(2)

        # ---- BUY NOW ----
        driver.get(f"{self.base_url}/products")
        time.sleep(2)

        # Click "Buy Now" on first product
        first_product = driver.find_elements(By.CLASS_NAME, "product-card")[0]
        buy_btn = first_product.find_element(By.XPATH, ".//button[contains(text(),'Buy Now')]")
        buy_btn.click()
        time.sleep(2)

        # Fill Buy Now form
        driver.find_element(By.NAME, "name").send_keys("Test Buyer")
        driver.find_element(By.NAME, "phone").send_keys("9876543210")
        driver.find_element(By.NAME, "address").send_keys("123 Main Street, Test City")
        qty_input = driver.find_element(By.NAME, "quantity")
        qty_input.clear()
        qty_input.send_keys("2")
        print("Buy Now form filled successfully")

        # Submit → should trigger Razorpay
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(5)
        print("Buy Now form submitted, waiting for Razorpay popup...")

        # Verify Razorpay popup/iframe appeared
        checkout_frames = driver.find_elements(By.CSS_SELECTOR, "iframe.razorpay-checkout-frame")
        self.assertGreater(len(checkout_frames), 0, "Razorpay checkout did not appear")
        print("Razorpay checkout appeared successfully")

        # Close Razorpay popup safely
        driver.switch_to.default_content()
        driver.execute_script("document.querySelector('iframe.razorpay-checkout-frame')?.remove();")
        time.sleep(2)
        print("Razorpay popup closed successfully")
        print("Full flow test completed successfully")

if __name__ == "__main__":
    unittest.main()
