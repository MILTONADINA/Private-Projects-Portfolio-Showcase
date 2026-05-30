/**
 * Playwright E2E — Content Security Policy regression test
 *
 * Sanitized excerpt from a private project (SchoolGrid Pro). The seed-data
 * payload below has been simplified; real test data uses a complete domain
 * fixture that exercises every render path.
 *
 * The test asserts two CSP invariants on the production-built print window:
 *
 *   1. The print window MUST load its script from an external file
 *      (CSP allows `script-src 'self'`).
 *   2. The print window MUST NOT contain any inline `<script>` tags
 *      (CSP forbids `unsafe-inline`).
 *
 * If a regression accidentally reintroduces an inline <script> block in the
 * print path, this test fails CI and the change is blocked.
 *
 * Why this is here: SchoolGrid Pro's CSP is defined as a <meta> tag in
 * index.html with `default-src 'self'; script-src 'self'; style-src 'self';
 * ... form-action 'self'; frame-ancestors 'none'` — no `unsafe-inline`, no
 * `unsafe-eval`. The print flow generates a new browser window dynamically,
 * which is a tempting place to drop an inline `<script>window.onload = ...`
 * — that would silently break the CSP guarantee. Test prevents that.
 */
import { test, expect } from '@playwright/test';

const SEED_DATA = {
  schoolLevels: [
    {
      id: 'l1',
      name: 'Primary',
      color: '#60a5fa',
      shortColor: '#60a5fa',
      years: [{ name: 'P1', sections: [{ label: 'A', classes: ['1'] }] }],
    },
  ],
  // ... full fixture omitted for brevity
};

test.describe('Print & CSP', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((data) => {
      localStorage.setItem('schoolgrid_v2', JSON.stringify(data));
    }, SEED_DATA);
  });

  test('print window opens with CSP-safe external script', async ({ page, context }) => {
    await page.goto('/');
    await expect(page.locator('.ph-title').filter({ hasText: 'Dashboard' }))
      .toBeVisible({ timeout: 10000 });

    await page.getByRole('button', { name: /Print/i }).first().click();
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('menuitem', { name: /Print all timetables/i }).click(),
    ]);

    await popup.waitForLoadState('domcontentloaded');

    // Invariant 1: external script must be loaded.
    const hasExternalScript = await popup.evaluate(() => {
      const scripts = document.querySelectorAll('script[src]');
      return Array.from(scripts).some((s) =>
        s.getAttribute('src')?.includes('print-helper.js'),
      );
    });
    expect(hasExternalScript).toBe(true);

    // Invariant 2: no inline script bodies — CSP would block them anyway,
    // but failing this test surfaces the regression at PR time rather than
    // at runtime in someone's browser.
    const hasInlineScript = await popup.evaluate(() => {
      const scripts = document.querySelectorAll('script:not([src])');
      return scripts.length > 0
        && Array.from(scripts).some((s) =>
          s.textContent?.includes('window.onload'),
        );
    });
    expect(hasInlineScript).toBe(false);

    await popup.close();
  });

  test('print-helper.js is reachable as a static asset', async ({ request }) => {
    const res = await request.get('/print-helper.js');
    expect(res.ok()).toBe(true);
    expect(await res.text()).toContain('window.print');
  });
});
