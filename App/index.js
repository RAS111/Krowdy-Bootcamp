let btnscrap = document.getElementById('scrap-profile')

btnscrap.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab !== null) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapingProfile,
    });
  }
})

const scrapingProfile = () => {
  const wait = function (milliseconds) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, milliseconds);
    });
  };

  // Personal information
  const elementNameProfile = document.querySelector("div.ph5 > div.display-flex.justify-space-between.pt2 > div h1")
  const elementNameTitle = document.querySelector("div.ph5 > div.display-flex.justify-space-between.pt2 > div div.text-body-medium.break-words")
  const elementLocation = document.querySelector('div.pb2 > span')
  const name = elementNameProfile ? elementNameProfile.innerText : '';
  const title = elementNameTitle ? elementNameTitle.innerText : '';
  const location = elementLocation ? elementLocation.innerText : '';
  const elementBusiness = document.querySelector('div.ph5 > div.display-flex.justify-space-between.pt2 > ul div')
  const business = elementBusiness ? elementBusiness.innerText : '';
  const elementEducationInstitute = document.querySelector('div.ph5 > div.display-flex.justify-space-between.pt2 > ul li:nth-child(2)')
  const educationInstitute =  elementEducationInstitute ? elementEducationInstitute .innerText : '';
  
  // Resume
  wait(2000);
  let elementMoreResume = document.querySelector('div.pb2 > span > a');
  if (elementMoreResume) elementMoreResume.click();
  elementMoreResume = document.querySelector('div > div > section > div');
  const dimissResume = document.querySelector('button');
  wait(2000);
  if (dimissResume) dimissResume.click();
  const resume = elementMoreResume ? elementMoreResume.innerText : '';
  //END resume
  
  // About me
  const elementAboutMe = document.querySelector('div.inline-show-more-text.mt4')
  const aboutMe = elementAboutMe ? elementAboutMe.innerText : '';
  //END About me

  // END Personal information

  // Experience
  const arrExperience = [];
  const experience = document.querySelector('section.pv-profile-section.experience-section > ul');
  const elementsExperience = experience.querySelectorAll("li");
  elementsExperience.forEach((element) => {

    const businessExperience = element.querySelector('section > div > div > a > div > p.pv-entity__secondary-title')?.innerText || '';
    const periodExperience = {
      date:
        element.querySelector('section > div > div > a > div > div > h4 > span:nth-child(2)')?.innerText || "",
      duration:
        element.querySelector('section > div > div > a > div > div > h4:nth-child(2) > span:nth-child(2)')?.innerText || "",
    };
    
    const workExperience = element.querySelector('section > div > div > a > div > h3')?.innerText || '';

    arrExperience.push({businessExperience,periodExperience,workExperience});
  });
  // End Experience

  // Education 
  const arrEducation = [];
  const education = document.querySelector("section.pv-profile-section.education-section > ul ");
  const elementsEducation = education.querySelectorAll("li");
  elementsEducation.forEach((element) => {
    
    const educationLevel = {
      title:
        element.querySelector("div > div > a > div > div > p > span:nth-child(2)")?.innerText || "",
      discipline:
        element.querySelector("div > div > a > div > div > p:nth-child(3) > span:nth-child(2)")?.innerText || "",
    };
    const educationCenter = element.querySelector("div > div > a > div > div > h3")?.innerText ||"";
    const educationPeriod = element.querySelector("div > div > a > div > p > span:nth-child(2)")?.innerText ||"";

    arrEducation.push({ educationLevel, educationCenter, educationPeriod });
  });
  // End Education
  
  console.log({ 
    name, title, resume, location, aboutMe, 
    arrExperience: arrExperience, arrEducation: arrEducation, 
    business, educationInstitute 
  });
}