import cloneDeep from "lodash/cloneDeep";

/**
 * @return {Boolean}
 */
export const isMobile = () => {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
}

/**
 * @param {number} ms
 * @return {Promise<void>}
 */
export const sleep = (ms) => {
  return new Promise((res) => setTimeout(res, ms))
}

export const cleanObj = (obj) => {
  // Remove null value in clone buffer
  let cloneBuffer = cloneDeep(obj)
  for(let i in cloneBuffer) {
    if(cloneBuffer.hasOwnProperty(i) && cloneBuffer[i] === null)
      delete cloneBuffer[i]
  }
  return cloneBuffer
}

/**
 * @param {number} val
 * @param {Object|null} params
 * @param {number|null} [params.place = 2]
 */
export const toCurrencyFormat = (val, params= { place: 2 }) => {
    const formatter = new Intl.NumberFormat('en', { minimumFractionDigits: params.place });
    return formatter.format(val);
}

export const i18nField = (name, initValue) => {
  let locales = ['en', 'zh_hk', 'zh_cn']
  return locales.reduce((acc, item) => {
    acc[`${name}_${item}`] = initValue
    return acc
  }, {})
}
