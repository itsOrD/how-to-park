const { test, expect } = require('@playwright/test');

test.describe('Main Page Features', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to app and login
    await page.goto('/');
    await page.getByRole('button', { name: 'Guest Login' }).click();
    // Wait for main page to load
    await expect(page.getByTestId('main-page')).toBeVisible({ timeout: 10000 });
  });

  test('should display header with title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'HowToPark', level: 3 })).toBeVisible();
  });

  test('should display map section with controls', async ({ page }) => {
    // Check for map section
    await expect(page.getByTestId('map-section')).toBeVisible();
    
    // Check for Leaflet map controls
    await expect(page.getByRole('button', { name: 'Zoom in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Zoom out' })).toBeVisible();
    
    // Check for Leaflet attribution (proving map is loaded)
    await expect(page.getByRole('link', { name: 'Leaflet' })).toBeVisible();
  });

  test('should display parking spot form with all required fields', async ({ page }) => {
    // Check form section exists
    await expect(page.getByTestId('form-section')).toBeVisible();
    
    // Check form fields
    await expect(page.getByText('Car Size')).toBeVisible();
    await expect(page.getByText('Make/Model (optional)')).toBeVisible();
    await expect(page.getByText('Driver?')).toBeVisible();
    
    // Check time of day options
    await expect(page.getByText('morning')).toBeVisible();
    await expect(page.getByText('mid-day')).toBeVisible();
    await expect(page.getByText('evening')).toBeVisible();
    await expect(page.getByText('night')).toBeVisible();
    
    // Check difficulty slider
    await expect(page.getByText('Difficulty level (low to high)')).toBeVisible();
    
    // Check comments field
    await expect(page.getByText('Comments')).toBeVisible();
    
    // Check form buttons
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
  });

  test('should have working map zoom controls', async ({ page }) => {
    const zoomInButton = page.getByRole('button', { name: 'Zoom in' });
    const zoomOutButton = page.getByRole('button', { name: 'Zoom out' });
    
    // Verify buttons are clickable
    await expect(zoomInButton).toBeEnabled();
    await expect(zoomOutButton).toBeEnabled();
    
    // Click zoom controls
    await zoomInButton.click();
    await page.waitForTimeout(500);
    await zoomOutButton.click();
    await page.waitForTimeout(500);
    
    // Buttons should still be visible and enabled after clicks
    await expect(zoomInButton).toBeVisible();
    await expect(zoomOutButton).toBeVisible();
  });

  test('should allow form interactions', async ({ page }) => {
    // Check Driver checkbox
    const driverCheckbox = page.getByRole('checkbox', { name: 'Driver?' });
    await driverCheckbox.check();
    await expect(driverCheckbox).toBeChecked();
    
    // Select time of day
    const morningRadio = page.getByRole('radio', { name: 'morning' });
    await morningRadio.check();
    await expect(morningRadio).toBeChecked();
    
    // Verify form section is still visible
    await expect(page.getByTestId('form-section')).toBeVisible();
  });

  test('should have functional logout button that returns to login', async ({ page }) => {
    const logoutButton = page.getByTestId('logout-button');
    
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toBeEnabled();
    
    // Click logout
    await logoutButton.click();
    
    // Should return to login page
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible({ timeout: 5000 });
    
    // Login page elements should be present
    await expect(page.getByRole('button', { name: 'Guest Login' })).toBeVisible();
  });
});
