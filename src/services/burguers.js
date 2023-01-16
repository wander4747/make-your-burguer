const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export default httpClient => ({
  store: async(data) => {
    const response = await httpClient.post('/burgers', data, {headers})
    return { data: response.data }
  },
})