export interface Theme {
  themeSections: ThemeSection[];
}

export interface ThemeSection {
  name: string;
  colors: ThemeColor[]
}

interface ThemeColor {
  name: string;
  value: string;
  cssVar: string;
}


export const defaultTheme: Theme = {
  themeSections: [
    {
      name: 'Interfaz',
      colors: [
        {
          name: 'Color Primario',
          value: "#0891b2",
          cssVar: '--primary-interface'
        },
        {
          name: 'Contraste Primario',
          value: "#fafafa",
          cssVar: '--primary-interface-foreground'
        },
        {
          name: 'Color Secundario',
          value: "#1e293b",
          cssVar: '--secondary-interface'
        },
        {
          name: 'Contraste Secundario',
          value: "#fafafa",
          cssVar: '--secondary-interface-foreground'
        },
      ]
    },
    {
      name: 'Textos',
      colors: [
        {
          name: 'Primario',
          value: "#164e63",
          cssVar: '--primary-foreground'
        },
        {
          name: 'Secundario',
          value: "#083344",
          cssVar: '--secondary-foreground'
        },
        {
          name: 'Parrafos',
          value: "#64748b",
          cssVar: '--paragraph-foreground'
        }
      ]
    },
    {
      name: 'Boton Primario',
      colors: [
        {
          name: 'Relleno',
          value: "#0891b2",
          cssVar: '--primary-button'
        },
        {
          name: 'Texto',
          value: "#fafafa",
          cssVar: '--primary-button-foreground'
        },
        {
          name: 'Cursor',
          value: "#0e7490",
          cssVar: '--primary-button-hover'
        },
        {
          name: 'Click',
          value: "#a5f3fc",
          cssVar: '--primary-button-ring'
        },
      ]
    },
    {
      name: 'Boton Secundario',
      colors: [
        {
          name: 'Relleno',
          value: "#fafafa",
          cssVar: '--secondary-button'
        },
        {
          name: 'Texto',
          value: "#083344",
          cssVar: '--secondary-button-foreground'
        },
        {
          name: 'Cursor',
          value: "#e2e8f0",
          cssVar: '--secondary-button-hover'
        },
        {
          name: 'Click',
          value: "#e2e8f0",
          cssVar: '--secondary-button-ring'
        },
      ]
    },
    {
      name: 'General',
      colors: [
        {
          name: 'Iconos Primario',
          value: "#0891b2",
          cssVar: '--primary-icon'
        },
        {
          name: 'Iconos Secundario',
          value: "#fafafa",
          cssVar: '--secondary-icon'
        },
        {
          name: 'Caso de éxito',
          value: "#10b981",
          cssVar: '--success'
        },
        {
          name: 'Caso de error',
          value: "#f87171",
          cssVar: '--destructive'
        },
      ]
    }
  ]
}