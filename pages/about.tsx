import React from "react";
import styles from "@/styles/about.module.css";

const AboutPage = () => {
  return (
    <div className="container">
      <div className={styles.about_page}>
        <h1>About Our Notes App</h1>
        <p>
          Welcome to your go-to app for organizing your thoughts, ideas, and
          tasks effortlessly! We designed this app to be your trusted companion
          for productivity, whether you're planning projects, taking meeting
          notes, or jotting down daily reminders.
        </p>

        <h2>What Makes Us Special?</h2>
        <ul>
          <li>
            <strong>Device Sync:</strong> Your notes travel with you, whether
            you're using your laptop, tablet, or smartphone.
          </li>
          <li>
            <strong>Unique Note Sharing:</strong> Easily share notes with
            friends, colleagues, or family using a secure, unique link.
          </li>
          <li>
            <strong>Simple & Clean Interface:</strong> No clutter, no
            distractions — just you and your notes.
          </li>
          <li>
            <strong>Secure Data:</strong> Your privacy is our priority. All your
            notes are stored securely and are always accessible only to you.
          </li>
        </ul>

        <h2>Our Mission</h2>
        <p>
          We believe that great ideas deserve a great home. Our mission is to
          provide you with a seamless, secure, and efficient way to capture and
          manage your thoughts, no matter where you are.
        </p>

        <h2>Why Choose Us?</h2>
        <p>
          Unlike traditional note-taking apps, we focus on simplicity,
          functionality, and collaboration. Our app bridges the gap between
          personal productivity and professional teamwork, helping you stay on
          top of everything that matters.
        </p>

        <h2>Join Us!</h2>
        <p>
          Start your note-taking journey today and discover how easy it is to
          stay organized, productive, and stress-free. Sign up now and explore
          all the features designed to make your life simpler and more
          connected.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
