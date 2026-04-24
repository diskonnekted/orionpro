import { pool } from './db';

export const colorSchemes = {
  default: {
    name: 'Default (Blue)',
    colors: {
      primary: '#3b82f6', // blue-500
      secondary: '#64748b', // slate-500
      background: '#f8fafc', // slate-50
      surface: '#ffffff',
      text: '#0f172a', // slate-900
      textMuted: '#64748b', // slate-500
      border: '#e2e8f0', // slate-200
      sidebarText: '#ffffff',
      sidebarMuted: '#cbd5e1', // slate-300
    }
  },
  nature: {
    name: 'Nature',
    colors: {
      primary: '#606c38', // olive_leaf
      secondary: '#283618', // black_forest
      background: '#fefae0', // cornsilk
      surface: '#ffffff',
      text: '#13160b', // olive_leaf 100
      textMuted: '#4c562c', // olive_leaf 400
      border: '#e2e7d1', // olive_leaf 900
      sidebarText: '#ffffff',
      sidebarMuted: '#d9d9d9',
    }
  },
  volcano: {
    name: 'Volcano',
    colors: {
      primary: '#c1121f', // brick_red
      secondary: '#780000', // molten_lava
      background: '#fdf0d5', // papaya_whip
      surface: '#ffffff',
      text: '#180000', // molten_lava 100
      textMuted: '#620000', // molten_lava 400
      border: '#fac8cb', // brick_red 900
      sidebarText: '#ffffff',
      sidebarMuted: '#ffcccc',
    }
  },
  pastel: {
    name: 'Pastel',
    colors: {
      primary: '#cdb4db', // thistle
      secondary: '#ffafcc', // baby_pink
      background: '#f5f0f8', // thistle 900 (lightest)
      surface: '#ffffff',
      text: '#2b1a36', // thistle 100
      textMuted: '#a87ec1', // thistle 400
      border: '#ebe1f0', // thistle 800
      sidebarText: '#2b1a36',
      sidebarMuted: '#704c7a',
    }
  },
  ocean: {
    name: 'Ocean',
    colors: {
      primary: '#219ebc', // blue_green
      secondary: '#023047', // deep_space_blue
      background: '#e8f4fa', // sky_blue_(light) 900
      surface: '#ffffff',
      text: '#071f25', // blue_green 100
      textMuted: '#1a7d95', // blue_green 400
      border: '#ceeef6', // blue_green 900
      sidebarText: '#ffffff',
      sidebarMuted: '#8ecae6',
    }
  },
  sunset: {
    name: 'Sunset',
    colors: {
      primary: '#dda15e', // sunlit_clay
      secondary: '#bc6c25', // copperwood
      background: '#f8ecdf', // sunlit_clay 900
      surface: '#ffffff',
      text: '#34210b', // sunlit_clay 100
      textMuted: '#d1842c', // sunlit_clay 400
      border: '#f1dabf', // sunlit_clay 800
      sidebarText: '#ffffff',
      sidebarMuted: '#fae1dd',
    }
  },
  steel: {
    name: 'Steel',
    colors: {
      primary: '#669bbc', // steel_blue
      secondary: '#003049', // deep_space_blue
      background: '#e1ebf2', // steel_blue 900
      surface: '#ffffff',
      text: '#00090e', // deep_space_blue 100
      textMuted: '#477fa2', // steel_blue 400
      border: '#c2d7e4', // steel_blue 800
      sidebarText: '#ffffff',
      sidebarMuted: '#94a3b8',
    }
  },
  amber: {
    name: 'Amber',
    colors: {
      primary: '#ffb703', // amber_flame
      secondary: '#fb8500', // princeton_orange
      background: '#fff1cd', // amber_flame 900
      surface: '#ffffff',
      text: '#321b00', // princeton_orange 100
      textMuted: '#c86b00', // princeton_orange 400
      border: '#ffe39b', // amber_flame 800
      sidebarText: '#ffffff',
      sidebarMuted: '#ffe6a7',
    }
  }
};

export type ColorSchemeName = keyof typeof colorSchemes;

export async function getSiteScheme(): Promise<ColorSchemeName> {
  try {
    const [rows] = await pool.query('SELECT option_value FROM orion_options WHERE option_name = "site_color_scheme"');
    const scheme = (rows as any)[0]?.option_value;
    return (scheme && colorSchemes[scheme as ColorSchemeName]) ? scheme : 'default';
  } catch (error) {
    return 'default';
  }
}
