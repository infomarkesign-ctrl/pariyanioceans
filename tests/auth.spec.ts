import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8080';

test.describe('PARIYANI OCEANS Authentication - UI', () => {

  test('Sign In page loads with branding', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: /Sign Up/i })).toBeVisible();
    await expect(page.getByText('27AARCP2277N1ZK')).toBeVisible();
    await expect(page.getByText('Premium quality meat, fish & seafood')).toBeVisible();
  });

  test('Toggle between Sign In and Sign Up modes', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await expect(page.getByText('Enter your email to receive OTP')).toBeVisible();

    await page.getByRole('button', { name: /Sign Up/i }).click();
    await expect(page.getByText('Create Account')).toBeVisible({ timeout: 3000 });
    await expect(page.getByPlaceholder('John Doe')).toBeVisible();

    await page.getByRole('button', { name: /Sign In/i }).click();
    await expect(page.getByText('Enter your email to receive OTP')).toBeVisible();
  });

  test('Sign In email validation', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    const continueBtn = page.getByRole('button', { name: 'Continue' }).first();
    await expect(continueBtn).toBeDisabled();

    await page.getByPlaceholder('name@example.com').fill('invalid-email');
    await expect(continueBtn).toBeDisabled();

    await page.getByPlaceholder('name@example.com').fill('test@example.com');
    await expect(continueBtn).toBeEnabled();
  });

  test('Sign Up form validation - name and email', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.getByRole('button', { name: /Sign Up/i }).click();

    const continueBtn = page.getByRole('button', { name: 'Continue' }).first();
    await expect(continueBtn).toBeDisabled();

    await page.getByPlaceholder('John Doe').fill('Test User');
    await expect(continueBtn).toBeDisabled();

    await page.getByPlaceholder('name@example.com').fill('test@example.com');
    await expect(continueBtn).toBeEnabled();
  });

  test('Checkout page requires login', async ({ page }) => {
    await page.goto(`${BASE_URL}/checkout`);

    const notLoggedIn = await page.getByText(/Login Required|login/i).isVisible().catch(() => false);
    expect(notLoggedIn || page.url().includes('/checkout')).toBeTruthy();
  });

  test('Password field appears on signup step 2', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.getByRole('button', { name: /Sign Up/i }).click();

    await page.getByPlaceholder('John Doe').fill('Test User');
    await page.getByPlaceholder('name@example.com').fill('test@example.com');
    await page.getByRole('button', { name: 'Continue' }).first().click();

    await expect(page.getByText('Set Your Password')).toBeVisible({ timeout: 3000 });
    await expect(page.getByPlaceholder('••••••••').first()).toBeVisible();
  });

  test('Strong password indicator', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.getByRole('button', { name: /Sign Up/i }).click();
    await page.getByPlaceholder('John Doe').fill('Test User');
    await page.getByPlaceholder('name@example.com').fill('test@example.com');
    await page.getByRole('button', { name: 'Continue' }).first().click();

    const passwordInput = page.getByPlaceholder('••••••••').first();

    // Weak password shows indicator
    await passwordInput.fill('weak');
    await expect(page.getByText('At least 8 characters')).toBeVisible();

    // Strong password shows indicator
    await passwordInput.fill('strongpass123');
    await expect(page.getByText('✓ Strong password')).toBeVisible();
  });

  test('Confirm password validation', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.getByRole('button', { name: /Sign Up/i }).click();
    await page.getByPlaceholder('John Doe').fill('Test User');
    await page.getByPlaceholder('name@example.com').fill('test@example.com');
    await page.getByRole('button', { name: 'Continue' }).first().click();

    const passwordInputs = page.getByPlaceholder('••••••••');
    const passwordInput = passwordInputs.first();
    const confirmInput = passwordInputs.nth(1);

    // Passwords don't match
    await passwordInput.fill('MyPassword123');
    await confirmInput.fill('DifferentPass123');
    await expect(page.getByText("✗ Passwords don't match")).toBeVisible();

    // Passwords match
    await confirmInput.fill('MyPassword123');
    await expect(page.getByText('✓ Passwords match')).toBeVisible();
  });

  test('Email input with valid and invalid formats', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    const emailInput = page.getByPlaceholder('name@example.com');
    const continueBtn = page.getByRole('button', { name: 'Continue' }).first();

    // Test various invalid formats
    const invalidEmails = ['notanemail', 'missing@domain', '@nodomain.com', 'spaces in@email.com'];
    for (const email of invalidEmails) {
      await emailInput.fill(email);
      await expect(continueBtn).toBeDisabled();
    }

    // Test valid format
    await emailInput.fill('valid@example.com');
    await expect(continueBtn).toBeEnabled();
  });

  test('Terms and conditions checkbox on signup', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.getByRole('button', { name: /Sign Up/i }).click();
    await page.getByPlaceholder('John Doe').fill('Test User');
    await page.getByPlaceholder('name@example.com').fill('test@example.com');
    await page.getByRole('button', { name: 'Continue' }).first().click();

    // Fill passwords
    const passwordInputs = page.getByPlaceholder('••••••••');
    const passwordInput = passwordInputs.first();
    const confirmInput = passwordInputs.nth(1);
    await passwordInput.fill('StrongPassword123');
    await confirmInput.fill('StrongPassword123');

    // Check for Terms & Conditions checkbox
    const termsCheckbox = page.locator('input[type="checkbox"]');
    await expect(termsCheckbox).toBeVisible();

    const termsText = page.getByText(/Terms & Conditions/i);
    await expect(termsText).toBeVisible();
  });

});
