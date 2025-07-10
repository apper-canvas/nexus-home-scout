import mockProperties from "@/services/mockData/properties.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
  async getAll() {
    await delay(300);
    return [...mockProperties];
  },

  async getById(Id) {
    await delay(200);
    const property = mockProperties.find(p => p.Id === Id);
    if (!property) {
      throw new Error(`Property with Id ${Id} not found`);
    }
    return { ...property };
  },

  async create(propertyData) {
    await delay(400);
    const newProperty = {
      ...propertyData,
      Id: Math.max(...mockProperties.map(p => p.Id)) + 1,
      listingDate: new Date().toISOString()
    };
    mockProperties.push(newProperty);
    return { ...newProperty };
  },

  async update(Id, propertyData) {
    await delay(300);
    const index = mockProperties.findIndex(p => p.Id === Id);
    if (index === -1) {
      throw new Error(`Property with Id ${Id} not found`);
    }
    mockProperties[index] = { ...mockProperties[index], ...propertyData };
    return { ...mockProperties[index] };
  },

  async delete(Id) {
    await delay(200);
    const index = mockProperties.findIndex(p => p.Id === Id);
    if (index === -1) {
      throw new Error(`Property with Id ${Id} not found`);
    }
    const deletedProperty = mockProperties.splice(index, 1)[0];
    return { ...deletedProperty };
  }
};