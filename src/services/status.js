export default httpClient => ({
  get: async () => {
    const response = await httpClient.get('/status')
    return {
      data: response.data
    }
  },  
})