export const sizes = ['XS', 'S', 'M', 'L', 'XL'];
export const sizeTitles = {
  'XS': '~3 hours, 200 DAI',
  'S': '~5 hours, 350 DAI',
  'M': '~8 hours, 550 DAI',
  'L': '~13 hours, 900 DAI',
  'XL': '~21 hours, 1400 DAI'
};
export const matchSize = string => string.match(/^size-(\S+)/);
