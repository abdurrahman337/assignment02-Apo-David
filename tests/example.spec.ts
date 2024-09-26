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


  test('Test case 02 - Get all rooms', async ({ request }) => {
    const respRooms = await request.get("http://localhost:3000/api/rooms", {
      headers: {
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue
        })
      },
    });

    console.log(await respRooms.json())
    const rooms = await respRooms.json();
    expect(await respRooms.ok())
    // expect(rooms.length).toBe(2);


  })


  test('Test case 03 - Create Room', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/room/new`, {
      headers: {
        'X-user-auth': JSON.stringify({
          username: 'tester01',
          token: tokenValue
        }),
        'Content-Type': 'application/json'
      },
      data: {
        features: ['balcony'],
        category: 'double',
        number: '2',
        floor: '2',
        available: true,
        price: 2525
      }
    });


  });



  test('Test case 04 - Get all clients', async ({ request }) => {
    const respRooms = await request.get("http://localhost:3000/api/clients", {
      headers: {
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue
        })
      },
    });


    console.log(await respRooms.json())
    const rooms = await respRooms.json();
    expect(await respRooms.ok())
    // expect(rooms.length).toBe(2);


  })
  test('Test case 01 - Create Client', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/client/new`, {
      headers: {
        'X-user-auth': JSON.stringify({
          username: 'tester01',
          token: tokenValue
        }),
        'Content-Type': 'application/json'
      },
      data:
      {
        "name": "David Svessson",
        "email": "david.svensson@hotmail.se",
        "telephone": "0202525052"
      }
    });

  });







});













