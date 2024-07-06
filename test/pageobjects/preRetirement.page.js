const { $ } = require('@wdio/globals')
const Page_Calc = require('./page_calc');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const testData = require('../testdata.json'); // Import the JSON file


/**
 * sub page containing specific selectors and methods for a specific page
 */
class PreRetirementCalc extends Page_Calc{
    /**
     * define selectors using getter methods
     */
    get currentAge () {
        return $('#current-age');
    }

    get retirementAge () {
        return $('#retirement-age');
    }

    get currentIncome () {
        return $('input[id="current-income"]');
    }
    get spouseIncome () {
        return $('#spouse-income');
    }
    get currentTotalSaving () {
        return $('#current-total-savings');
    } get currentAnnualSaving () {
        return $('#current-annual-savings');
    }
    get savingIncreaseRate () {
        return $('#savings-increase-rate');
    }
    get socialSecurityBenefit_Btn () {
        return $('label[for="yes-social-benefits"]');
    }
    get martialStatusBtn () {
        return $('label[for="married"]');
    }
    get socialSecurityOverrideAmnt () {
        return $('#social-security-override');
    }
    get adjustDefaultValues () {
        return $('//a[text()="Adjust default values"]');
    }
    get additionalIncome () {
        return $('#additional-income');
    }
    get retirementDuration () {
        return $('#retirement-duration');
    }
    get includeInflation () {
        return $('//label[@for="include-inflation"]');
    }
    get retirementAnnualIncome () {
        return $('#retirement-annual-income');
    }
    get preRetirementROI () {
        return $('#pre-retirement-roi');
    }
    get postRetirementROI () {
        return $('#post-retirement-roi');
    }

    get saveChanges(){
        return $('//button[text()="Save changes"]');
    }

    get calculateBtn () {
        return $('//button[text()="Calculate"]');
    }

    get confirmationText(){
        return $("#result-message");
    }

    open () {
        return super.open('insights-tools/retirement-calculator.html');
    }


async preRetirementCalc_fillups (testData) {
    const {
        currentAge,
        retirementAge,
        currentIncome,
        spouseIncome,
        currentTotalSaving,
        currentAnnualSaving,
        savingIncreaseRate,
        socialSecurityOverrideAmnt,
        additionalIncome,
        retirementDuration,
        retirementAnnualIncome,
        preRetirementROI,
        postRetirementROI
    } = testData;


    await this.fieldValues(this.currentAge, currentAge);
    await this.fieldValues(this.retirementAge, retirementAge);
    await this.Click(this.currentIncome, 3, 1000);
    await this.fieldValues(this.currentIncome, currentIncome);  
    await this.Click(this.spouseIncome, 3, 1000);
    await this.fieldValues(this.spouseIncome, spouseIncome);
    await this.Click(this.currentTotalSaving, 3, 1000);
    await this.fieldValues(this.currentTotalSaving, currentTotalSaving);
    await this.fieldValues(this.currentAnnualSaving, currentAnnualSaving);
    await this.fieldValues(this.savingIncreaseRate, savingIncreaseRate);
    await this.Click(this.socialSecurityBenefit_Btn, 3, 1000);
    await this.Click(this.martialStatusBtn, 3, 1000);
    await this.Click(this.socialSecurityOverrideAmnt, 3, 1000);
    await this.fieldValues(this.socialSecurityOverrideAmnt, socialSecurityOverrideAmnt);
    await this.Click(this.adjustDefaultValues, 3, 1000);
    await this.Click(this.additionalIncome, 3, 1000);
    await this.fieldValues(this.additionalIncome, additionalIncome);
    await this.fieldValues(this.retirementDuration, retirementDuration);
    await this.Click(this.includeInflation, 3, 1000);
    await this.fieldValues(this.retirementAnnualIncome, retirementAnnualIncome);
    await this.fieldValues(this.preRetirementROI, preRetirementROI);
    await this.fieldValues(this.postRetirementROI, postRetirementROI);
    await this.Click(this.saveChanges, 3, 1000);
    await this.calculateBtn.waitForDisplayed({ timeout: 5000 });
    await this.Click(this.calculateBtn, 3, 2000);
}

async fieldValues(selector, value) {
    
    try {
        await selector.setValue(value.toString()); // Ensure value is treated as string
    } catch (error) {
        console.error(`Failed to set value in element with selector: ${selector}`);
        console.error(error); // Log the error details
        throw error; // Rethrow error for test framework to handle
    }
}

async Click(selector, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            await selector.click();
            return; // Exit function if click succeeds
        } catch (error) {
            if (i < retries - 1) {
                await browser.pause(delay); // Wait before retrying
            } else {
                throw error; // Rethrow error after retries
            }
        }
    }
}

}
module.exports = new PreRetirementCalc();
