const faqData = [
  {
    question: "What is Lighthouse?",
    answer: "Lighthouse is an open-source tool by Google that analyzes website performance, accessibility, SEO, and more. PagePilot runs Lighthouse audits for you instantly, in the cloud."
  },
  {
    question: "How does PagePilot use Puppeteer?",
    answer: "Puppeteer is a headless Chrome automation tool. PagePilot uses it to spin up a browser, load your website, and run Lighthouse audits in real-time."
  },
  {
    question: "Do I need to install anything?",
    answer: "No. PagePilot runs completely in the cloud using Puppeteer and Lighthouse. Just enter your URL and click “Run Test.”"
  },
  {
    question: "What kind of audits can I run?",
    answer: "You can audit performance, accessibility, SEO, best practices, and Core Web Vitals — both for mobile and desktop views."
  },
  {
    question: "Is PagePilot free to use?",
    answer: "Yes! You can run unlimited basic audits without logging in. No credit card or signup required."
  },
  {
    question: "How do I export a report?",
    answer: "After the audit finishes, click the “Export PDF” button to download a beautifully formatted, shareable report."
  },
  {
    question: "Can I test both mobile and desktop versions?",
    answer: "Absolutely. You can choose to emulate either a mobile device or desktop browser before running the audit."
  },
  {
    question: "Is my data or URL stored?",
    answer: "No. PagePilot does not store or log your URLs or results. All audits are ephemeral and privacy-focused."
  },
  {
    question: "Why does the audit take time?",
    answer: "Each audit launches a headless browser and fully loads your site to simulate real-world performance. Depending on page size, it can take 5–20 seconds."
  },
  {
    question: "Can I use PagePilot without logging in?",
    answer: "Yes! Guest mode is fully supported. You can audit any public site with no login required."
  }
];

export default faqData;
