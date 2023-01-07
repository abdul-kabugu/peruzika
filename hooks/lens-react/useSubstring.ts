// @ts-nocheck
export const truncatetext = (text , max ) => {
    if(text.length <= max) {
      return  text
    }
    return text.slice(0, max) + " " +'...'
  }