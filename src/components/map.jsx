import { VectorMap } from '@south-paw/react-vector-maps';
import React, { useState } from 'react';
import s from './map.module.scss';

import iceland from '../lib/invis1670final.json';


export function Map() {
    const [current, setCurrent] = useState(null);
    const [generatingObject, setGeneratingObject] = useState(null);
  
    const layerProps = {
      onMouseEnter: ({ target }) => setCurrent(target.attributes.name.value.toLowerCase()),
      onMouseLeave: ({ target }) => setCurrent('None'),
      // onFocus: ({ target }) => setFocused(target.attributes.name.value),
      // onBlur: ({ target }) => setFocused('None'),
      // onClick: ({ target }) => setClicked(target.attributes.name.value),
    };

    function onEnter(event) {
      const object = event.target.innerText.toLowerCase();
      // event.target.style.backgroundColor = 'LIGHTGRAY';
      setCurrent(object)
    }

    function onLeave(event) {
      // event.target.style.backgroundColor = 'WHITE';
      setCurrent(null);
    }

    function objectClasses(objectId) {
      if (current === objectId) {
        return s.interactables__currentObject
      }
      return s.interactables__object;
    }

    const objectClass = current;
    console.log(objectClass)
  
    return (
      <div className={s.container}>
        <div className={s.mapContainer}>
          <div className={s.map}>
            <div>
              <VectorMap {...iceland} layerProps={layerProps} currentLayers={[current]} />
            </div>
          </div>
          <img alt='map details' src='https://notendur.hi.is/hkh32/skalholtTMP/1670%20map.svg'
                  className={s.image}/>
        </div>

        <div className={s.interactables}>
          <ul>
            {iceland.layers.map((value) => {
              if (value.id === objectClass) {
                return <li className={s.interactables__currentObject} key={value.id} onMouseEnter={onEnter} onMouseLeave={onLeave}>{value.id.toUpperCase()}</li>
              }
              return <li className={s.interactables__object} key={value.id} onMouseEnter={onEnter} onMouseLeave={onLeave}>{value.id.toUpperCase()}</li>
            })}
          </ul>
        </div>
      </div>
    );
  }