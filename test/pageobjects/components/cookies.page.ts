import { $ } from "@wdio/globals";

class Cookie {
  get cookieBanner() {
    return $("div.uc-overlay");
  }

  get btnAcceptAll() {
    return $("button.uc-list-button__accept-all");
  }

  get btnDennyAll() {
    return $("button.uc-list-button__deny-all");
  }
  get btnMoreInformation() {
    return $("button.uc-list-button__more-information");
  }

  async acceptCookies() {
    await this.cookieBanner.waitForDisplayed();
    await this.btnAcceptAll.click();
  }
}

export default new Cookie();
