import DefaultTemplate, { css as defaultCss } from '@/components/templates/default';
import ModernTemplate, { css as modernCss } from '@/components/templates/modern';

const templates = [
  { id: 'default', name: 'Default Template', component: DefaultTemplate, css: defaultCss },
  { id: 'modern', name: 'Modern Template', component: ModernTemplate, css: modernCss },
  { id: 'modern', name: 'Modern Template', component: ModernTemplate, css: '/* Modern CSS */' },
  { id: 'modern', name: 'Modern Template', component: ModernTemplate, css: '/* Modern CSS */' },
  { id: 'modern', name: 'Modern Template', component: ModernTemplate, css: '/* Modern CSS */' },
  { id: 'modern', name: 'Modern Template', component: ModernTemplate, css: '/* Modern CSS */' },
  { id: 'modern', name: 'Modern Template', component: ModernTemplate, css: '/* Modern CSS */' },
  { id: 'modern', name: 'Modern Template', component: ModernTemplate, css: '/* Modern CSS */' },
];

export default templates; 