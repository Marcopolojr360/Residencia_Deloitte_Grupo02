import { test, expect } from '@playwright/test';
import { realizarLogin } from '../pages/loginHelper';

test.use({ launchOptions: { slowMo: 1000 } });

test.describe('transfer funds', () => { 

  test.beforeEach(async ({ page }) => {
    
    test.setTimeout(90000);
    await realizarLogin(page); 
  });

  test('Transferência entre contas', async ({ page }) => {
    await page.getByRole('link', { name: 'Transfer Funds', exact: true }).click();
    await expect(page).toHaveURL(/.*transfer/); 

    const valorTransferencia = '100.00';
    await page.locator('#amount').fill(valorTransferencia);

    await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
    await page.locator('#fromAccountId').selectOption({ index: 0 });
    
    await page.locator('#toAccountId option').first().waitFor({ state: 'attached' });

    const totalContasTeste1 = await page.locator('#toAccountId option').count();
    if (totalContasTeste1 > 1) {
      await page.locator('#toAccountId').selectOption({ index: 1 });
    } else {
      await page.locator('#toAccountId').selectOption({ index: 0 });
    }

    await page.getByRole('button', { name: 'Transfer' }).click();

    await expect(page.getByText('Transfer Complete!')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(`$${valorTransferencia} has been transferred`)).toBeVisible();
  });

  test('Validar transferência com saldo insuficiente', async ({ page }) => {
    await page.getByRole('link', { name: 'Transfer Funds', exact: true }).click();
    await expect(page).toHaveURL(/.*transfer/); 

    const valorAbusivo = '999999.00';
    await page.locator('#amount').fill(valorAbusivo);

    await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
    await page.locator('#fromAccountId').selectOption({ index: 0 });

    await page.locator('#toAccountId option').first().waitFor({ state: 'attached' });

    const totalContasTeste2 = await page.locator('#toAccountId option').count();
    if (totalContasTeste2 > 1) {
      await page.locator('#toAccountId').selectOption({ index: 1 });
    } else {
      await page.locator('#toAccountId').selectOption({ index: 0 });
    }

    await page.getByRole('button', { name: 'Transfer' }).click();

    await expect(page.getByText('Transfer Complete!')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(`$${valorAbusivo} has been transferred`)).toBeVisible();
  });

  test('Validar exibição de contas para transferência', async ({ page }) => {
 
    await page.getByRole('link', { name: 'Transfer Funds', exact: true }).click();
    await expect(page).toHaveURL(/.*transfer/); 

    await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
    const contasOrigem = await page.locator('#fromAccountId option').allTextContents();

    await page.locator('#toAccountId option').first().waitFor({ state: 'attached' });
    const contasDestino = await page.locator('#toAccountId option').allTextContents();

    expect(contasOrigem.length).toBeGreaterThan(0);
    expect(contasDestino.length).toBeGreaterThan(0);

    expect(contasOrigem).toEqual(contasDestino);
  });

  test('Validar atualização de saldo após transferência', async ({ page }) => {
    await expect(page).toHaveURL(/.*overview/);

    const saldoInicialOrigemTexto = await page.locator('#accountTable tbody tr').first().locator('td').nth(1).textContent();
    const saldoInicialOrigem = parseFloat(saldoInicialOrigemTexto!.replace(/[^0-9.-]/g, ''));

    await page.getByRole('link', { name: 'Transfer Funds', exact: true }).click();
    await expect(page).toHaveURL(/.*transfer/); 

    const valorTransferencia = 50.00;
    await page.locator('#amount').fill(valorTransferencia.toFixed(2));

    await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
    await page.locator('#fromAccountId').selectOption({ index: 0 }); 
    
    await page.locator('#toAccountId option').first().waitFor({ state: 'attached' });
    const totalContas = await page.locator('#toAccountId option').count();
    if (totalContas > 1) {
      await page.locator('#toAccountId').selectOption({ index: 1 }); 
    } else {
      await page.locator('#toAccountId').selectOption({ index: 0 });
    }

    await page.getByRole('button', { name: 'Transfer' }).click();
    await expect(page.getByText('Transfer Complete!').first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('link', { name: 'Accounts Overview', exact: true }).click();
    await expect(page).toHaveURL(/.*overview/);

    const saldoFinalOrigemTexto = await page.locator('#accountTable tbody tr').first().locator('td').nth(1).textContent();
    const saldoFinalOrigem = parseFloat(saldoFinalOrigemTexto!.replace(/[^0-9.-]/g, ''));

    const saldoEsperado = saldoInicialOrigem - valorTransferencia;
    expect(saldoFinalOrigem).toBe(saldoEsperado);
  });

  test('Validar transferência com valor zero ou negativo', async ({ page }) => {
    await expect(page).toHaveURL(/.*overview/);

    const saldoInicialOrigemTexto = await page.locator('#accountTable tbody tr').first().locator('td').nth(1).textContent();
    const saldoInicialOrigem = parseFloat(saldoInicialOrigemTexto!.replace(/[^0-9.-]/g, ''));

    await page.getByRole('link', { name: 'Transfer Funds', exact: true }).click();
    await expect(page).toHaveURL(/.*transfer/); 

    const valorTransferenciaTexto = '0.00'; 
    const valorTransferenciaNum = parseFloat(valorTransferenciaTexto);
    
    await page.locator('#amount').fill(valorTransferenciaTexto);

    await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
    await page.locator('#fromAccountId').selectOption({ index: 0 });
    
    await page.locator('#toAccountId option').first().waitFor({ state: 'attached' });
    const totalContas = await page.locator('#toAccountId option').count();
    if (totalContas > 1) {
      await page.locator('#toAccountId').selectOption({ index: 1 });
    } else {
      await page.locator('#toAccountId').selectOption({ index: 0 });
    }

    await page.getByRole('button', { name: 'Transfer' }).click();
    
    await expect(page.getByText('Transfer Complete!').first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('link', { name: 'Accounts Overview', exact: true }).click();
    await expect(page).toHaveURL(/.*overview/);

    const saldoFinalOrigemTexto = await page.locator('#accountTable tbody tr').first().locator('td').nth(1).textContent();
    const saldoFinalOrigem = parseFloat(saldoFinalOrigemTexto!.replace(/[^0-9.-]/g, ''));

    const saldoEsperado = saldoInicialOrigem - valorTransferenciaNum;
    expect(saldoFinalOrigem).toBe(saldoEsperado);
  });

  test('Validar transferência para a mesma conta Origem = Destino', async ({ page }) => {
    await page.getByRole('link', { name: 'Transfer Funds', exact: true }).click();
    await expect(page).toHaveURL(/.*transfer/); 

    const valorTransferencia = '50.00';
    
    const campoValor = page.locator('#amount');
    
    await campoValor.waitFor({ state: 'visible', timeout: 15000 });
    
    await campoValor.fill(valorTransferencia);

    await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
    await page.locator('#fromAccountId').selectOption({ index: 0 }); 
    
    await page.locator('#toAccountId option').first().waitFor({ state: 'attached' });
    await page.locator('#toAccountId').selectOption({ index: 0 }); 

    await page.getByRole('button', { name: 'Transfer' }).click();

    await expect(page.getByText('Transfer Complete!')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(`$${valorTransferencia} has been transferred`)).toBeVisible();
  });

});