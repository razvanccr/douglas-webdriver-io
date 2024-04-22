import { $ } from '@wdio/globals'

class HomePage  {
  
    public get linkParfum () {
        return $('//span[@data-testid="header-component-item--navigation"]//a[contains(@href,"parfum")]');
    }

    public async clickParfum () {
       
        await this.linkParfum.waitForClickable();
        await this.linkParfum.click();
    }

    
}

export default new HomePage();
