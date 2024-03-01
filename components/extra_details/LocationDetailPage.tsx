import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LocationDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Change locationId to id
  const [locationDetails, setLocationDetails] = useState<any>({});

  useEffect(() => {
    // Fetch the details for the specific location using id
    const fetchLocationDetails = async () => {
      if (id) {
        const api = `https://rickandmortyapi.com/api/character/${id}`;
        const data = await fetch(api).then((res) => res.json());
        setLocationDetails(data);
      }
    };

    fetchLocationDetails();
  }, [id]);

  return (
    <div>
      <h1>Location Details</h1>
      {/* Display locationDetails information as needed */}
      {/* Example: */}
      <p>Name: {locationDetails.name}</p>
      <p>Dimension: {locationDetails.dimension}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default LocationDetailPage;
