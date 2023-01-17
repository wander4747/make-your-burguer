export default httpClient => ({
  get: async () => {
    const response = await httpClient.get('/burgers')
    return {
      data: response.data
    }
  },  
})