import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'aa1'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'bc6'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '60f'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', '698'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/module-1-ros-2-fundamentals',
                component: ComponentCreator('/docs/category/module-1-ros-2-fundamentals', '91b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/module-2-gazebo--unity',
                component: ComponentCreator('/docs/category/module-2-gazebo--unity', 'c6a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/module-3-nvidia-isaac',
                component: ComponentCreator('/docs/category/module-3-nvidia-isaac', '05c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/module-4-vision-language-action',
                component: ComponentCreator('/docs/category/module-4-vision-language-action', 'a2d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/hardware-requirements',
                component: ComponentCreator('/docs/hardware-requirements', '663'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module1/week1-intro-physical-ai',
                component: ComponentCreator('/docs/module1/week1-intro-physical-ai', '6d0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module1/week2-intro-physical-ai-2',
                component: ComponentCreator('/docs/module1/week2-intro-physical-ai-2', 'e71'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module1/week3-ros-fundamentals',
                component: ComponentCreator('/docs/module1/week3-ros-fundamentals', '501'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module1/week4-ros-fundamentals-2',
                component: ComponentCreator('/docs/module1/week4-ros-fundamentals-2', '0be'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module1/week5-ros-fundamentals-3',
                component: ComponentCreator('/docs/module1/week5-ros-fundamentals-3', '008'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module2/week6-gazebo',
                component: ComponentCreator('/docs/module2/week6-gazebo', '7d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module2/week7-gazebo-unity',
                component: ComponentCreator('/docs/module2/week7-gazebo-unity', 'b30'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module3/week10-isaac-3',
                component: ComponentCreator('/docs/module3/week10-isaac-3', '24b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module3/week8-isaac',
                component: ComponentCreator('/docs/module3/week8-isaac', '93a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module3/week9-isaac-2',
                component: ComponentCreator('/docs/module3/week9-isaac-2', '86f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module4/week11-humanoid-dev',
                component: ComponentCreator('/docs/module4/week11-humanoid-dev', '180'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module4/week12-humanoid-dev-2',
                component: ComponentCreator('/docs/module4/week12-humanoid-dev-2', '472'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module4/week13-conversational-robotics',
                component: ComponentCreator('/docs/module4/week13-conversational-robotics', 'f64'),
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
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
