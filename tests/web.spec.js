import { test, expect } from '@playwright/test';

const homePath = `/GreenhouseInsight/src/homePage.html`

///Navigational Tests
test.describe(' HomePage Navigation Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(homePath);
  });

  //test homepage has a title.
  test('homepage has title', async ({ page }) => {

    // Expect a title.
    await expect(page).toHaveTitle('Greenhouse Insight');
  });

  //about us navigation
  //test navigation from home page to about us page
  test('should navigate from Home to About Us page', async ({ page }) => {
    
    await page.click('#about-us');
    await expect(page).toHaveURL(/aboutUs.html/);

    const header = page.locator('h1');
    await expect(header).toHaveText('About Us');
  });

  //Navigation fron home to gallery page
  test('should navigate from Home to Gallery page', async ({ page }) => {
    
    await page.click('#galley-link');
    await expect(page).toHaveURL(/gallery.html/);

    const header = page.locator('h1');
    await expect(header).toHaveText('Image Gallery');
  });

  //climate learn more btn test
  test('Climate learn more button should navigate to Climate Page', async ({ page }) => {
    
    const cliLearnMoreBtn = page.locator('#climat-learn-moreBtn');
    await expect(cliLearnMoreBtn).toBeVisible();
    await page.click('#climat-learn-moreBtn');
    await expect(page).toHaveURL(/climate.html/);

    const header = page.locator('h1');
    await expect(header).toHaveText('Climate');
  });

  //irrigation learn more btn test
  test('Irrigation learn more button should navigate to Irrigation Page', async ({ page }) => {
    
    const irriLearnMoreBtn = page.locator('#irrigation-learn-moreBtn');
    await expect(irriLearnMoreBtn).toBeVisible();

    await page.click('#irrigation-learn-moreBtn');
    await expect(page).toHaveURL(/irrigation.html/);

    const header = page.locator('h1');
    await expect(header).toHaveText('Irrigation');
  });
  
  //pests & diseases learn more button test
  test('Pests & Diseases learn more button should navigate to Pests Page', async ({ page }) => {
    
    const pestLearnMoreBtn = page.locator('#pests-learn-moreBtn');
     await expect(pestLearnMoreBtn).toBeVisible();

    await page.click('#pests-learn-moreBtn');
    await expect(page).toHaveURL(/pests.html/);

    const header = page.locator('h1');
    await expect(header).toHaveText('Pest & Diseases');
  });

  //nutients learn more button test
  test('Nutrients learn more button should navigate to Nutrients Page', async ({ page }) => {
    
    const nutriLearnMoreBtn = page.locator('#nutrients-learn-moreBtn');
    await expect(nutriLearnMoreBtn).toBeVisible();

    await page.click('#nutrients-learn-moreBtn');
    await expect(page).toHaveURL(/nutrients.html/);

    const header = page.locator('h1');
    await expect(header).toHaveText('Nutrients');
  });

  //yields learn more button test
  test('Yield learn more button should navigate to Yield Forecasting Page', async ({ page }) => {
    
    const yieldLearnMoreBtn = page.locator('#yield-learn-moreBtn');
    await expect(yieldLearnMoreBtn).toBeVisible();

    await page.click('#yield-learn-moreBtn');
    await expect(page).toHaveURL(/yield.html/);

    const yieldHeader = page.locator('h1');
    await expect(yieldHeader).toHaveText('Yield Forecasting');
  });

  //test for the NavBar topic drop down menu
  test.describe('NavBar dropdown menu Tests', () => {

    test('climate dropdown navigation works', async ({ page }) => {
      const navdropdownTopic = page.locator('#topicNavigation');
      await navdropdownTopic.click();
      
      // Select by the ID of the option
      await page.selectOption('select', { index: 1 }); // by index
      const header = page.locator('h1');
      await expect(header).toHaveText('Climate');
    });

    test('Irrigation dropdown navigation works', async ({ page }) => {
      const navdropdownTopic = page.locator('#topicNavigation');
      await navdropdownTopic.click();
      
      // Select by the ID of the option
      await page.selectOption('select', { index: 2 }); // by index
      const header = page.locator('h1');
      await expect(header).toHaveText('Irrigation');
    });

    test('Pest & Diseases dropdown navigation works', async ({ page }) => {
      const navdropdownTopic = page.locator('#topicNavigation');
      await navdropdownTopic.click();
      
      // Select by the ID of the option
      await page.selectOption('select', { index: 3 }); // by index
      const header = page.locator('h1');
      await expect(header).toHaveText('Pest & Diseases');
    });

    test('Nutrients dropdown navigation works', async ({ page }) => {
      const navdropdownTopic = page.locator('#topicNavigation');
      await navdropdownTopic.click();
      
      // Select by the ID of the option
      await page.selectOption('select', { index: 4 }); // by index
      const header = page.locator('h1');
      await expect(header).toHaveText('Nutrients');
    });

    test('Yield Forecasting dropdown navigation works', async ({ page }) => {
      const navdropdownTopic = page.locator('#topicNavigation');
      await navdropdownTopic.click();
      
      // Select by the ID of the option
      await page.selectOption('select', { index: 5 }); // by index
      const header = page.locator('h1');
      await expect(header).toHaveText('Yield Forecasting');
    });
 });
});

