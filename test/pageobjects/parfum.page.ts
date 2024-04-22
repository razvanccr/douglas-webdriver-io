import { $ } from "@wdio/globals";
import allureReporter from "@wdio/allure-reporter";

class Parfum {
  //Produktart
  public get btnProductkart() {
    return $('div[data-testid="classificationClassName"]');
  }
  public get inputProductkart() {
    return $('//div[@data-testid="classificationClassName"]/parent::*//input');
  }

  //Marke
  public get btnMarke() {
    return $('div[data-testid="brand"]');
  }
  public get inputMarke() {
    return $('//div[@data-testid="brand"]/parent::*//input');
  }

  //Für Wen
  public get btnFürWen() {
    return $('div[data-testid="gender"]');
  }
  public get inputFürWe() {
    return $('//div[@data-testid="gender"]/parent::*//input');
  }

  //Duftnote
  public get btnDuftnote() {
    return $('div[data-testid="Duftnote neu"]');
  }
  public get inputDuftnote() {
    return $('//div[@data-testid="Duftnote neu"]/parent::*//input');
  }

  //Produktmerkmal
  public get produktMermal() {
    return $('div[data-testid="Produktauszeichnung"]');
  }

  public get inputProduktMermal() {
    return $('//div[@data-testid="Produktauszeichnung"]/parent::*//input');
  }

  //Anwendungsbereich
  public get btnAnwendungsbereich() {
    return $('div[data-testid="Anwendungsbereich"]');
  }
  public get inputAnwendungsbereich() {
    return $('//div[@data-testid="Anwendungsbereich"]/parent::*//input');
  }

  //Highlights
  public get btnHightlights() {
    return $('div[data-testid="flags"]');
  }

  //Geschenk für
  public get btnGeschenkFur() {
    return $('div[data-testid="Geschenk für"]');
  }

  public get inputGeschenkFur() {
    return $('//div[@data-testid="Geschenk für"]/parent::*//input');
  }
  //Mehr Filter anzeigen
  public get btnMehrFilteranzeigen() {
    return $("button[button button__with-icon--transparent facet-list__show-more]");
  }

  public returnCheckboxBasedOnText(dropdownText: string) {
    return $(`//div[text()="${dropdownText}"]//parent::div/parent::a[@role="checkbox"]`);
  }

  public get closeFilterDropdown() {
    return $(".button.button__primary.facet__close-button");
  }

  //product tiles
  public get productTiles() {
    return $$('div[data-testid="product-tile"]');
  }

  //appears for new and on sale
  public get productEyeCatcher(): string {
    return 'div[data-testid="eyecatcher__container"]';
  }

  async ApplyFilters(filters: { Marke?: string; Productkart?: string; Geschenkfür?: string; FürWen?: string }): Promise<void> {
    for (const [filterName, filterValue] of Object.entries(filters)) {

      allureReporter.addStep(`Attempting to: move / click / set value for ${filterName} ${filterValue}`);
      
      if (!filterValue) continue; // Skip if filter value is falsy
      switch (filterName) {
        case "Marke":
          await this.btnMarke.moveTo();
          await this.btnMarke.click();
          await this.inputMarke.waitForClickable();
          await this.inputMarke.setValue(filterValue);

          break;
        case "Productkart":
          await this.btnMarke.moveTo();
          await this.btnProductkart.click();
          await this.inputProductkart.waitForClickable();
          await this.inputProductkart.setValue(filterValue);

          break;
        case "Geschenkfür":
          await this.btnMarke.moveTo();
          await this.btnGeschenkFur.click();
          await this.inputGeschenkFur.waitForClickable();
          await this.inputGeschenkFur.setValue(filterValue);

          break;
        case "FürWen":
          await this.btnMarke.moveTo();
          await this.btnFürWen.click();
          // await this.inputFürWe.waitForClickable(); //doesnt have an input
          // await this.inputFürWe.setValue(filterValue);
          break;
      }
      await this.returnCheckboxBasedOnText(filterValue).waitForClickable();
      await this.returnCheckboxBasedOnText(filterValue).click();
      await this.closeFilterDropdown.waitForClickable();
      await this.closeFilterDropdown.click();
    }
  }

  async hasEyeCatcherWithKeyword(): Promise<string[]> {
    let array: string[] = [];

    for (const tile of await this.productTiles) {
      const eyecatcherContainers = await tile.$$(this.productEyeCatcher);

      if (eyecatcherContainers.length > 0) {
        array.push(await tile.getText());
      }
    }
    return array;
  }
}

export default new Parfum();
