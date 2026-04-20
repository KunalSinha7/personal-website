import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    // Start from the index page
    await page.goto('/');

    // Check home page content
    await expect(page.locator('h1')).toContainText('Kunal Sinha');

    // Click on Work Experience
    await page.click('text=Work Experience');

    // The new URL should be "/work"
    await expect(page).toHaveURL('/work');
    await expect(page.locator('h1')).toContainText('Work Experience');

    // Go back to home
    await page.goto('/');

    // Click on Education
    await page.click('text=Education');

    // The new URL should be "/education"
    await expect(page).toHaveURL('/education');
    await expect(page.locator('h1')).toContainText('Education');
  });

  test('should have a working footer with social links', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    const githubLink = page.locator('footer a[aria-label="GitHub"]');
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/KunalSinha7/');
  });
});
