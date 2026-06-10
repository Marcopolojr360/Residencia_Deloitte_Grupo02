export async function realizarLogin(page) {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill('input[name="username"]', 'Raica');
  await page.fill('input[name="password"]', 'Rai1234');
  await page.click('input[value="Log In"]');
  

  await page.waitForSelector('#leftPanel');

}