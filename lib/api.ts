const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = '/api/ad';

export const createAdvertisement = async (adData: any) => {
 const data = JSON.stringify(adData);
  const response = await fetch(`${API_BASE_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adData),
  });
  return response.json();
};

export const updateAdvertisement = async (adData: any) => {
  const response = await fetch(`${API_BASE_URL}/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adData),
  });
  return response.json();
};

export const deleteAd = async (ad_id: string) => {
  const response = await fetch(`${API_BASE_URL}/delete?ad_id=${ad_id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const publishAd = async (ad_id: string) => {
  const response = await fetch(`${API_BASE_URL}/publish?ad_id=${ad_id}`, {
    method: 'POST',
  });
  return response.json();
};

export const unpublishAd = async (ad_id: string) => {
  const response = await fetch(`${API_BASE_URL}/unpublish?ad_id=${ad_id}`, {
    method: 'POST',
  });
  return response.json();
};


export const fetchAd = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return response.json();
};

export const fetchAds = async () => {
  const response = await fetch(`${API_BASE_URL}/list`);
  return response.json();
};