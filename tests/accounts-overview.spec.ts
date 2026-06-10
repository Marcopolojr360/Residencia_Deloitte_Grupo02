import { test, expect } from '@playwright/test';
import { realizarLogin } from '../pages/loginHelper';

test.describe('Accounts Overview', () => {

  test.beforeEach(async ({ page }) => {
    await realizarLogin(page); 
  });
  
  test('Validar carregamento da lista de contas', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm'); 
    const accountTable = page.locator('#accountTable');
    await expect(accountTable).toBeVisible();
  });

  test('Validar soma do saldo total', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    await page.waitForSelector('#accountTable', { state: 'visible' });
    const rows = page.locator('#accountTable tbody tr:not(:last-child)');
    const count = await rows.count();

    let soma = 0;
    for (let i = 0; i < count; i++) {
      const texto = await rows.nth(i).locator('td:nth-child(2)').innerText();
      const valor = parseFloat(texto.replace(/[$,]/g, ''));
      if (!isNaN(valor)) soma += valor;
    }
    const totalTexto = await page
      .locator('#accountTable tbody tr:last-child td:nth-child(2) b')
      .innerText();

    const total = parseFloat(totalTexto.replace(/[$,]/g, ''));
    
    console.log('Soma calculada:', soma, '| Total na página:', total);
    expect(soma).toBeCloseTo(total, 2);
  });

  test('Validar acesso restrito (IDOR) ', async ({ page }) => {
    
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm?id=outro_usuario_id');
    await expect(page.locator('.error')).toBeVisible();
  });

  
  test('Listagem inicial de transações', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/findtrans.htm');
    await page.waitForSelector('#accountId', { state: 'visible' });
    await page.click('#findById');
    const transactionTable = page.locator('#transactionTable');
    await expect(transactionTable).toBeVisible();
  });

  test('Busca por data específica', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/findtrans.htm');
    await page.waitForSelector('#accountId', { state: 'visible' });
    const inputData = page.locator('#transactionDate');
    await inputData.waitFor({ state: 'visible', timeout: 5000 });
    await inputData.fill('05-26-2026');
    const valor = await inputData.inputValue();
    await inputData.dispatchEvent('change');
    await page.waitForTimeout(500);
    await page.click('#findByDate');
    await expect(
      page.locator('.title').getByText('Transaction Results')
    ).toBeVisible({ timeout: 10000 });
  });

});