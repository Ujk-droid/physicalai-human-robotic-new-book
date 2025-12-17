// docs/docusaurus.config.ts
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Bridging the gap between the digital brain and the physical body',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://github.com/BismaYousuf',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/physical-ai-and-humanoid-robotics/',

  // GitHub pages deployment config.
  organizationName: 'Bisma Yousuf',
  projectName: 'physical-ai-and-humanoid-robotics',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Custom fields for API configuration (used in your hooks)
  customFields: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://ai-rative-book-backend-production.up.railway.app',
    apiKey: process.env.REACT_APP_API_KEY || '',
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          editUrl: 'https://github.com/BismaYousuf',
        },
        blog: false, // Blog disabled as per textbook structure
        theme: {
          customCss: './src/css/custom.css', // Points to your new Modern Theme
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.jpg',
    
    // We handle dark mode toggle in the UserProfileButton, 
    // but we keep respectPrefersColorScheme true
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true, 
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'Physical AI',
      logo: {
        alt: 'Physical AI Logo',
        // Yahan humne naya logo link kar diya hai
        src: 'img/ai-logo.svg', 
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Start Learning',
        },
        {
          type: 'dropdown',
          label: 'Modules',
          position: 'left',
          items: [
            {
              label: 'Module 1: ROS 2 Fundamentals',
              to: '/docs/module1/week1-intro-physical-ai',
            },
            {
              label: 'Module 2: Gazebo Simulation',
              to: '/docs/module2/week6-gazebo',
            },
            {
              label: 'Module 3: NVIDIA Isaac',
              to: '/docs/module3/week8-isaac',
            },
            {
              label: 'Module 4: Conversational Robotics',
              to: '/docs/module4/week13-conversational-robotics',
            },
          ],
        },
        // GitHub link is handled via CSS in your custom theme or can be added here
        {
          href: 'https://github.com/BismaYousuf',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light', // Matches your modern theme better
      links: [
        {
          title: 'Course Material',
          items: [
            {
              label: 'Introduction',
              to: '/docs',
            },
            {
              label: 'ROS 2 Setup',
              to: '/docs/module1/week1-intro-physical-ai',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Bisma GitHub',
              href: 'https://github.com/BismaYousuf',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/bisma-yousuf-52572b2b4/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/BismaYousuf',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Physical AI & Humanoid Robotics. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;