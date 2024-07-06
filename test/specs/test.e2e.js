const { expect } = require('@wdio/globals')
const confirmationpage = require('../pageobjects/Confirmation.page')
const PreRetirementCalc = require('../pageobjects/preRetirement.page')
const testData = require('../testdata.json'); // Import the JSON file


const SecurePage = require('../pageobjects/Confirmation.page')

describe('Pre-Retirement Calculator', () => {
    it('should calculate the result', async () => {
        await PreRetirementCalc.open()

        //await PreRetirementCalc.inputData('40','68','100000','75000','500000','10','0.25','4000','500','20','75','8','5')

        await PreRetirementCalc.preRetirementCalc_fillups(testData);
        await expect(PreRetirementCalc.confirmationText).toBeExisting()
        await expect(confirmationpage.confirmationText).toHaveTextContaining(
            'Congratulations! You are exceeding your retirement goals')
    })
})

