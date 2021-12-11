const colors = {
  2: {
    bg: '#eee4da',
    text: '#776f67',
  },
  4: {
    bg: '#ede0c8',
    text: '#776e65',
  },
  8: {
    bg: '#f2b179',
    text: '#f9f6f2',
  },
  16: {
    bg: '#f59563',
    text: '#f9f6f2',
  },
  32: {
    bg: '#f67c5f',
    text: '#f9f6f2',
  },
  64: {
    bg: '#f65e3b',
    text: '#f9f6f2',
  },
  128: {
    bg: '#edcf72',
    text: '#f9f6f2',
  },
  256: {
    bg: '#edcc61',
    text: '#f9f6f2',
  },
  512: {
    bg: '#edc850',
    text: '#f9f6f2',
  },
  1024: {
    bg: '#edc53f',
    text: '#f9f6f2',
  },
  2048: {
    bg: '#edc22e',
    text: '#f9f6f2',
  },
};

export default (number) => {
  return colors[number] || { bg: '#3e3933', text: '#d9d6d2' };
};
