import { toast } from "react-toastify";

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Field mapping from mock data to database schema
const transformToDatabase = (mockData) => {
  return {
    Name: mockData.title || mockData.Name,
    title_c: mockData.title,
    price_c: mockData.price,
    type_c: mockData.type,
    bedrooms_c: mockData.bedrooms,
    bathrooms_c: mockData.bathrooms,
    square_feet_c: mockData.squareFeet,
    address_street_c: mockData.address?.street,
    address_city_c: mockData.address?.city,
    address_state_c: mockData.address?.state,
    address_zip_code_c: mockData.address?.zipCode,
    images_c: Array.isArray(mockData.images) ? mockData.images.join(',') : mockData.images_c,
    description_c: mockData.description,
    features_c: Array.isArray(mockData.features) ? mockData.features.join(',') : mockData.features_c,
    year_built_c: mockData.yearBuilt,
    listing_date_c: mockData.listingDate,
    coordinates_lat_c: mockData.coordinates?.lat,
    coordinates_lng_c: mockData.coordinates?.lng,
    Tags: Array.isArray(mockData.tags) ? mockData.tags.join(',') : mockData.Tags
  };
};

// Field mapping from database to mock data format
const transformFromDatabase = (dbData) => {
  return {
    Id: dbData.Id,
    title: dbData.title_c || dbData.Name,
    price: dbData.price_c,
    type: dbData.type_c,
    bedrooms: dbData.bedrooms_c,
    bathrooms: dbData.bathrooms_c,
    squareFeet: dbData.square_feet_c,
    address: {
      street: dbData.address_street_c,
      city: dbData.address_city_c,
      state: dbData.address_state_c,
      zipCode: dbData.address_zip_code_c
    },
    images: dbData.images_c ? dbData.images_c.split(',') : [],
    description: dbData.description_c,
    features: dbData.features_c ? dbData.features_c.split(',') : [],
    yearBuilt: dbData.year_built_c,
    listingDate: dbData.listing_date_c,
    coordinates: {
      lat: dbData.coordinates_lat_c,
      lng: dbData.coordinates_lng_c
    },
    tags: dbData.Tags ? dbData.Tags.split(',') : []
  };
};

export const propertyService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "address_street_c" } },
          { field: { Name: "address_city_c" } },
          { field: { Name: "address_state_c" } },
          { field: { Name: "address_zip_code_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "coordinates_lat_c" } },
          { field: { Name: "coordinates_lng_c" } },
          { field: { Name: "Tags" } }
        ],
        orderBy: [
          { fieldName: "listing_date_c", sorttype: "DESC" }
        ]
      };

      const response = await apperClient.fetchRecords('property_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data.map(transformFromDatabase);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching properties:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(Id) {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "address_street_c" } },
          { field: { Name: "address_city_c" } },
          { field: { Name: "address_state_c" } },
          { field: { Name: "address_zip_code_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "coordinates_lat_c" } },
          { field: { Name: "coordinates_lng_c" } },
          { field: { Name: "Tags" } }
        ]
      };

      const response = await apperClient.getRecordById('property_c', Id, params);
      
      if (!response || !response.data) {
        return null;
      }

      return transformFromDatabase(response.data);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching property with ID ${Id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(propertyData) {
    try {
      const apperClient = getApperClient();
      const dbData = transformToDatabase(propertyData);
      
      // Only include updateable fields
      const updateableData = {
        Name: dbData.Name,
        title_c: dbData.title_c,
        price_c: dbData.price_c,
        type_c: dbData.type_c,
        bedrooms_c: dbData.bedrooms_c,
        bathrooms_c: dbData.bathrooms_c,
        square_feet_c: dbData.square_feet_c,
        address_street_c: dbData.address_street_c,
        address_city_c: dbData.address_city_c,
        address_state_c: dbData.address_state_c,
        address_zip_code_c: dbData.address_zip_code_c,
        images_c: dbData.images_c,
        description_c: dbData.description_c,
        features_c: dbData.features_c,
        year_built_c: dbData.year_built_c,
        listing_date_c: dbData.listing_date_c,
        coordinates_lat_c: dbData.coordinates_lat_c,
        coordinates_lng_c: dbData.coordinates_lng_c,
        Tags: dbData.Tags
      };

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.createRecord('property_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create property ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? transformFromDatabase(successfulRecords[0].data) : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating property:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(Id, propertyData) {
    try {
      const apperClient = getApperClient();
      const dbData = transformToDatabase(propertyData);
      
      // Only include updateable fields
      const updateableData = {
        Id: Id,
        Name: dbData.Name,
        title_c: dbData.title_c,
        price_c: dbData.price_c,
        type_c: dbData.type_c,
        bedrooms_c: dbData.bedrooms_c,
        bathrooms_c: dbData.bathrooms_c,
        square_feet_c: dbData.square_feet_c,
        address_street_c: dbData.address_street_c,
        address_city_c: dbData.address_city_c,
        address_state_c: dbData.address_state_c,
        address_zip_code_c: dbData.address_zip_code_c,
        images_c: dbData.images_c,
        description_c: dbData.description_c,
        features_c: dbData.features_c,
        year_built_c: dbData.year_built_c,
        listing_date_c: dbData.listing_date_c,
        coordinates_lat_c: dbData.coordinates_lat_c,
        coordinates_lng_c: dbData.coordinates_lng_c,
        Tags: dbData.Tags
      };

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.updateRecord('property_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update property ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? transformFromDatabase(successfulUpdates[0].data) : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating property:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async delete(Id) {
    try {
      const apperClient = getApperClient();
      const params = {
        RecordIds: [Id]
      };

      const response = await apperClient.deleteRecord('property_c', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete property ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting property:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};