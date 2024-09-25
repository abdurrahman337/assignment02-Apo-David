import { test, expect } from '@playwright/test';
const BASE_URL = 'http://localhost:3000';

test.describe('Test suite', () => {

  test('Test case LogIn', async ({ request }) => {
    const getPostsResponse = await request.get('http://localhost:3000/');
    expect(getPostsResponse.ok()).toBeTruthy();
    expect(getPostsResponse.status()).toBe(200);
  });

  /*
  test('test case 2 ', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.locator('input[type="text"]').fill('tester01');
    await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
    await page.getByRole('button', { name: 'Login' }).click();

  });*/
});

