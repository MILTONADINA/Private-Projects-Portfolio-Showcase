/**
 * Playwright E2E — axe-core accessibility audit
 *
 * Sanitized excerpt from a private project (SchoolGrid Pro).
 *
 * Runs axe-core against the rendered DOM in a real browser, asserting zero
 * WCAG 2 (A + AA + AAA where applicable) and WCAG 2.1 (A + AA) violations.
 * Includes color-contrast (which static analyzers cannot verify because
 * contrast depends on the computed CSS at render time).
 *
 * Why this matters: accessibility is procurement-required for many
 * public-sector and education buyers in target markets. Gating in CI on
 * every PR means the bar cannot silently slip across refactors.
 *
 * Both light and dark themes are audited because the contrast surface is
 * different between them — a dark-theme refactor can pass the light-theme
 * test and still fail dark-theme contrast at runtime.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('dashboard — dark theme — no WCAG 2 A/AA or 2.1 A/AA violations', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'schoolgrid-theme',
        JSON.stringify({ theme: 'dark' }),
      );
    });
    await page.goto('/');
    await expect(page.locator('.ph-title').filter({ hasText: 'Dashboard' }))
      .toBeVisible({ timeout: 10000 });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('structure page — no violations (full WCAG 2 + 2.1 including AAA)', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'schoolgrid-theme',
        JSON.stringify({ theme: 'dark' }),
      );
    });
    await page.goto('/');
    await page.getByRole('button', { name: /Setup Structure/i }).click();
    await expect(page.getByRole('button', { name: /Add Level/i }))
      .toBeVisible({ timeout: 5000 });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('dashboard — light theme — no violations', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'schoolgrid-theme',
        JSON.stringify({ theme: 'light' }),
      );
    });
    await page.goto('/');
    await expect(page.locator('.ph-title').filter({ hasText: 'Dashboard' }))
      .toBeVisible({ timeout: 10000 });
    await expect(page.locator('html')).toHaveClass(/theme-light/);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
