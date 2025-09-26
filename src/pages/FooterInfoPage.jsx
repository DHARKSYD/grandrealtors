import React, { useState } from "react";
import styles from "./FooterInfoPage.module.css";

const notImplemented = (e) => {
  e.preventDefault();
  alert("NOT IMPLEMENTED YET");
};

const sections = [
  {
    key: "about",
    title: "About Us",
    summary: "Learn about GrandRealtors' mission and values.",
    content: (
      <>
        <p>
          <b>GrandRealtors</b> is Nigeria’s trusted real estate platform, connecting buyers, sellers, and agents nationwide. Our mission is to make property transactions transparent, efficient, and rewarding for everyone. We leverage technology and local expertise to help you find your dream home or sell your property with confidence.
        </p>
        <p>
          <b>Our Values:</b>
          <ul>
            <li>Integrity and transparency in all dealings</li>
            <li>Customer-first approach</li>
            <li>Innovation and technology-driven solutions</li>
            <li>Empowering local communities</li>
          </ul>
        </p>
        <a href="/about" className={styles.linkButton} onClick={notImplemented}>Read More About Us</a>
      </>
    ),
  },
  {
    key: "careers",
    title: "Careers",
    summary: "Join our passionate team and shape the future.",
    content: (
      <>
        <p>
          We’re always looking for talented professionals in engineering, marketing, sales, customer support, and more. At GrandRealtors, you’ll work with a diverse team and have opportunities for growth and development.
        </p>
        <ul>
          <li>Competitive salaries and benefits</li>
          <li>Remote and hybrid work options</li>
          <li>Continuous learning and mentorship</li>
        </ul>
        <a href="/careers" className={styles.linkButton} onClick={notImplemented}>View Open Positions</a>
        <button className={styles.actionButton} onClick={(e) => {notImplemented(e); window.location = "mailto:hr@grandrealtors.com"}}>Contact HR</button>
      </>
    ),
  },
  {
    key: "accessibility",
    title: "Accessibility",
    summary: "We are committed to accessibility for all.",
    content: (
      <>
        <p>
          Our website is designed to be accessible to everyone, including people with disabilities. We follow WCAG guidelines and regularly test our site for accessibility.
        </p>
        <p>
          <b>Need help?</b> <a href="mailto:support@grandrealtors.com" className={styles.linkButton} onClick={notImplemented}>Contact Accessibility Support</a>
        </p>
      </>
    ),
  },
  {
    key: "feedback",
    title: "Feedback",
    summary: "Your feedback helps us improve!",
    content: (
      <>
        <p>
          We value your input. If you have suggestions, comments, or encounter any issues, please let us know.
        </p>
        <button className={styles.actionButton} onClick={(e) => {notImplemented(e); window.location = "mailto:feedback@grandrealtors.com"}}>Send Feedback</button>
      </>
    ),
  },
  {
    key: "media",
    title: "Media Room",
    summary: "Press inquiries and latest news.",
    content: (
      <>
        <p>
          For press inquiries, media resources, and the latest news about GrandRealtors, visit our Media Room.
        </p>
        <a href="/media" className={styles.linkButton} onClick={notImplemented}>Visit Media Room</a>
        <button className={styles.actionButton} onClick={(e) => {notImplemented(e); window.location = "mailto:media@grandrealtors.com"}}>Contact Media Team</button>
      </>
    ),
  },
  {
    key: "adchoices",
    title: "Ad Choices",
    summary: "Control the ads you see.",
    content: (
      <>
        <p>
          We respect your privacy and provide options to control the ads you see on our platform. Learn more about how we use cookies and how you can manage your ad preferences.
        </p>
        <a href="/privacy" className={styles.linkButton} onClick={notImplemented}>Privacy Policy</a>
      </>
    ),
  },
  {
    key: "advertise",
    title: "Advertise With Us",
    summary: "Reach thousands of property seekers.",
    content: (
      <>
        <p>
          Reach thousands of property seekers and real estate professionals by advertising on GrandRealtors.
        </p>
        <a href="/advertise" className={styles.linkButton} onClick={notImplemented}>Advertising Packages</a>
        <button className={styles.actionButton} onClick={(e) => {notImplemented(e); window.location = "mailto:ads@grandrealtors.com"}}>Contact Advertising</button>
      </>
    ),
  },
  {
    key: "agent-support",
    title: "Agent Support",
    summary: "Resources and tools for agents.",
    content: (
      <>
        <p>
          Are you a real estate agent? Access dedicated support, resources, and tools to help you succeed on our platform.
        </p>
        <a href="/agent-support" className={styles.linkButton} onClick={notImplemented}>Agent Resources</a>
      </>
    ),
  },
  {
    key: "privacy",
    title: "Privacy",
    summary: "Your privacy is important to us.",
    content: (
      <>
        <p>
          Read our Privacy Policy to understand how we collect, use, and protect your personal information.
        </p>
        <a href="/privacy" className={styles.linkButton} onClick={notImplemented}>Read Privacy Policy</a>
      </>
    ),
  },
  {
    key: "terms",
    title: "Terms",
    summary: "Your rights and responsibilities.",
    content: (
      <>
        <p>
          Please review our Terms of Service for information about your rights and responsibilities when using GrandRealtors.
        </p>
        <a href="/terms" className={styles.linkButton} onClick={notImplemented}>Read Terms of Service</a>
      </>
    ),
  },
  {
    key: "homemade",
    title: "Home Made",
    summary: "Tips, guides, and inspiration for your home.",
    content: (
      <>
        <p>
          Discover tips, guides, and inspiration for making the most of your home. Our Home Made section features articles on home improvement, decor, and living well.
        </p>
        <a href="/homemade" className={styles.linkButton} onClick={notImplemented}>Explore Home Made</a>
      </>
    ),
  },
  {
    key: "techblog",
    title: "Tech Blog",
    summary: "Latest technology trends in real estate.",
    content: (
      <>
        <p>
          Stay updated with the latest technology trends in real estate. Our Tech Blog covers innovations, product updates, and insights from our engineering team.
        </p>
        <a href="/tech-blog" className={styles.linkButton} onClick={notImplemented}>Visit Tech Blog</a>
      </>
    ),
  },
  {
    key: "agentblog",
    title: "Agent Blog",
    summary: "Resources for real estate professionals.",
    content: (
      <>
        <p>
          The Agent Blog is your go-to resource for real estate professionals. Find tips on growing your business, marketing strategies, and industry news.
        </p>
        <a href="/agent-blog" className={styles.linkButton} onClick={notImplemented}>Read Agent Blog</a>
      </>
    ),
  },
  {
    key: "sitemap",
    title: "Sitemap",
    summary: "Navigate our website easily.",
    content: (
      <>
        <p>
          Quickly navigate our website using the sitemap. Find links to all major sections and resources.
        </p>
        <a href="/sitemap" className={styles.linkButton} onClick={notImplemented}>View Sitemap</a>
      </>
    ),
  },
  {
    key: "donotsell",
    title: "Do Not Sell or Share My Personal Information",
    summary: "Your privacy choices.",
    content: (
      <>
        <p>
          We respect your privacy choices. Learn how you can opt out of the sale or sharing of your personal information in accordance with applicable laws.
        </p>
        <a href="/privacy" className={styles.linkButton} onClick={notImplemented}>Learn More</a>
      </>
    ),
  },
];

const FooterInfoPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className={styles.footerInfoWrapper}>
      <h1 className={styles.title}>GrandRealtors Information</h1>
      <div className={styles.grid}>
        {sections.map((section) => (
          <div
            key={section.key}
            className={styles.card}
            onClick={() => setActiveSection(section)}
            tabIndex={0}
            role="button"
            aria-label={`Open ${section.title} details`}
          >
            <h2>{section.title}</h2>
            <p>{section.summary}</p>
          </div>
        ))}
      </div>

      {activeSection && (
        <div className={styles.modalOverlay} onClick={() => setActiveSection(null)}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className={styles.closeButton}
              onClick={() => setActiveSection(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className={styles.modalTitle}>{activeSection.title}</h2>
            <div className={styles.modalContent}>
              {React.cloneElement(activeSection.content, {}, 
                React.Children.map(activeSection.content.props.children, (child) => {
                  if (!child) return child;
                  if (child.type === "a" || child.type === "button") {
                    return React.cloneElement(child, { onClick: notImplemented });
                  }
                  if (Array.isArray(child)) {
                    return child.map((c) =>
                      c && (c.type === "a" || c.type === "button")
                        ? React.cloneElement(c, { onClick: notImplemented })
                        : c
                    );
                  }
                  return child;
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterInfoPage;