module.exports = {
  formatDate: date => {
    return `${new Date(date).getMonth() + 1 } / ${new Date(date).getDate()} /}${new Date(date).getFullYear()}`;
  },

  pluralCheck(word, amount) {
    if (amount !== 1) {
      return `${word}s`
    } else if (!amount) {
      return `0 ${word}s`
    } 
    return word
  }
};