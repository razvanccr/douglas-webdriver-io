import { expect } from "@wdio/globals";

import parfumPage from "../pageobjects/parfum.page.js";
import cookiesPage from "../pageobjects/components/cookies.page.js";
import homepagePage from "../pageobjects/home.page.js";
import { Marke, Productkart, Geschenkfür, FürWen } from "../pageobjects/enum/parfum-filter-options.js";

import allureReporter from "@wdio/allure-reporter";

const saleTestData: Filters[] = [
  {
    Marke: Marke["ANNICK GOUTAL"],
    Productkart: Productkart.EAU_DE_PARFUM,
    FürWen: FürWen.UNISEX
  },
  {
    Marke: Marke["ACCA KAPPA"],
    Productkart: Productkart.EAU_DE_PARFUM,
    FürWen: FürWen.UNISEX
  },
  {
    //will fail since there is no women option
    Marke: Marke["ACCA KAPPA"],
    Productkart: Productkart.EAU_DE_PARFUM,
    FürWen: FürWen.WEIBLICH
  }
];

const newTestData: Filters[] = [
  {
    Productkart: Productkart.DUFTSET,
    FürWen: FürWen.UNISEX
  },
  {
    Productkart: Productkart.DUFTSET,
    FürWen: FürWen.WEIBLICH
  }
];

const limitTestData: Filters[] = [
  {
    Marke: Marke["ABERCROMBIE & FITCH"],
    Productkart: Productkart.EAU_DE_TOILETTE,
    Geschenkfür: Geschenkfür.GEBURTSTAG,
    FürWen: FürWen.MÄNNLICH
  }
];

suite("Test Suite - Appling filters to Parfum", () => {
  setup("Opening the browser and set the cookie to accept", async () => {
    allureReporter.addStep(`Opening the browser at ${process.env.URL!}`);
    await browser.url(process.env.URL!);

    allureReporter.addStep(`Click on accept cookies`);
    await cookiesPage.acceptCookies();

    allureReporter.addStep(`Click on parfum`);
    await homepagePage.clickParfum();
  });

  teardown("Clearing the cookies, localStorage and sessionStorage", async () => {
    allureReporter.addStep(`Clearing the cookies, localStorage and sessionStorage`);

    await browser.deleteAllCookies();
    await browser.execute(() => localStorage.clear());
    await browser.execute(() => sessionStorage.clear());
  });

  for (const filter of saleTestData) {
    test(`Getting Sale entries: ${filter.Marke ?? "-"} | Productkart: ${filter.Productkart ?? "-"} | Geschenkfür:${filter.Geschenkfür ?? "-"} | FürWen:${filter.FürWen ?? "-"}`, async () => {
      allureReporter.addStep(`Using these filters ${filter.Marke ?? "-"} | Productkart: ${filter.Productkart ?? "-"} | Geschenkfür:${filter.Geschenkfür ?? "-"} | FürWen:${filter.FürWen ?? "-"}`);

      await parfumPage.ApplyFilters({
        Marke: filter.Marke,
        Productkart: filter.Productkart,
        Geschenkfür: filter.Geschenkfür,
        FürWen: filter.FürWen
      });

      allureReporter.addStep("Get all entries that have a new/sale eyecatcher");
      const entries = await parfumPage.hasEyeCatcherWithKeyword();

      allureReporter.addStep(`Log the entries ${entries}`);
      console.log(entries);

      entries.forEach(entry => {
        allureReporter.addStep(`For each of the entry check that is that the text SALE ${entry}`);
        expect(entry).toHaveText("SALE");
      });
    });
  }

  for (const filter of newTestData) {
    test(`Getting NEU entries: ${filter.Marke ?? "-"} | Productkart: ${filter.Productkart ?? "-"} | Geschenkfür:${filter.Geschenkfür ?? "-"} | FürWen:${filter.FürWen ?? "-"}`, async () => {
      allureReporter.addStep(`Using these filters ${filter.Marke ?? "-"} | Productkart: ${filter.Productkart ?? "-"} | Geschenkfür:${filter.Geschenkfür ?? "-"} | FürWen:${filter.FürWen ?? "-"}`);

      await parfumPage.ApplyFilters({
        Marke: filter.Marke,
        Productkart: filter.Productkart,
        Geschenkfür: filter.Geschenkfür,
        FürWen: filter.FürWen
      });

      allureReporter.addStep("Get all entries that have a new/sale eyecatcher");
      const entries = await parfumPage.hasEyeCatcherWithKeyword();

      allureReporter.addStep(`Log the entries ${entries}`);
      console.log(entries);

      entries.forEach(entry => {
        allureReporter.addStep(`For each of the entry check that is that the text NEU ${entry}`);
        expect(entry).toHaveText("NEU");
      });
    });
  }

  for (const filter of limitTestData) {
    test(`Getting NEU entries: ${filter.Marke ?? "-"} | Productkart: ${filter.Productkart ?? "-"} | Geschenkfür:${filter.Geschenkfür ?? "-"} | FürWen:${filter.FürWen ?? "-"}`, async () => {
      allureReporter.addStep(`Using these filters ${filter.Marke ?? "-"} | Productkart: ${filter.Productkart ?? "-"} | Geschenkfür:${filter.Geschenkfür ?? "-"} | FürWen:${filter.FürWen ?? "-"}`);

      await parfumPage.ApplyFilters({
        Marke: filter.Marke,
        Productkart: filter.Productkart,
        Geschenkfür: filter.Geschenkfür,
        FürWen: filter.FürWen
      });

      allureReporter.addStep("Get all entries that have a new/sale eyecatcher");
      const entries = await parfumPage.hasEyeCatcherWithKeyword();

      allureReporter.addStep(`Log the entries ${entries}`);
      console.log(entries);

      entries.forEach(entry => {
        // allureReporter.addStep("For each of the entry check that is that the text NEU");
        //expect(entry).toHaveText("NEU");
      });
    });
  }
});
