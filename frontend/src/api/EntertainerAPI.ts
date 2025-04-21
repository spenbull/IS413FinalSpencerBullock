import { Summary } from "../types/Summary";
import { entertainer } from "../types/Entertainers";

const API_URL = 'https://is413finalbackend-awene7evfxfmfzg3.eastus-01.azurewebsites.net/Entertainer';

export const fetchEntertainerSummaries = async (): Promise<Summary[]> => {
  try {
    const response = await fetch(`${API_URL}/EntertainerSummaries`);
    if (!response.ok) {
      throw new Error('Failed to fetch entertainer summaries');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching summaries:', error);
    throw error;
  }
};



export const addEntertainer = async (newEntertainer: entertainer): Promise<void> => {
  const response = await fetch(`${API_URL}/AddEntertainer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEntertainer),
  });

  if (!response.ok) {
    throw new Error("Failed to add entertainer");
  }
};

export const fetchEntertainerById = async (id: number): Promise<entertainer> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch entertainer');
    }
    return await response.json();
  };
  
  export const updateEntertainer = async (id: number, updated: entertainer): Promise<void> => {
    const response = await fetch(`${API_URL}/UpdateEntertainer/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updated)
    });
  
    if (!response.ok) {
      throw new Error("Failed to update entertainer");
    }
  };

  export const deleteEntertainer = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteEntertainer/${id}`,
        {
            method: 'DELETE'
        });

        if (!response.ok){
            throw new Error('Failed to delete book');
        }
    } catch (error){
        console.error('Error deleting book:', error);
        throw error;
    }
};