import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  const title = page.locator('#title');
  await expect(title).toHaveText('todos');
});
