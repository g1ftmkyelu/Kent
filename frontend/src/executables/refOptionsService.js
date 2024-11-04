import axios from 'axios';
import { Resources } from "../data/resources";

const refOptionsService = {
  async getRefOptions(resourceName, fieldName, idFilters) {
    try {
      const resource = Resources.find((r) => r.name === resourceName);

      // Construct the base URL
      let url = `${import.meta.env.VITE_APP_API_URL}/api/v1/${resource.name}?limit=1000`;

      // If idFilters are provided, add them to the URL
      if (idFilters && Array.isArray(idFilters) && idFilters.length > 0) {
        const filterParams = idFilters
          .map(filter => `idFilters[${encodeURIComponent(filter.name)}]=${encodeURIComponent(filter.value)}`)
          .join("&");
        url += `&${filterParams}`;
      }

      console.log(url,'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

      const response = await axios.get(url);
      const options = response.data;
      const processedOptions = options.data.map((option) => ({
        id: option.id,
        name: option[fieldName],
      }));
      
      console.log(processedOptions);
      return processedOptions;

    } catch (error) {
      console.error(`Error fetching ref options for ${resourceName}.${fieldName}:`, error);
      throw error;
    }
  },
};

export default refOptionsService;
