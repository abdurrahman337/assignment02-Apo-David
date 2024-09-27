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
    const rooms = await respRooms.json();
    expect(await respRooms.ok())

  })


  test('Test case 02 - Create Room', async ({ request }) => {
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



  test('Test case 03 - Get all clients', async ({ request }) => {
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


  })


  test('Test case 04 - Create Client', async ({ request }) => {
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



  test('Test case 05 - Delete Post by ID', async ({ request }) => {
    // Hämtar alla klienter
    const respClients = await request.get("http://localhost:3000/api/clients", {
      headers: {
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue // Säkerställ att tokenValue är korrekt
        })
      },
    });

    const allClients = await respClients.json();

    const lastButOneClientID = allClients[0].id;
    const deletePostResponse = await request.delete(`http://localhost:3000/api/client/${lastButOneClientID}`, {
      headers: {
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue
        })
      }

    });

    // Kontrollera att DELETE-begäran lyckades
    expect(deletePostResponse.ok()).toBeTruthy();

  });




  test('Test case 06 - Get all bills', async ({ request }) => {
    const respBills = await request.get("http://localhost:3000/api/bills", {
      headers: {
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue
        })
      },
    });

    console.log(await respBills.json())
    const rooms = await respBills.json();
    expect(await respBills.ok())
    // expect(rooms.length).toBe(2);


  })




  test('Test case 07 - Uppdate Bills', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/api/bill/1`, {
      headers: {
        'X-user-auth': JSON.stringify({
          username: 'tester01',
          token: tokenValue
        }),
        'Content-Type': 'application/json'
      },
      data:
      {

        "value": 70000,
        "paid": false

      }
    });

  });


  test('Test case 08 - Get all Reservations', async ({ request }) => {
    const respReservation = await request.get("http://localhost:3000/api/reservations", {
      headers: {
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue
        })
      },
    });

    // Kontrollera att svaret är OK
    expect(respReservation.ok()).toBe(true);

    // Omvandla svaret till JSON
    const reservations = await respReservation.json();

    // Kontrollera att svaret är en icke-tom array
    expect(Array.isArray(reservations)).toBe(true);
    expect(reservations.length).toBeGreaterThan(0);
    const expectedReservation = {
      id: 1,
      created: "2020-01-10T12:00:00.000Z",
      start: "2020-04-01",
      end: "2020-04-04",
      client: 1,
      room: 1,
      bill: 1
    };

    // Verifiera att den första reservationen matchar de förväntade värdena
    const firstReservation = reservations[0];
    expect(firstReservation).toMatchObject(expectedReservation);
  });

  test('Test case  -09 Create Reservation', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/reservation/new`, {
      headers: {
        'X-user-auth': JSON.stringify({
          username: 'tester01',
          token: tokenValue
        }),
        'Content-Type': 'application/json'
      },
      data:

      {
        "start": "3020-08-01",
        "end": "3020-08-08",
        "client": 5,
        "room": 5,
        "bill": 5
      }

    });

  });

  test('Test case 10 - Delete Room Post by ID', async ({ request }) => {
    const respClients = await request.get("http://localhost:3000/api/rooms", {
      headers: {
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue // Säkerställ att tokenValue är korrekt
        })
      },
    });

    const allClients = await respClients.json();

    const lastButOneClientID = allClients[0].id;
    const deletePostResponse = await request.delete(`http://localhost:3000/api/room/${lastButOneClientID}`, {
      headers: {
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue
        })
      }

    });

    // Kontrollera att DELETE-begäran lyckades
    expect(deletePostResponse.ok()).toBeTruthy();

  });




  test('Test case 11 - Uppdate Client', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/api/client/2`, {
      headers: {
        'X-user-auth': JSON.stringify({
          username: 'tester01',
          token: tokenValue
        }),
        'Content-Type': 'application/json'
      },
      data:
      {

        "id": 2,
        "created": "2020-01-06T12:00:00.000Z",
        "name": "Apo Eriksson",
        "email": "mikael.eriksson@example.com",
        "telephone": "070 000 0002"

      }
    });

  });




});













