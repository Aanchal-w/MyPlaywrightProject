class WebTablesPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://demoqa.com/webtables');
    await this.page.getByRole('heading', { name: 'Web Tables' }).waitFor({ state: 'visible' });
  }

  async clickAddButton() {
    await this.page.getByRole('button', { name: 'Add' }).click();
  }

  async fillRegistrationForm(formData) {
    await this.page.locator('#firstName').fill(formData.firstName);
    await this.page.locator('#lastName').fill(formData.lastName);
    await this.page.locator('#age').fill(String(formData.age));
    await this.page.locator('#userEmail').fill(formData.email);
    await this.page.locator('#salary').fill(String(formData.salary));
    await this.page.locator('#department').fill(formData.department);
  }

  async submitRegistrationForm() {
    await this.page.locator('#submit').click();
  }

  async search(value) {
    const searchBox = this.page.locator('#searchBox');
    await searchBox.fill(value);
  }

  async clearSearch() {
    const searchBox = this.page.locator('#searchBox');
    await searchBox.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await this.page.waitForTimeout(300);
  }

  async clickEditIconFor(name) {
    const targetRow = this.page.getByRole('row').filter({ hasText: name }).first();
    await targetRow.locator('span[title="Edit"]').click();
  }

  async updateSalary(value) {
    await this.page.locator('#salary').fill(String(value));
  }

  async submitEditForm() {
    await this.page.locator('#submit').click();
  }

  async deleteRow(name) {
    const targetRow = this.page.getByRole('row').filter({ hasText: name }).first();
    await targetRow.locator('span[title="Delete"]').click();
  }

  async changeRowsPerPageIfAvailable(value) {
    const select = this.page.locator('select').first();
    const options = await select.locator('option').evaluateAll((nodes) =>
      nodes.map((node) => ({ label: node.textContent.trim(), value: node.value }))
    );

    const match = options.find((opt) => opt.label.includes(String(value)) || opt.value === String(value));
    if (match) {
      await select.selectOption(match.label);
      return;
    }

    if (options.length > 0) {
      await select.selectOption(options[0].label);
    }
  }

  async clickAgeHeader() {
    await this.page.getByRole('columnheader', { name: 'Age' }).click();
  }

  async getAgeSequence() {
    const rows = await this.page.locator('div[role="row"]').allTextContents();
    return rows
      .filter((text) => !text.includes('First Name'))
      .map((text) => {
        const num = text.match(/\b(\d+)\b/);
        return num ? Number(num[1]) : null;
      })
      .filter((value) => value !== null);
  }
}

module.exports = WebTablesPage;
