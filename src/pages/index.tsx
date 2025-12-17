// src\pages\index.tsx
import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.badge}>Open Source Textbook</span>
        <h1 className={styles.heroTitle}>
          Physical AI &<br />Humanoid Robotics
        </h1>
        <p className={styles.heroSubtitle}>
          Bridge the gap between the digital brain and the physical body. 
          Learn to design, simulate, and deploy intelligent robotic systems.
        </p>
        <div className={styles.heroButtons}>
          <Link to="/docs" className={styles.primaryButton}>
            Start Learning
          </Link>
          <Link to="/docs/module1/week1-intro-physical-ai" className={styles.secondaryButton}>
            View Modules
          </Link>
        </div>
      </div>
    </section>
  );
}

const modules = [
  {
    number: '01',
    title: 'ROS 2 Fundamentals',
    subtitle: 'The Robotic Nervous System',
    description: 'Master nodes, topics, services, and URDF. Learn the middleware that connects all robot components.',
    link: '/docs/module1/week1-intro-physical-ai',
  },
  {
    number: '02',
    title: 'Gazebo & Unity',
    subtitle: 'The Digital Twin',
    description: 'Simulate physics, gravity, and collisions. Build virtual environments for testing.',
    link: '/docs/module2/week6-gazebo',
  },
  {
    number: '03',
    title: 'NVIDIA Isaac',
    subtitle: 'The AI-Robot Brain',
    description: 'Explore photorealistic simulation, VSLAM, and GPU-accelerated perception.',
    link: '/docs/module3/week8-isaac',
  },
  {
    number: '04',
    title: 'Vision-Language-Action',
    subtitle: 'LLMs Meet Robotics',
    description: 'Combine large language models with robotics for voice-controlled autonomous systems.',
    link: '/docs/module4/week13-conversational-robotics',
  },
];

function ModulesSection() {
  return (
    <section className={styles.modules}>
      <div className={styles.sectionHeader}>
        <h2>Course Modules</h2>
        <p>A comprehensive curriculum from fundamentals to advanced AI integration</p>
      </div>
      <div className={styles.moduleGrid}>
        {modules.map((module) => (
          <Link to={module.link} key={module.number} className={styles.moduleCard}>
            <span className={styles.moduleNumber}>{module.number}</span>
            <h3 className={styles.moduleTitle}>{module.title}</h3>
            <span className={styles.moduleSubtitle}>{module.subtitle}</span>
            <p className={styles.moduleDescription}>{module.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

const features = [
  {
    icon: '🤖',
    title: 'Embodied Intelligence',
    description: 'Understand AI systems that function in reality and comprehend physical laws.',
  },
  {
    icon: '🔧',
    title: 'Hands-on Projects',
    description: 'Build real robotic systems with practical code examples and exercises.',
  },
  {
    icon: '🧠',
    title: 'AI-Powered Assistance',
    description: 'Get personalized help from our AI tutor that knows the entire textbook.',
  },
];

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className={styles.featureGrid}>
        {features.map((feature, idx) => (
          <div key={idx} className={styles.featureCard}>
            <span className={styles.featureIcon}>{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2>Ready to build the future?</h2>
        <p>Start your journey into Physical AI and humanoid robotics today.</p>
        <Link to="/docs" className={styles.ctaButton}>
          Get Started →
        </Link>
      </div>
    </section>
  );
}

export default function Home(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="Learn to design, simulate, and deploy intelligent robotic systems with ROS 2, Gazebo, NVIDIA Isaac, and VLA models.">
      <main className={styles.main}>
        <HeroSection />
        <ModulesSection />
        <FeaturesSection />
        <CTASection />
      </main>
    </Layout>
  );
}
