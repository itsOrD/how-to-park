const { test, expect } = require('@playwright/test');

test.describe('Login Flow', () => {
  test('should display login page with all elements', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle('HowToPark');
    
    // Check login heading
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    
    // Check form elements
    await expect(page.getByText('UserName')).toBeVisible();
    await expect(page.getByText('Password')).toBeVisible();
    
    // Check buttons
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Guest Login' })).toBeVisible();
  });

  test('should login as guest and navigate to main page', async ({ page }) => {
    await page.goto('/');
    
    // Click Guest Login button
    await page.getByRole('button', { name: 'Guest Login' }).click();
    
    // Wait for navigation to complete
    await page.waitForTimeout(1000);
    
    // Verify we're on the main page
    await expect(page.getByRole('heading', { name: 'HowToPark', level: 3 })).toBeVisible();
    
    // Check main page elements
    await expect(page.getByRole('button', { name: /Logout/ })).toBeVisible();
  });

  test('should logout and return to login page', async ({ page }) => {
    await page.goto('/');
    
    // Login as guest
    await page.getByRole('button', { name: 'Guest Login' }).click();
    await page.waitForTimeout(1000);
    
    // Click logout
    await page.getByRole('button', { name: /Logout/ }).click();
    
    // Verify we're back on login page
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Guest Login' })).toBeVisible();
  });
});
