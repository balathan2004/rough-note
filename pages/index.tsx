import React from "react";
import styles from "@/styles/about.module.css";

const AboutPage = () => {




  return (
    <div className="container">
      <div className={styles.index_page}>
        <h1>Welcome to Your Notes Companion!</h1>
        <p>
          Hi there! Our Notes App is here to make your life simpler. Whether
          it's jotting down quick ideas, managing tasks, or planning your next
          big project, we've got you covered.
        </p>
        <div className={styles.one}>
        <h2>Why You'll Love This App</h2>
        <ul>
          <li>
            <strong>Always With You:</strong> Sync your notes across all your
            devices effortlessly.
          </li>
          <li>
            <strong>Share Notes in a Snap:</strong> Send individual notes with a
            unique link — perfect for quick collaboration.
          </li>
          <li>
            <strong>Secure & Reliable:</strong> Your notes are always safe and
            backed up.
          </li>
          <li>
            <strong>Clean Interface:</strong> Stay focused on what matters most
            — your ideas.
          </li>
        </ul>
        </div>
        <div className={styles.one}>
        <h2> Get Started</h2>
        <p>
          To unlock all the amazing features, you'll need to create an account.
          Here's what you'll get:
        </p>
        <ul>
          <li>Sync notes between all your devices.</li>
          <li>Access sharing features for seamless collaboration.</li>
          <li>Keep your data secure and personalized.</li>
        </ul>
        <p className={styles.cta_message}>
          Ready to make life more organized? Create your account now and take
          the first step toward smarter note-taking!
        </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
