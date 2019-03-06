import api from '../api'

const geoApi = {
  ...api,

  getLocation() {
    this.opts.baseURI = 'http://ip-api.com/json'
    return this.get(`/`)
  },

  geocodeCity(city) {
    this.opts.baseURI = `https://api-adresse.data.gouv.fr/search`
    return this.get(`/?q=${city}`)
  },

  getReverseGeocoding(lat, lng) {
    this.opts.baseURI = `https://api-adresse.data.gouv.fr/reverse`
    return this.get(`/?lon=${lng}&lat=${lat}`)
  },

  async getLocationData(lat, lng) {
    const {
      body: { features }
    } = await this.getReverseGeocoding(lat, lng)

    if (!features.length) {
      return
    }

    const { city, context } = features[0].properties

    const matches = context.match(/[0-9]{2}, ([^,]+)/i)

    return {
      department: matches[1],
      city
    }
  }
}

export default geoApi
