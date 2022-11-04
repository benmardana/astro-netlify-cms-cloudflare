import CMS from 'netlify-cms-app';
import Index from '../../layouts/index';

CMS.init({
  config: {
    backend: {
      name: 'github',
      repo: 'benmcgarvey/promo',
      branch: 'main',
    },
    publish_mode: 'editorial_workflow',
    media_folder: 'public/assets',
    site_url: 'https://promo-dfh.pages.dev',
    collections: [
      {
        label: 'Pages',
        name: 'pages',
        files: [
          {
            label: 'Index Page',
            name: 'index',
            file: 'src/pages/index.md',
            fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Description', name: 'description', widget: 'string' },
              { label: 'Layout', name: 'layout', widget: 'hidden' },
            ],
          },
        ],
      },
    ],
  },
});

CMS.registerPreviewStyle('../../styles/global.css');
CMS.registerPreviewTemplate('index', ({ entry }) => {
  const props = entry.get('data').toJS();

  return Index(props);
});
