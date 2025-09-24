const {test, expect} = require('@playwright/test');


test('Browser Context Playwright test', async ({browser}) => 
{

    const context = await browser.newContext();
    const page = await context.newPage();

    // page.route('**/*.{jpg, png, jpeg}', route => route.abort());
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const loginBtn = page.locator('#signInBtn');
    const cardTitles =  page.locator(".card-body a");
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    // //css , xpath . type and fill
    await userName.fill("rahulshetty");
    await password.fill("learning")
    await loginBtn.click();

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await loginBtn.click();

    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});
