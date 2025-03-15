import React, { useEffect, useState } from "react";
import "aframe";
import axios from "axios";

const VRTour = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [infoPosition, setInfoPosition] = useState("0 2 -2"); // Default position

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    const plantEntities = document.querySelectorAll(".clickable");

    plantEntities.forEach((plantEntity) => {
      plantEntity.addEventListener("click", (event) => {
        const plantData = JSON.parse(event.target.getAttribute("data-plant") || "{}");
        const object3D = event.target.object3D;
        if (object3D) {
          const position = object3D.position;
          moveToPlant(plantData, position);
        } else {
          console.error("Object3D not found for plant:", plantData);
        }
      });
    });

    const closeButton = document.querySelector("#closeButton");
    if (closeButton) {
      closeButton.addEventListener("click", () => setSelectedPlant(null));
    }
  });

  const fetchPlants = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/plant/get-plant`);
      setPlants(data?.plants || []);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const moveToPlant = (plant, position) => {
    if (!position || typeof position.x === "undefined") {
      console.error("Invalid position for plant:", plant);
      return;
    }

    const { x, z } = position;
    const rig = document.querySelector("#rig");
    if (rig) {
      rig.setAttribute("position", `${x} 1.6 ${z + 3}`);
    }

    setSelectedPlant(plant);
    setInfoPosition(`${x} 2 ${z+9}`);
  };

  return (
    <a-scene cursor="rayOrigin: mouse">
      <a-sky color="#87CEEB"></a-sky>
      <a-plane position="0 0 0" rotation="-90 0 0" width="200" height="100" color="#32CD32"></a-plane>
      <a-light type="ambient" color="#FFF"></a-light>
      <a-light type="directional" position="5 10 5" intensity="1"></a-light>

      {/* Camera Rig for Movement */}
      <a-entity id="rig" movement-controls>
        <a-camera position="0 1.6 5" raycaster="objects: .clickable"></a-camera>
      </a-entity>

      {/* Render Plants */}
      {plants.map((plant, index) => {
        const position = {
          x: -15 + (index % 5) * 20, // Increase spacing between columns
          y: 0,
          z: -10 - Math.floor(index / 5) * 20, // Increase spacing between rows
        };

        return (
          <a-entity
            key={plant._id}
            id={plant._id}
            gltf-model={plant.threeDModel?.url}
            position={`${position.x} ${position.y} ${position.z}`}
            scale="5 5 5"
            class="clickable"
            data-plant={JSON.stringify(plant)}
          ></a-entity>
        );
      })}

      {/* Info Panel (Appears Above Selected Plant) */}
      {selectedPlant && (
        <a-plane id="plantInfo" position={infoPosition} width="8" height="10" color="purple" opacity="1">
       
<a-entity position="-3.4 1 0.1">
  {/* Name */}
  <a-text value="Name: " color="yellow" position="0 3.5 0" width="5" align="left"></a-text>
  <a-text value={selectedPlant.name} color="white" position="1 3.5 0" width="5" align="left"></a-text>

  {/* Botanical Name */}
  <a-text value="Botanical Name: " color="yellow" position="0 3 0" width="5" align="left"></a-text>
  <a-text value={selectedPlant.botanicalName} color="white" position="1.8 3 0" width="5" align="left"></a-text>

  {/* Description */}
  <a-text value="Description: " color="yellow" position="0 2.5 0" width="5" align="left"></a-text>
  <a-text value={selectedPlant.physicalDescription} color="white" position="1.5 2.5 0" width="5" align="left"></a-text>

  {/* Habitat */}
  <a-text value="Habitat: " color="yellow" position="0 2 0" width="5" align="left"></a-text>
  <a-text value={selectedPlant.habitat} color="white" position="1 2 0" width="5" align="left"></a-text>

  {/* Medicinal Uses */}
  <a-text value="Medicinal Uses: " color="yellow" position="0 1.5 0" width="5" align="left"></a-text>
  <a-text value={selectedPlant.medicinalUses} color="white" position="1.8 1.5 0" width="5" align="left"></a-text>

  {/* Cultivation */}
  <a-text value="Cultivation: " color="yellow" position="0 1 0" width="5" align="left"></a-text>
  <a-text value={selectedPlant.cultivationMethods} color="white" position="1.5 1 0" width="5" align="left"></a-text>

  {/* Chemical Composition (Increased gap) */}
  <a-text value="Chemical Composition: " color="yellow" position="0 0.5 0" width="5" align="left"></a-text>
  <a-text value={selectedPlant.chemicalComposition} color="white" position="2.5 0.5 0" width="5" align="left"></a-text>

  {/* Pharmacological Effects (Increased gap) */}
  <a-text value="Pharmacological Effects: " color="yellow" position="0 0 0" width="5" align="left"></a-text>
  <a-text value={selectedPlant.pharmacologicalEffects} color="white" position="2.5 0 0" width="5" align="left"></a-text>

  {/* Clinical Studies */}
  <a-text value="Clinical Studies: " color="yellow" position="0 -0.5 0" width="5" align="left"></a-text>
  <a-text value={selectedPlant.clinicalStudies} color="white" position="1.8 -0.5 0" width="5" align="left"></a-text>

  {/* Safety Precautions */}
  <a-text value="Safety Precautions: " color="yellow" position="0 -1 0" width="5" align="left"></a-text>
  <a-text value={selectedPlant.safetyPrecautions} color="white" position="2 -1 0" width="5" align="left"></a-text>

  {/* Sources */}
  <a-text value="Sources: " color="yellow" position="0 -1.5 0" width="5" align="left"></a-text>
  <a-text value={selectedPlant.sources} color="white" position="1 -1.5 0" width="5" align="left"></a-text>

  {/* Category */}
  <a-text value="Category: " color="yellow" position="0 -2 0" width="5" align="left"></a-text>
  <a-text value={selectedPlant?.category?.name} color="white" position="1 -2 0" width="5" align="left"></a-text>
</a-entity>

          <a-plane
  id="closeButton"
  position="3.5 4.5  0"  // Adjusted closer to the top-right corner
  width="0.5" height="0.5"
  color="red"
  class="clickable"
    material="opacity: 0.9; transparent: true"
>
  <a-text value="X" color="white" position="-0.15 0.15 0" scale="1.5 1.5 1"></a-text>
</a-plane>

        </a-plane>
      )}
    </a-scene>
  );
};

export default VRTour;
