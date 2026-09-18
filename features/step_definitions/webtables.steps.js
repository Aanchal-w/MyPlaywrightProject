const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const normalizeField = (field) => field.trim().toLowerCase().replace(/\s+/g, '');

Given('the user is on the Web Tables page', async function () {
  await this.webTablesPage.open();
  await expect(this.page.getByRole('heading', { name: 'Web Tables' })).toBeVisible();
});

When('the user clicks the Add button', async function () {
  await this.webTablesPage.clickAddButton();
  await expect(this.page.locator('#firstName')).toBeVisible();
});

When('the user fills the registration form with:', async function (dataTable) {
  const formData = {};

  for (const [field, value] of dataTable.rawTable) {
    formData[normalizeField(field)] = value;
  }

  await this.webTablesPage.fillRegistrationForm({
    firstName: formData.firstname,
    lastName: formData.lastname,
    age: Number(formData.age),
    email: formData.email,
    salary: Number(formData.salary),
    department: formData.department,
  });
});

When('the user submits the registration form', async function () {
  await this.webTablesPage.submitRegistrationForm();
});

Then('the new record should be visible in the table', async function () {
  const row = this.page.getByRole('row').filter({ hasText: 'Emma' }).first();
  await expect(row).toContainText('Emma');
  await expect(row).toContainText('Stone');
});

When('the user searches for {string}', async function (value) {
  await this.webTablesPage.search(value);
});

Then('only Emma\'s row should be visible', async function () {
  const rows = await this.page.locator('div[role="row"]').allTextContents();
  const emmaRows = rows.filter((text) => /Emma/i.test(text));
  const excludedRows = rows.filter((text) => /Cierra|Alden|Kierra/i.test(text));

  expect(emmaRows.length).toBe(1);
  expect(excludedRows.length).toBe(0);
});

When('the user clears the search', async function () {
  await this.webTablesPage.clearSearch();
});

Then('all records should be visible', async function () {
  const rows = await this.page.locator('div[role="row"]').allTextContents();
  const dataRows = rows.filter((text) => !text.includes('First Name'));

  expect(dataRows.length).toBe(4);
  expect(dataRows.some((text) => /Emma/i.test(text))).toBeTruthy();
});

When('the user clicks the Edit icon for {string}', async function (name) {
  await this.webTablesPage.clickEditIconFor(name);
  await expect(this.page.locator('#salary')).toBeVisible();
});

When('the user changes the salary to {int}', async function (salary) {
  await this.webTablesPage.updateSalary(salary);
});

When('the user submits the edited form', async function () {
  await this.webTablesPage.submitEditForm();
});

Then('the salary for {string} should be updated to {int}', async function (name, salary) {
  const row = this.page.getByRole('row').filter({ hasText: name }).first();
  await expect(row).toContainText(String(salary));
});

Then('Kierra\'s row should be visible', async function () {
  const rows = await this.page.locator('div[role="row"]').allTextContents();
  const kierraRows = rows.filter((text) => /Kierra/i.test(text));

  expect(kierraRows.length).toBeGreaterThan(0);
});

When('the user deletes the row for {string}', async function (name) {
  await this.webTablesPage.deleteRow(name);
});

Then('the row for {string} should not exist', async function (name) {
  await expect(this.page.getByRole('row').filter({ hasText: name })).toHaveCount(0);
});

When('the user changes rows per page to {int} if available', async function (rows) {
  await this.webTablesPage.changeRowsPerPageIfAvailable(rows);
});

Then('the table should update the visible row count', async function () {
  const rows = await this.page.getByRole('row').count();
  expect(rows).toBeGreaterThanOrEqual(3);
});

When('the user clicks the Age header', async function () {
  await this.webTablesPage.clickAgeHeader();
});

Then('the table should be sorted by age ascending', async function () {
  const ages = await this.webTablesPage.getAgeSequence();
  expect(ages).toEqual([...ages].sort((a, b) => a - b));
});

When('the user clicks the Age header again', async function () {
  await this.webTablesPage.clickAgeHeader();
});

Then('the table should be sorted by age descending', async function () {
  const ages = await this.webTablesPage.getAgeSequence();
  expect(ages).toEqual([...ages].sort((a, b) => b - a));
});
