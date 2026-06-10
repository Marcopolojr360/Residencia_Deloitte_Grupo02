import { test, expect } from '@playwright/test';
import { realizarLogin } from '../pages/loginHelper';


test.use({ launchOptions: { slowMo: 1000 } });

test.describe('open new account', () => {

  test.beforeEach(async ({ page }) => {
   
    test.setTimeout(90000);
    await realizarLogin(page);
  });

  test('Abertura de conta CORRENTE', async ({ page }) => {
   
    await page.click('a[href="openaccount.htm"]');
    await page.waitForSelector('select[id="type"]', { state: 'visible' });

    await page.selectOption('select[id="type"]', 'CHECKING');

    
    await page.click('input[value="Open New Account"]');

    
    await expect(page.locator('text=Account Opened!')).toBeVisible({ timeout: 10000 });
  });

  test('Abertura de conta POUPANÇA', async ({ page }) => {
    
    await page.click('a[href="openaccount.htm"]');
    await page.waitForSelector('select[id="type"]', { state: 'visible' });
    
    await page.selectOption('select[id="type"]', 'SAVINGS');

    await page.click('input[value="Open New Account"]');

    await expect(page.locator('text=Account Opened!')).toBeVisible({ timeout: 10000 });
  });

  test('Validar erro ao criar conta sem preencher os dados obrigatórios', async ({ page }) => {
    await page.click('a[href="openaccount.htm"]');
    await page.waitForSelector('select[id="type"]', { state: 'visible' });

    await page.$eval('#type', (el) => (el as HTMLSelectElement).value = '');
    await page.$eval('#fromAccountId', (el) => (el as HTMLSelectElement).value = '');

    await page.click('input[value="Open New Account"]');

    const erroServidor = page.getByText('An internal error has occurred and has been logged.');
    await expect(erroServidor).toBeHidden();
    
  });

  test('Validar erro ao tentar criar conta já existente', async ({ page }) => {
   
    await page.click('a[href="openaccount.htm"]');
    await page.waitForSelector('select[id="type"]', { state: 'visible' });
   
    await page.selectOption('select[id="type"]', 'CHECKING');

    await page.click('input[value="Open New Account"]');
    
    await expect(page.locator('text=Account Opened!')).toBeVisible();

    await page.click('a[href="openaccount.htm"]');
    await page.selectOption('select[id="type"]', 'CHECKING');
    await page.click('input[value="Open New Account"]');

    const mensagemErro = page.locator('.error'); 
    await expect(mensagemErro).toContainText(/Account already exists|An internal error has occurred/); 
  });

});