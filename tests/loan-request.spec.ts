import { test, expect } from '@playwright/test';
import { realizarLogin } from '../pages/loginHelper';

test.describe('loan request', () => {

  test.beforeEach(async ({ page }) => {
    await realizarLogin(page);
  });

  test('Validar solicitação de empréstimo', async ({ page }) => {

    await page.click('a[href="requestloan.htm"]');
    await page.waitForSelector('input[id="amount"]', { state: 'visible' });

    await page.fill('input[id="amount"]', '100');
    await page.fill('input[id="downPayment"]', '50');

    await page.click('input[value="Apply Now"]');

    await expect(page.locator('#loanStatus')).toHaveText('Approved', { timeout: 10000 });
  });

  test('Validar erro na solicitação de empréstimo', async ({ page }) => {
    // Step 1: Ir em Request Loan com campos vazios
    await page.click('a[href="requestloan.htm"]');
    await page.waitForSelector('input[id="amount"]', { state: 'visible' });

    await page.click('input[value="Apply Now"]');

    await expect(page.locator('text=An internal error has occurred and has been logged.')).toBeVisible({ timeout: 10000 });
  });

  test('Validar solicitação de valor excessivo', async ({ page }) => {

    await page.click('a[href="requestloan.htm"]');
    await page.waitForSelector('input[id="amount"]', { state: 'visible' });
    await page.fill('input[id="amount"]', '999999999');
    await page.fill('input[id="downPayment"]', '100');
    await page.click('input[value="Apply Now"]');

    await expect(page.locator('#loanStatus')).toHaveText('Denied', { timeout: 10000 });
  });

  test('Validar cancelamento da solicitação de empréstimo antes da confirmação', async ({ page }) => {

    await page.click('a[href="requestloan.htm"]');
    await page.waitForSelector('input[id="amount"]', { state: 'visible' });
    await page.fill('input[id="amount"]', '100');
    await page.fill('input[id="downPayment"]', '50');

    await page.click('a[href="overview.htm"]');

    await expect(page).toHaveURL(/overview\.htm/);
  });

  test('Validar limite mínimo para solicitação de empréstimo', async ({ page }) => {

    await page.click('a[href="requestloan.htm"]');
    await page.waitForSelector('input[id="amount"]', { state: 'visible' });

    await page.fill('input[id="amount"]', '0');
    await page.fill('input[id="downPayment"]', '0');

    await page.click('input[value="Apply Now"]');

    await expect(page.locator('text=An internal error has occurred and has been logged.')).toBeVisible({ timeout: 10000 });
  });

});

test.describe('loan request - sem login', () => {

  test('Validar bloqueio de solicitação sem login no sistema', async ({ page }) => {
    
    await page.goto('https://parabank.parasoft.com/parabank/requestloan.htm');

    await expect(page.locator('text=Customer Login')).toBeVisible();
  });

});
