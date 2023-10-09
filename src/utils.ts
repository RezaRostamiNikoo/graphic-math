let digits = 3

export function setDigitNumber(dn: number = 3) { digits = dn }

export const f = (value: any) => {
    if (typeof value === "number") return Number(Number(value).toFixed(digits).replace('-0', '0'))
    if (Array.isArray(value)) return value.map(n => Number(Number(n).toFixed(digits).replace('-0', '0')))
    return undefined
}