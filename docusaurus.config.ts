import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Andrew Marconi on Github',
  tagline: 'Creative Technology Director & Executive Producer',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://andrewmarconi.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'andrewmarconi', // Usually your GitHub org/user name.
  projectName: 'andrewmarconi.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/andrewmarconi/andrewmarconi.github.io/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/andrewmarconi-ogimage.jpg',
    metadata: [
      { name: 'description', content: 'AI/ML, Documentary, and Experiential Storytelling for Climate & Equity' },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Andrew Marconi',
      logo: {
        alt: 'Andrew Marconi Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSideBar',
          position: 'left',
          label: 'Projects',
        },
        {
          href: 'https://github.com/andrewmarconi',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Where to Find Me',
          items: [
            {
              label: 'AndrewMarconi.com',
              href: 'https://andrewmarconi.com',
            },
            {
              label: 'On LinkedIn',
              href: 'https://linkedin.com/in/marconi',
            },
          ],
        },
        {
          title: "Github Orgs",
          items: [
            {
              label: "/andrewmarconi",
              href: "https://github.com/andrewmarconi",
            },
            {
              label: "/five59",
              href: "https://github.com/five59",
            }
          ],
        },
      ],
      copyright: `Copyright &copy;2026, Andrew Marconi. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
