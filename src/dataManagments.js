
export const getData = async (projectName) => {
    try {
      const dataModule = await import(`./data-massions/${projectName}`);
      return dataModule.default || [];
    } catch (error) {
      console.error(`Error loading data for project ${projectName}:`, error);
      return [];
    }
  };
  