export default class {
  private API_KEY = 'XXXXXXXXX'
  private API_CX?: string

  public constructor(init: { apiKey: string; cx?: string }) {
    console.log(init)
    this.API_KEY = init.apiKey
    this.API_CX = init?.cx
  }

  public search(q: string) {
    const url = new URL(`https://www.googleapis.com/customsearch/v1`)
    const searchParams = new URLSearchParams(url.searchParams)

    searchParams.append('q', q)
    searchParams.append('key', this.API_KEY)
    if (this.API_CX) searchParams.append('cx', this.API_CX)

    return new Promise((resolve, reject) => {
      fetch(`${url.toString()}?${searchParams.toString()}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then((res) => resolve(res.json()))
        .catch((reason) => {
          console.error(reason)
          reject(reason)
        })
    })
  }
}
