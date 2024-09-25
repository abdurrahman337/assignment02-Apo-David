import { test, expect } from '@playwright/test';
const BASE_URL = 'http://localhost:3000';

test.describe('Test suite', () => {

  let tokenValue;
  test.beforeAll('Test case LogInGetToken', async ({ request }) => {
    const respToken = await request.post("http://localhost:3000/api/login", {
      data: {
        username: "tester01",
        password: "GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
      }
    })

    tokenValue = (await respToken.json()).token;

  });

  test('Test case 01 - Get all rooms', async ({ request }) => {
    const respRooms = await request.get("http://localhost:3000/api/rooms", {
      headers: {
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue
        })
      },
    });

    console.log(await respRooms.json())
    expect(await respRooms.ok())

  })




});




/*
  test('Test case LogIn', async ({ request }) => {
    const getPostsResponse = await request.get('http://localhost:3000/');
    await page.locator('input[type="text"]').fill('tester01');
    await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
    expect(getPostsResponse.ok()).toBeTruthy();
    expect(getPostsResponse.status()).toBe(200);
  });*/

/*
POST http://localhost:3000/api/login
http://localhost:3000/login
test('test case 2 ', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('input[type="text"]').fill('tester01');
  await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
  await page.getByRole('button', { name: 'Login' }).click();

});*/

