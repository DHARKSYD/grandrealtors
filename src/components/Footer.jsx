import React from "react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPinterest,
  FaYoutube,
  FaFacebook
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import appStoreImg from "../assets/app-store.png";
import googlePlayImg from "../assets/google-play.png";
import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles["site-footer"]}>
    <div className={styles["footer-container"]}>
      {/* Social Media Icons */}
      <div className={styles["social-icons"]}>
        <a href="https://twitter.com/ORENDU_" target="_blank" rel="noopener noreferrer"><SiX /></a>
        <a href="https://ng.linkedin.com/company/niit-limited" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
        <a href="https://www.facebook.com/niitabujacenter/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://www.instagram.com/niitabuja/?hl=en" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://www.pinterest.com/pin/598838081737822313/" target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
        <a href="https://www.youtube.com/watch?v=nCDGjLRecrs&t=40s" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
      </div>

      {/* Navigation Links */}
      <div className={styles["footer-links"]}>
        <a href="/footer-info#about">About us</a>
        <a href="/footer-info#careers">Careers</a>
        <a href="/footer-info#accessibility">Accessibility</a>
        <a href="/footer-info#mediaroom">Media Room</a>
        <a href="/footer-info#feedback">Feedback</a>
        <a href="/footer-info#agent-support">Agent support</a>
        <a href="/footer-info#privacy">Privacy</a>
        <a href="/footer-info#terms">Terms</a>
      </div>

      <div className={styles["footer-links2"]}>
        <a href="/footer-info#do-not-sell" className={styles["highlighted"]}>
          Do Not Sell or Share My Personal Information
        </a>
      </div>

      {/* App Download Buttons */}
      <div className={styles["app-buttons"]}>
        <img src={appStoreImg} alt="App Store" />
        <img src={googlePlayImg} alt="Google Play" />
      </div>

      {/* Legal Info */}
      <p className={styles["footer-text"]}>
        *Based on an Aug. {new Date().getFullYear()} proprietary survey among real estate professionals.
      </p>
      <p className={styles["footer-text"]}>
        © Orendu's Brain Activity {new Date().getFullYear()}
        <a href="https://www.nar.realtor/" target="_blank" rel="noopener noreferrer">
          National Association of REALTORS®
        </a>{" "}
        and{" "}
        <a href="https://www.move.com/" target="_blank" rel="noopener noreferrer">
          Move, Inc.
        </a>
        . All rights reserved.
      </p>

      {/* Logos */}
      <div className={styles["footer-logos"]}>
      </div>
    </div>
  </footer>
);

export default Footer;