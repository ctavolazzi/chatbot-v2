import React, { useEffect, useState } from 'react';

const DogPicture = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      // .then((res) => console.log(res))
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        setImageUrl(data.message);
      });
  }, []);

  return (
    <div>
      <img src={imageUrl} alt='a dog' style={{ width: '100%' }}/>
    </div>
  );
};

export default DogPicture;