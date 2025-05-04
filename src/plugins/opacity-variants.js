/**
 * Plugin para Tailwind CSS que agrega soporte para la sintaxis de fracciones (bg-black/75)
 * en las clases de colores que fue eliminada en Tailwind v4
 */

export default function opacityVariantsPlugin({ addUtilities, matchUtilities, theme }) {
  // Valores de opacidad comunes
  const opacityValues = {
    '10': '0.1',
    '20': '0.2',
    '30': '0.3',
    '40': '0.4',
    '50': '0.5',
    '60': '0.6',
    '70': '0.7',
    '75': '0.75',
    '80': '0.8',
    '90': '0.9',
    '95': '0.95',
  };

  // Colores base que queremos soportar con la sintaxis de fracciones
  const colors = {
    'black': '#000',
    'white': '#fff',
    'transparent': 'transparent',
    'blue': '#3b82f6',
    'gray': '#6b7280',
    'red': '#ef4444',
    'green': '#10b981',
    'yellow': '#f59e0b',
    'purple': '#8b5cf6',
    ...theme('colors', {})
  };

  // Crear utilidades de fondo con opacidad
  matchUtilities(
    {
      'bg': (value) => {
        return {
          'background-color': value,
        };
      },
    },
    { values: colors }
  );

  // Para cada color, crear utilidades con la sintaxis de opacidad
  Object.entries(colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'string' && colorValue !== 'transparent') {
      Object.entries(opacityValues).forEach(([opacityKey, opacityValue]) => {
        addUtilities({
          [`.bg-${colorName}-opacity-${opacityKey}`]: {
            'background-color': `rgba(${simpleHexToRgb(colorValue)}, ${opacityValue})`,
          },
          [`.text-${colorName}-opacity-${opacityKey}`]: {
            'color': `rgba(${simpleHexToRgb(colorValue)}, ${opacityValue})`,
          },
          [`.border-${colorName}-opacity-${opacityKey}`]: {
            'border-color': `rgba(${simpleHexToRgb(colorValue)}, ${opacityValue})`,
          }
        });
      });
    }
  });
};

// Función auxiliar para convertir colores HEX a RGB - versión simple para SSR
function simpleHexToRgb(hex) {
  if (!hex.startsWith('#')) {
    // Valores por defecto para colores conocidos
    const colorMap = {
      'black': '0, 0, 0',
      'white': '255, 255, 255',
      'transparent': '0, 0, 0',
      'blue': '59, 130, 246',
      'gray': '107, 114, 128',
      'red': '239, 68, 68',
      'green': '16, 185, 129',
      'yellow': '245, 158, 11',
      'purple': '139, 92, 246',
    };
    
    return colorMap[hex] || '0, 0, 0';
  }
  
  // Remover el símbolo # si existe
  hex = hex.replace('#', '');
  
  // Convertir hex a rgb
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
} 