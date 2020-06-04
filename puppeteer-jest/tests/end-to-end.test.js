import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import FeedbackPage from "../pages/FeedbackPage";
import TopBar from "../pages/components/TopBar";

import { username, password, timeout } from "../config";

describe("Example", () => {
  let homePage;
  let loginPage;
  let feedbackPage;
  let topBar;

  beforeAll(async () => {
    jest.setTimeout(timeout);
    homePage = new HomePage();
    loginPage = new LoginPage();
    feedbackPage = new FeedbackPage();
    topBar = new TopBar();
  });

  it("should load homepage", async () => {
    await homePage.visit();
    await homePage.isNavbarDisplayed();
  });

  it("should submit feedback", async () => {
    await homePage.clickFeedbackLink();
    await feedbackPage.isFeedbackFormDisplayed();
    await feedbackPage.submitFeedback(
      "emily",
      "emily@email.com",
      "subject",
      "comment"
    );
  });

  it("should login to application", async () => {
    await homePage.visit();
    await topBar.isTopBarDisplayed();
    await topBar.clickSignInButton();
    await loginPage.isLoginFormDisplayed();
    await loginPage.login(username, password);
  });
  // it("try to login", async () => {
  //   await loginpage.visit();
  //   await loginpage.isLoginFormDisplayed();
  //   await loginpage.login("username", "password");
  //   await loginpage.wait(5000);
  // });

  // it("feedback should work", async () => {
  //   await feedbackPage.visit();
  //   await feedbackPage.isFeedbackFormDisplayed();
  //   await feedbackPage.submitFeedback(
  //     "emily",
  //     "emily@email.com",
  //     "subject",
  //     "comment"
  //   );
  //   await feedbackPage.wait(5000);
  // });
});

// describe("Google Test", () => {
//   it("should open google homepage", async () => {
//     jest.setTimeout(15000);
//     await page.goto("https://google.com");
//     await page.waitFor(5000);
//   });
// });