//homepage test
test.describe('Homepage Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(homePath);
  });

  //check homepage has a title.
  test('homepage has title', async ({ page }) => {
    await expect(page).toHaveTitle('Greenhouse Insight');
  });

  //check chat with us btn
  test('check chat with Us button is visible', async ({ page }) => {
    const chatBtn = page.locator('#chat-us-btn');
    await expect(chatBtn).toBeVisible();
  });

  //check logo
  test('check logo is visible', async ({ page }) => {
    const logo = page.locator('#greenhouse-logo');
    await expect(logo).toBeVisible();
  });

  ///Footer test
  test.describe('Footer Tests', () => {

    test('check Social Media section is visible', async ({ page }) => {
      const socialSec = page.locator('.footer_social');
      await expect(socialSec).toHaveCount(3);
      await expect(page.locator('.footer_social').first()).toBeVisible();
      await expect(page.locator('.footer_social').nth(1)).toBeVisible();
      await expect(page.locator('.footer_social').nth(2)).toBeVisible();
    });
    //Githib icon
    test('check GitHub icon link works ', async ({ page, context }) => {
     const pagePromise = context.waitForEvent('page');
      const gitHubicon = page.locator('.footer_social').locator(`a[href*="https://github.com/YemiOyedeji89/GreenhouseInsight"]`);
      await expect(gitHubicon).toBeVisible();
      await gitHubicon.click();

      ///checking navigation
      const newTab = await pagePromise;
      await newTab.waitForLoadState();
      await expect(newTab).toHaveURL(`https://github.com/YemiOyedeji89/GreenhouseInsight`, { timeout: 100000 });
      await newTab.close();

    });
    //linkedin icon
    test('check LinkedIn icon link works ', async ({ page }) => {
      const linkedInicon = page.locator('.footer_social').locator(`a[href*="https://www.linkedin.com/in/yemi-oyedeji-306251199/"]`);
      await expect(linkedInicon).toBeVisible();
      await linkedInicon.click();
    });
    //mail icon
    test('check Mail icon link works ', async ({ page }) => {
      const mailicon = page.locator('.footer_social').locator(`a[href*="mailto:yemi.oyedeji89@gmail.com"]`);
      await expect(mailicon).toBeVisible();
      await mailicon.click();
    });

  });
});

//checks colours
test.describe('colour Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(homePath);
  });
  
  //navBar 
  test('check navBar colour', async ({ page }) => {
    const navColour = page.locator('.nav');
    await expect(navColour).toHaveCSS('background-color', 'rgb(141, 201, 87)');
  });

  //chat with us button
  test('check chat with Us button colour', async ({ page }) => {
    const chatWithUsDiv = page.locator('#chat-us-btn');
    await expect(chatWithUsDiv).toHaveCSS('background-color', 'rgb(141, 201, 87)');
  });
  
  //learn more button
  test('check learn more buttons colour', async ({ page }) => {
    const alLearnMoreBtnColor = await page.locator('.learnMoreBtn').all();
    const expectedColor = 'rgb(141, 201, 87)';
    
    for (const btn of alLearnMoreBtnColor){
      await expect(btn).toHaveCSS('background-color', expectedColor);
    }
  });

  //paragraph text colour
  test('check <p> tag colour', async ({ page }) => {
    const allTextColor = await page.locator('p').all();
    const expectedColor = 'rgb(16, 16, 16)';
    
    for (const text of allTextColor){
      await expect(text).toHaveCSS('color', expectedColor);
    }
  });
  
});

///Animations Page Test
test.describe('Transition Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(homePath);
  });

  //navBar transitions
  test('check navBar link transitions', async ({ page }) => {
    const allNavBarText = await page.locator('.navText').all();
    const onHoverColour = /rgba?\(199,\s*159,\s*2,\s*0\.56\)/;
    
    for (const navText of allNavBarText){
      const link = navText.locator('a');
      await link.hover();
      await expect(link).toHaveCSS('background-color', onHoverColour);
    }
  });

  //Gallery Page transitions
  test('check Gallery image transitions', async ({ page }) => {

    await page.click('#galley-link');
    await expect(page).toHaveURL(/gallery.html/);
    const header = page.locator('h1');
    await expect(header).toHaveText('Image Gallery');

    const allImg = await page.locator('.topic_images-gallery').all();
    
    for (const imgG of allImg){
      await imgG.hover();
      await page.waitForTimeout(1000);
      await expect(imgG).toHaveCSS('transform', `matrix\(1\.3, 0, 0, 1\.3, 0, 0\)`);
    }
  });
});

