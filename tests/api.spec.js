const {test, expect} = require('@playwright/test');
import post_signup from '../src/data/product.js';
test.describe('API Tests', () => {
  test('GET /entries return product entries', async ({ request }) => {
    const startTime = Date.now();

    const response = await request.get('https://api.demoblaze.com/entries', { ignoreHTTPSErrors: true });
    const responseTime = Date.now() - startTime;
    expect(response.ok()).toBeTruthy();
    expect(responseTime).toBeLessThan(3000);

    const body = await response.json();

    expect(body).toHaveProperty('Items')
    expect(Array.isArray(body.Items)).toBe(true);
    expect(responseTime).toBeGreaterThan(0);

    //schema validation
    const fisrtItem = body.Items[0];
    expect(fisrtItem).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            price: expect.any(Number),
            cat: expect.any(String)
        })
    );
});
  
  test('POST /entries return product entries', async ({ request }) => {
    const username = `qa_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    console.log(`Creating user with Username: ${username}`);
    const response = await request.post('https://api.demoblaze.com/signup', {ignoreHTTPSErrors: true,
        data: {
            post_signup
        },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.text();
    expect(responseBody.length).toBeGreaterThanOrEqual(0);

  });

});