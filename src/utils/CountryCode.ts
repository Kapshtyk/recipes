import { iso31661 } from 'iso-3166'

export function getCountryCode(countryName: string) {
  const result = iso31661.find(
    (country) =>
      country.name.toLocaleLowerCase() === countryName.toLocaleLowerCase()
  )
  return result ? result.alpha2 : 'US'
}
