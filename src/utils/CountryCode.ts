import { iso31661 } from 'iso-3166'

export function getCountryCode(countryName: string) {
  console.log(iso31661)
  const result = iso31661.find(
    (country) =>
      country.name.toLocaleLowerCase() === countryName.toLocaleLowerCase()
  )
  return result ? result.alpha2 : 'US'
}

export function getCountries() {
  const data = iso31661.map((country) => {
    return { name: country.name, code: country.alpha2 }
  })
  return data
}
