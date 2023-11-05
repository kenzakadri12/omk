import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './items.css'

// Card component
const Card = ({ title, imageUrl, description }) => (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <div className="container">
        <h4 className="title">{title}</h4>
        <p className="description">{description}</p>
      </div>
    </div>
  );
function OmekaItems() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Adaptez l'URL selon votre configuration Omeka-S
        axios.get('http://localhost/omeka-s/api/items')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error("Erreur de récupération des données:", error);
            });
    }, []);

    return (
        <div className="card-container">
          {items.map(item => (
            <Card
              key={item['o:id']}
              title={item['o:title']}
              imageUrl={item.thumbnail_display_urls.medium}
              description={item['dcterms:description'][0]['@value']}
            />
          ))}
        </div>
      );
}

export default OmekaItems;
