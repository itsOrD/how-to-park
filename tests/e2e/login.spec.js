const { test, expect } = require('@playwright/test');

test.describe('Login Flow', () => {
  test('should display login page with all required elements', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle('HowToPark');
    
    // Check login heading
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    
    // Check form elements by text content (more reliable)
    await expect(page.getByText('UserName')).toBeVisible();
    await expect(page.getByText('Password')).toBeVisible();
    
    // Check buttons
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Guest Login' })).toBeVisible();
  });

  test('should successfully navigate to main page after guest login', async ({ page }) => {
    await page.goto('/');
    
    // Click Guest Login button
    await page.getByRole('button', { name: 'Guest Login' }).click();
    
    // Wait for navigation by checking for main page elements
    await expect(page.getByRole('heading', { name: 'HowToPark', level: 3 })).toBeVisible({ timeout: 10000 });
    
    // Verify we're on the main page by checking for key elements
    await expect(page.getByTestId('main-page')).toBeVisible();
    await expect(page.getByTestId('logout-button')).toBeVisible();
  });

  test('should logout and return to login page', async ({ page }) => {
    await page.goto('/');
    
    // Login as guest
    await page.getByRole('button', { name: 'Guest Login' }).click();
    await expect(page.getByTestId('main-page')).toBeVisible({ timeout: 10000 });
    
    // Click logout
    await page.getByTestId('logout-button').click();
    
    // Verify we're back on login page
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: 'Guest Login' })).toBeVisible();
  });
});