///checks Html Elements
test.describe('check html elements tags', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(homePath);
    const yieldLearnMoreBtn = page.locator('#yield-learn-moreBtn');
    await expect(yieldLearnMoreBtn).toBeVisible();

    await page.click('#yield-learn-moreBtn');
    await expect(page).toHaveURL(/yield.html/);

    const yieldHeader = page.locator('h1');
    await expect(yieldHeader).toHaveText('Yield Forecasting');

  });

  //Yield forecast html tages
  test('check Yield Forecasting html img attribute', async ({ page }) => {
    const myElement = page.locator(`#yield-gallery`);
    await expect(myElement).toHaveAttribute(`alt`, 'Yield Forecasting dashboard');
  });

  test('check Chat With Us is a form', async ({ page }) => {
    const chatBtn = page.locator('#chat-us-btn');
    await expect(chatBtn).toBeVisible();
    chatBtn.click();

    const myElement = page.locator(`#chat-form`);
    await expect(myElement).toHaveJSProperty('tagName', 'FORM');
  });

  //test canvas chart rendering
  test('check yield forecasting chart is rendering', async ({ page }) => {
    const canvas = page.locator('#zoneChart');
    await expect(canvas).toBeAttached({timeout: 10000});
  });
});

///checks chat with form submission
test.describe('check Chat with us validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(homePath);
    const yieldLearnMoreBtn = page.locator('#yield-learn-moreBtn');
    await expect(yieldLearnMoreBtn).toBeVisible();

    await page.click('#yield-learn-moreBtn');
    await expect(page).toHaveURL(/yield.html/);

    const yieldHeader = page.locator('h1');
    await expect(yieldHeader).toHaveText('Yield Forecasting');

    const chatBtn = page.locator('#chat-us-btn');
    await expect(chatBtn).toBeVisible();
    chatBtn.click();

    const myElement = page.locator(`#chat-form`);
    await expect(myElement).toHaveJSProperty('tagName', 'FORM');

  });

  //checks when submit btn is clicked and all fields are empty
  test('check Chat With Us cannot be empty on submission', async ({ page }) => {
    const submitBtn = page.locator('#submit-chat-btn');
    submitBtn.click();
    const allErrAlert = page.locator('.error-alert-field').all();

    for(err in allErrAlert){
      await expect(err).toBeVisible();
      await expect(err).toHaveCSS('color', 'rgba(238, 18, 18, 0.92)')
    }

  });

  //test for name field
  test('check Chat With Us Name field is required', async ({ page }) => {
    const submitBtn = page.locator('#submit-chat-btn');
    
   await page.locator('#email').fill('fff@me.com');
    await page.locator('#message').fill('this is a test');
    await submitBtn.click();

    const nameErrAlert = page.locator('#error-alert')

    await expect(nameErrAlert).toBeVisible();
    await expect(nameErrAlert).toHaveCSS('color', 'rgba(238, 18, 18, 0.92)')

  });
  
  //test for email field
  test('check Chat With Us Email field is required', async ({ page }) => {
    const submitBtn = page.locator('#submit-chat-btn');
    
    await page.locator('#name').fill('Test Test');
    await page.locator('#message').fill('this is a test');
    await submitBtn.click();

    const emailErrAlert = page.locator('#error-alert-email')
    await expect(emailErrAlert).toBeVisible();
    await expect(emailErrAlert).toHaveCSS('color', 'rgba(238, 18, 18, 0.92)')
  });

  //test for message field
  test('check Chat With Us Message field is required', async ({ page }) => {
    const submitBtn = page.locator('#submit-chat-btn');
    
    await page.locator('#name').fill('Test Test');
    await page.locator('#email').fill('fff@me.com');
    await submitBtn.click();

    const messgErrAlert = page.locator('#error-alert-message')
    await expect(messgErrAlert).toBeVisible();
    await expect(messgErrAlert).toHaveCSS('color', 'rgba(238, 18, 18, 0.92)')
  });

  //check successful submission
  test('check Chat With Us successful submission', async ({ page }) => {
    const submitBtn = page.locator('#submit-chat-btn');
    
    await page.locator('#name').fill('Test Test');
    await page.locator('#email').fill('fff@me.com');
     await page.locator('#message').fill('this is a test');
    await submitBtn.click();

    const confimMssg = page.locator('#chat-confirmation')
    await expect(confimMssg).toBeVisible();
    await expect(confimMssg).toContainText('Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.');
  });

  //check cancel btn
  test('check Chat With Us cancel button', async ({ page }) => {
    const cancelBtn = page.locator('#cancel-chat-btn');
    
    await page.locator('#name').fill('Test Test');
    await page.locator('#email').fill('fff@me.com');
    await page.locator('#message').fill('this is a test');
    await cancelBtn.click();

    const formModal= page.locator('#chat-form')
    await expect(formModal).toBeHidden();

    const chatBtn = page.locator('#chat-us-btn');
    await expect(chatBtn).toBeVisible();
  });
});