// import creativeCss from '!!raw-loader!@/components/templates/creative/style.css';
// import defaultCss from '!!raw-loader!@/components/templates/default/style.css';
// import modernCss from '!!raw-loader!@/components/templates/modern/style.css';
// import professionalCss from '!!raw-loader!@/components/templates/professional/style.css';
import {
  CreativeTemplate,
  templateOptions as creativeTemplateOptions,
} from '@/components/templates/creative';
import {
  DefaultTemplate,
  templateOptions as defaultTemplateOptions,
} from '@/components/templates/default';
import {
  ModernTemplate,
  templateOptions as modernTemplateOptions,
} from '@/components/templates/modern';
import { TemplateProps } from '@/types/template.type';
import ProfessionalTemplate, {
  templateOptions as professionalTemplateOptions,
} from '@/components/templates/professional';

export const TEMPLATES: Templates = {
  default: {
    id: 'default',
    name: 'Default',
    component: DefaultTemplate,
    css: '',
    templateOptions: defaultTemplateOptions,
    fontFamily: 'Arial',
    thumbnail: '/images/templates/default.png',
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    component: ModernTemplate,
    css: '',
    templateOptions: modernTemplateOptions,
    fontFamily: 'Arial',
    thumbnail: '/images/templates/modern.png',
  },
  creative: {
    id: 'creative',
    name: 'Creative',
    component: CreativeTemplate,
    css: '',
    templateOptions: creativeTemplateOptions,
    fontFamily: 'Arial',
    thumbnail: '/images/templates/creative.png',
  },
  // elegant: {
  //   id: 'elegant',
  //   name: 'Elegant',
  //   component: ElegantTemplate,
  //   css: elegantCss,
  //   styleVars: elegantStyleVars,
  //   fontFamily: 'Arial',
  //   thumbnail: '/images/templates/elegant.png',
  // },
  professional: {
    id: 'professional',
    name: 'Professional',
    component: ProfessionalTemplate,
    css: '',
    templateOptions: professionalTemplateOptions,
    fontFamily: 'Arial',
    thumbnail: '/images/templates/professional.png',
  },
  // minimal: {
  //   id: 'minimal',
  //   name: 'Minimal',
  //   component: MinimalTemplate,
  //   css: minimalCss,
  //   styleVars: minimalStyleVars,
  //   fontFamily: 'Arial',
  //   thumbnail: '/images/templates/minimal.png',
  // },
};

export const TEMPLATE_LIST = Object.values(TEMPLATES);

export type TemplateId = 'default' | 'modern' | 'creative' | 'professional'; // | 'elegant' | 'minimal';

export type TemplateColor = 'black' | 'blue' | 'gray' | 'slate' | 'green' | 'burgundy';

export type TemplateFontFamily =
  | 'Arial'
  | 'Times New Roman'
  | 'Courier New'
  | 'Georgia'
  | 'Garamond'
  | 'Palatino'
  | 'Bookman'
  | 'Comic Sans MS'
  | 'Helvetica Neue'
  | 'Verdana'
  | 'Tahoma'
  | 'Trebuchet MS'
  | 'Arial Black'
  | 'Impact';

export const TEMPLATE_COLORS: {
  [key in TemplateColor]: {
    name: TemplateColor;
    value: string;
  };
} = {
  black: { name: 'black', value: '25, 25, 25' },
  blue: { name: 'blue', value: '30, 58, 138' },
  gray: { name: 'gray', value: '115, 115, 115' },
  slate: { name: 'slate', value: '15, 23, 42' },
  green: { name: 'green', value: '20, 83, 45' },
  burgundy: { name: 'burgundy', value: '127, 29, 29' },
};

export const FONT_FAMILY: {
  value: TemplateFontFamily;
  name: TemplateFontFamily;
}[] = [
  { value: 'Arial', name: 'Arial' },
  { value: 'Times New Roman', name: 'Times New Roman' },
  { value: 'Courier New', name: 'Courier New' },
  { value: 'Georgia', name: 'Georgia' },
  { value: 'Garamond', name: 'Garamond' },
  { value: 'Palatino', name: 'Palatino' },
  { value: 'Bookman', name: 'Bookman' },
  { value: 'Comic Sans MS', name: 'Comic Sans MS' },
  { value: 'Helvetica Neue', name: 'Helvetica Neue' },
  { value: 'Verdana', name: 'Verdana' },
  { value: 'Tahoma', name: 'Tahoma' },
  { value: 'Trebuchet MS', name: 'Trebuchet MS' },
  { value: 'Arial Black', name: 'Arial Black' },
  { value: 'Impact', name: 'Impact' },
];

export const FONT_SIZES = {
  min: 8,
  max: 24,
  step: 2,
  defaultValue: 14,
};

export const SECTION_SPACING = {
  min: 4,
  max: 36,
  step: 4,
  defaultValue: 18,
};

export type Templates = {
  [key in TemplateId]: Template;
};

export type Template = {
  id: TemplateId;
  name: string;
  component: React.ComponentType<TemplateProps>;
  css: string;
  templateOptions: TemplateOptions;
  fontFamily: string;
  thumbnail: string;
};

export interface TemplateOptions {
  color: TemplateColor;
  fontSize: number;
  sectionSpacing: number;
  fontFamily: TemplateFontFamily;
}

export default TEMPLATES;
