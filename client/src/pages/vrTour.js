import React, { useEffect, useState } from "react";
import "aframe";
import 'aframe-extras';
import axios from "axios";
/* global AFRAME */

const VRTour = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [infoPosition, setInfoPosition] = useState("0 2 -2");
  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => {
  document.title = "VRTour";
}, []);


  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    if (showWelcome) {
      speak("Welcome to the Virtual Herbal Garden. Click on the Start button to begin the VR tour.");
    }
  }, [showWelcome]);

  // Register a custom A-Frame component only once
  useEffect(() => {
    if (!AFRAME.components["plant-click-handler"]) {
      AFRAME.registerComponent("plant-click-handler", {
        init: function () {
          this.el.addEventListener("click", () => {
            const plantData = JSON.parse(this.el.getAttribute("data-plant") || "{}");
            const position = this.el.object3D?.position;
            if (position) {
              moveToPlant(plantData, position);
              speakPlantDetails(plantData);
            }
          });
        },
      });
    }
  }, []);
  useEffect(() => {
    const exitButton = document.querySelector("#exitButton");
    if (exitButton) {
      const handleExit = () => {
        window.location.href = "/";
      };
      exitButton.addEventListener("click", handleExit);
  
      // Cleanup
      return () => exitButton.removeEventListener("click", handleExit);
    }
  }, [showWelcome]);
 

  useEffect(() => {
    const closeButton = document.querySelector("#closeButton");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        // Stop current narration
        speechSynthesis.cancel();
        setSelectedPlant(null);
  
        const bgAudio = document.querySelector("#bgAudio");
        const bgMusic = document.querySelector("#bgMusic");
  
        // Resume HTML audio
        if (bgAudio) {
          bgAudio.play().then(() => {
            console.log("▶️ HTML audio resumed on close");
          }).catch(err => {
            console.error("🚫 Could not resume HTML audio:", err);
          });
        }
  
        // Resume A-Frame sound
        if (bgMusic?.components?.sound) {
          bgMusic.components.sound.playSound();
          
        }
      });
    }
  }, [selectedPlant]);
  

  const fetchPlants = async () => {
    try {
      const { data } = await axios.get("/api/v1/plant/get-plant");
      setPlants(data?.plants || []);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const moveToPlant = (plant, position) => {
    if (!position || typeof position.x === "undefined") {
     
      return;
    }

    const { x, z } = position;
    const rig = document.querySelector("#rig");
    if (rig) {
      rig.setAttribute("position", `${x} 1.6 ${z + 3}`);
    }

    setSelectedPlant(plant);
    setInfoPosition(`${x} 2 ${z + 9}`);
  };

  

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
  
    const musicEntity = document.querySelector("#bgMusic");
  
    // Pause music when narration starts
    utterance.onstart = () => {
      if (musicEntity && musicEntity.components?.sound?.isPlaying) {
        musicEntity.components.sound.stopSound();
        
      }
    };
  
    // Resume music when narration ends
    utterance.onend = () => {
      if (musicEntity && !musicEntity.components?.sound?.isPlaying) {
        musicEntity.components.sound.playSound();
        
      }
    };
  
    speechSynthesis.speak(utterance);
  };
  


  const speakPlantDetails = (plant) => {
    const bgAudio = document.querySelector("#bgAudio");
    const bgMusic = document.querySelector("#bgMusic");
  
    // Pause background music
    if (bgMusic?.components?.sound) {
      bgMusic.components.sound.pauseSound(); // <-- Important: Pause the A-Frame sound component
      
    }
    if (bgAudio) {
      bgAudio.pause(); // <-- Also pause the HTML element itself
  
    }
  
    const text = `Name: ${plant.name}. Botanical Name: ${plant.botanicalName}.  Description: ${plant.physicalDescription} . Habitat: ${plant.habitat}. Medicinal Uses: ${plant.medicinalUses}. Cultivation:${plant.cultivationMethods}. chemical composition: ${plant.chemicalComposition}. pharmocological effects : ${plant.pharmacologicalEffects}. clinical studies: ${plant.clinicalStudies}. safety precautions: ${plant.safetyPrecautions}. sources: ${plant.sources}. category:${plant.category.name}`;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
  
    utterance.onend = () => {
      // Resume music after speech ends
      if (bgAudio) {
        bgAudio.play().then(() => {
          console.log("▶️ HTML audio resumed after narration");
        }).catch(err => {
          console.error("🚫 Couldn't resume HTML audio:", err);
        });
      }
      if (bgMusic?.components?.sound) {
        bgMusic.components.sound.playSound();
        
      }
    };
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };
  

  
  useEffect(() => {
    if (!showWelcome) {
      speak("Click on any plant to hear and see its details. Click on exit button to return to the home page. Use W A S D keys for navigation");
  
      const tryPlaySound = () => {
        const musicEntity = document.querySelector("#bgMusic");
      
        if (musicEntity && musicEntity.components.sound) {
         
      
          // Directly play the sound
          musicEntity.components.sound.playSound();
      
          // Also trigger native HTML audio element to check if it's loaded
          const audio = document.querySelector("#bgAudio");
          if (audio) {
            
            audio.play().then(() => {
              console.log("✅ HTML audio playing successfully");
            }).catch(err => {
              console.error("🚫 Error playing HTML audio:", err);
            });
          }
        } else {
          console.warn("⚠️ bgMusic or sound component not found yet");
        }
      };
      
      
  
      const scene = document.querySelector("a-scene");


if (scene?.hasLoaded) {
  
  tryPlaySound();
} else {
 
  scene?.addEventListener("loaded", tryPlaySound);
}

    }
  }, [showWelcome]);
  

  const startTour = () => {
    setShowWelcome(false);
  
    const tryPlayMusic = () => {
      const musicEntity = document.querySelector("#bgMusic");
      if (musicEntity && musicEntity.components && musicEntity.components.sound) {
        musicEntity.components.sound.playSound();
      
      } else {
        
        setTimeout(tryPlayMusic, 100); // Retry after 100ms
      }
    };
  
    tryPlayMusic();
  };
  
  
  


  if (showWelcome) {
    return (
      <div
        style={{
          backgroundImage: 'url("/assets/forest.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 0,
          }}
        />
        <div style={{ zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem' }}>
            Welcome to the Virtual Herbal Garden
          </h1>
          <button
            onClick={startTour}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              marginTop: '20px',
              cursor: 'pointer',
            }}
          >
            Start Tour
          </button>
        </div>
      </div>
    );
  }

  return (
    <a-scene cursor="rayOrigin: mouse">
      <a-assets>
  <audio id="bgAudio" src="/assets/vr.mp3" preload="auto"  />
</a-assets>

<a-entity
  id="bgMusic"
  sound="src: #bgAudio; autoplay: false; loop: true; volume: 0.5"
></a-entity>


<a-sky src="/assets/ok.jpg" rotation="0 -130 0"></a-sky>

<a-plane 
  position="0 0 0" 
  rotation="-90 0 0" 
  width="200" 
  height="100" 
  material="src: url(/assets/ro.jpg); repeat: 10 10" 
></a-plane>


      
<a-entity id="rig" movement-controls>
  <a-camera position="0 1.6 5" raycaster="objects: .clickable">
    
   
    <a-entity position="0 -0.8 -1.1"> 
      <a-plane
        id="exitButton"
        width="0.2"
        height="0.1"
        color="red"
        class="clickable"
        material="opacity: 0.9; transparent: true"
      >
        <a-text value="Exit" color="white" align="center" position="0 0.03 0.03"  scale="0.3 0.3 0.3"></a-text>
      </a-plane>
    </a-entity>

  </a-camera>
</a-entity>


      {/* Render Plants */}
      {plants.map((plant, index) => {
        const position = {
          x: -15 + (index % 5) * 20,
          y: 0,
          z: -10 - Math.floor(index / 5) * 20,
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
            plant-click-handler
          ></a-entity>
        );
      })}

      {/* Plant Info Panel */}
      {selectedPlant && (
        <a-plane id="plantInfo" position={infoPosition} width="8" height="10" color="purple" opacity="1">
          <a-entity position="-3.4 1 0.1">
            <a-text value="Name: " color="yellow" position="0 3.5 0" width="5" align="left" />
            <a-text value={selectedPlant.name} color="white" position="1 3.5 0" width="5" align="left" />
            <a-text value="Botanical Name: " color="yellow" position="0 3 0" width="5" align="left" />
            <a-text value={selectedPlant.botanicalName} color="white" position="1.8 3 0" width="5" align="left" />
            <a-text value="Description: " color="yellow" position="0 2.5 0" width="5" align="left" />
            <a-text value={selectedPlant.physicalDescription} color="white" position="1.5 2.5 0" width="5" align="left" />
            <a-text value="Habitat: " color="yellow" position="0 2 0" width="5" align="left" />
            <a-text value={selectedPlant.habitat} color="white" position="1 2 0" width="5" align="left" />
            <a-text value="Medicinal Uses: " color="yellow" position="0 1.5 0" width="5" align="left" />
            <a-text value={selectedPlant.medicinalUses} color="white" position="1.8 1.5 0" width="5" align="left" />
            <a-text value="Cultivation: " color="yellow" position="0 1 0" width="5" align="left" />
            <a-text value={selectedPlant.cultivationMethods} color="white" position="1.5 1 0" width="5" align="left" />
            <a-text value="Chemical Composition: " color="yellow" position="0 0.5 0" width="5" align="left" />
            <a-text value={selectedPlant.chemicalComposition} color="white" position="2.5 0.5 0" width="5" align="left" />
            <a-text value="Pharmacological Effects: " color="yellow" position="0 0 0" width="5" align="left" />
            <a-text value={selectedPlant.pharmacologicalEffects} color="white" position="2.5 0 0" width="5" align="left" />
            <a-text value="Clinical Studies: " color="yellow" position="0 -0.5 0" width="5" align="left" />
            <a-text value={selectedPlant.clinicalStudies} color="white" position="1.8 -0.5 0" width="5" align="left" />
            <a-text value="Safety Precautions: " color="yellow" position="0 -1 0" width="5" align="left" />
            <a-text value={selectedPlant.safetyPrecautions} color="white" position="2 -1 0" width="5" align="left" />
            <a-text value="Sources: " color="yellow" position="0 -1.5 0" width="5" align="left" />
            <a-text value={selectedPlant.sources} color="white" position="1 -1.5 0" width="5" align="left" />
            <a-text value="Category: " color="yellow" position="0 -2 0" width="5" align="left" />
            <a-text value={selectedPlant?.category?.name} color="white" position="1 -2 0" width="5" align="left" />
          </a-entity>

          <a-plane
            id="closeButton"
            position="3.5 4.5 0"
            width="0.5"
            height="0.5"
            color="red"
            class="clickable"
            material="opacity: 0.9; transparent: true"
          >
            <a-text value="X" color="white" position="-0.15 0.15 0" scale="1.5 1.5 1" />
          </a-plane>
        </a-plane>
      )}
    </a-scene>
  );
};

export default VRTour;