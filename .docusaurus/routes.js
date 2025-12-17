import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/physical-ai-and-humanoid-robotics/__docusaurus/debug',
    component: ComponentCreator('/physical-ai-and-humanoid-robotics/__docusaurus/debug', '16e'),
    exact: true
  },
  {
    path: '/physical-ai-and-humanoid-robotics/__docusaurus/debug/config',
    component: ComponentCreator('/physical-ai-and-humanoid-robotics/__docusaurus/debug/config', '776'),
    exact: true
  },
  {
    path: '/physical-ai-and-humanoid-robotics/__docusaurus/debug/content',
    component: ComponentCreator('/physical-ai-and-humanoid-robotics/__docusaurus/debug/content', '669'),
    exact: true
  },
  {
    path: '/physical-ai-and-humanoid-robotics/__docusaurus/debug/globalData',
    component: ComponentCreator('/physical-ai-and-humanoid-robotics/__docusaurus/debug/globalData', '053'),
    exact: true
  },
  {
    path: '/physical-ai-and-humanoid-robotics/__docusaurus/debug/metadata',
    component: ComponentCreator('/physical-ai-and-humanoid-robotics/__docusaurus/debug/metadata', '250'),
    exact: true
  },
  {
    path: '/physical-ai-and-humanoid-robotics/__docusaurus/debug/registry',
    component: ComponentCreator('/physical-ai-and-humanoid-robotics/__docusaurus/debug/registry', 'c41'),
    exact: true
  },
  {
    path: '/physical-ai-and-humanoid-robotics/__docusaurus/debug/routes',
    component: ComponentCreator('/physical-ai-and-humanoid-robotics/__docusaurus/debug/routes', '2b6'),
    exact: true
  },
  {
    path: '/physical-ai-and-humanoid-robotics/markdown-page',
    component: ComponentCreator('/physical-ai-and-humanoid-robotics/markdown-page', '87e'),
    exact: true
  },
  {
    path: '/physical-ai-and-humanoid-robotics/docs',
    component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs', '733'),
    routes: [
      {
        path: '/physical-ai-and-humanoid-robotics/docs',
        component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs', 'de9'),
        routes: [
          {
            path: '/physical-ai-and-humanoid-robotics/docs',
            component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs', 'd22'),
            routes: [
              {
                path: '/physical-ai-and-humanoid-robotics/docs/',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/', 'd34'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/category/module-1-ros-2-fundamentals',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/category/module-1-ros-2-fundamentals', 'b3f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/category/module-2-gazebo--unity',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/category/module-2-gazebo--unity', 'fab'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/category/module-3-nvidia-isaac',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/category/module-3-nvidia-isaac', 'fae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/category/module-4-vision-language-action',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/category/module-4-vision-language-action', 'ca7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/hardware-requirements',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/hardware-requirements', '816'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module1/week1-intro-physical-ai',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module1/week1-intro-physical-ai', 'd07'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module1/week2-intro-physical-ai-2',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module1/week2-intro-physical-ai-2', '86c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module1/week3-ros-fundamentals',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module1/week3-ros-fundamentals', 'a42'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module1/week4-ros-fundamentals-2',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module1/week4-ros-fundamentals-2', '578'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module1/week5-ros-fundamentals-3',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module1/week5-ros-fundamentals-3', 'ba2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module2/week6-gazebo',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module2/week6-gazebo', '568'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module2/week7-gazebo-unity',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module2/week7-gazebo-unity', 'c6b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module3/week10-isaac-3',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module3/week10-isaac-3', '267'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module3/week8-isaac',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module3/week8-isaac', '85d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module3/week9-isaac-2',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module3/week9-isaac-2', 'ee0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module4/week11-humanoid-dev',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module4/week11-humanoid-dev', 'a27'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module4/week12-humanoid-dev-2',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module4/week12-humanoid-dev-2', '80e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-and-humanoid-robotics/docs/module4/week13-conversational-robotics',
                component: ComponentCreator('/physical-ai-and-humanoid-robotics/docs/module4/week13-conversational-robotics', '791'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/physical-ai-and-humanoid-robotics/',
    component: ComponentCreator('/physical-ai-and-humanoid-robotics/', '603'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
