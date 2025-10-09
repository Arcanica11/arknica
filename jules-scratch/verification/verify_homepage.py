from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # --- Listen for console errors ---
        console_errors = []
        page.on("console", lambda msg: console_errors.append(f"[{msg.type}] {msg.text}") if msg.type == "error" else None)

        try:
            # Navigate to the homepage on the correct port
            page.goto("http://localhost:3006", timeout=60000)

            # Wait for the main heading to be visible
            hero_title = page.get_by_role("heading", name="Convertimos tus ideas en soluciones digitales.")
            expect(hero_title).to_be_visible(timeout=10000)

            # Take a screenshot
            page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)
            print("Screenshot captured successfully.")

        except Exception as e:
            print(f"An error occurred during Playwright execution: {e}")
            # In case of error, save a screenshot and print console errors
            page.screenshot(path="jules-scratch/verification/error.png")
            if console_errors:
                print("\n--- Browser Console Errors ---")
                for error in console_errors:
                    print(error)
                print("--------------------------\n")
            else:
                print("\nNo console errors were captured.\n")

        finally:
            browser.close()

if __name__ == "__main__":
    run_verification()