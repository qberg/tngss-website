import React, { useEffect, useState } from 'react';
import '../asset/css/style.css';
import speakerImage from '../asset/img/image.png'; // Replace with actual path
import { unAuthFetch } from '../util/Api';

const SpeakersList = () => {

  const [speakerData, setSpeakerData] = useState({});

  const fetchSpeaker = async () => {
    let response = await unAuthFetch('event-service/v1/speakers/find-all');
    setSpeakerData(response?.data)
  }

  useEffect(() => {
    fetchSpeaker()
  }, [])

  return (
    <section className="speakers-section">
      {
        speakerData?.speakers_management?.map((data) => {
          return (
            <div className="speaker-card">
              <div className="card-inner">
                <div className="card-front">
                  <img src={data?.profile_image} alt="Tim Draper" className="speaker-img" />
                  <div className="speaker-info">
                    <h3>{data?.name}</h3>
                    <p>{data?.designation}</p>
                  </div>
                </div>
                <div className="card-back">
                  <p>
                    {
                      data?.bio
                    }
                  </p>
                </div>
              </div>
            </div>
          )
        })
      }

    </section>
  );
};

export default SpeakersList;
