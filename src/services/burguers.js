const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export default httpClient => ({
  store: async(data) => {
    const response = await httpClient.post('/burgers', data, {headers})
    return { data: response.data }
  },
  patch: async(id, data) => {
    const response = await httpClient.patch(`/burgers/${id}`, data, {headers})
    return { data: response.data }
  },
  delete: async(id) => {
    const response = await httpClient.delete(`/burgers/${id}`)
    return { data: response.data }
  },
})
