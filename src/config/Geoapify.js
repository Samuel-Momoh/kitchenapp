const AutoComplete = (search) =>{
    const options = {
        method: 'GET',
        url: 'https://api.geoapify.com/v1/geocode/autocomplete',
        params: {text: 'Mosco',apiKey: '0b36eb9c56594effbdb9e3fac70ece9f'},
        headers: { }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
}

export default AutoComplete;