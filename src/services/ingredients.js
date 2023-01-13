export default httpClient => ({
  get: async () => {
    const response = await httpClient.get('/ingredients')
    return {
      data: response.data
    }
  },  
})