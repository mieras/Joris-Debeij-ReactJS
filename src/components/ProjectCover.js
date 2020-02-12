// Import Defaults
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

// Import Prismic
import {RichText} from 'prismic-reactjs';

// Import Custom Components
import Loader from './Loader';

// EventHandlers
const handleClick = (history, location) => {
  // Go to a new page
  return history.push(location);
};

// Component: ProjectCover
const ProjectCover = ({...props}) => {
  let history = useHistory(); // Set history for EventHandler

  // States
  const [loaded, setLoaded] = useState(false);
  // Descructure
  const {id, slug, video, title, fallback, preload} = props;

  // Set vars
  const permaLink = `/project/${slug}`;
  const permaLinkInfo = `/project/${slug}/info`;
  const videoSource = video.url;
  const titleText = RichText.asText(title);
  const fallbackSource = fallback.url;
  const preloadSource = preload.url;

  return (
    <div className={`project--item project--item__${slug}`}>
      <div className="overlay">
        <div className="overlay--content">
          {titleText && (
            <h2 className="overlay--title">
              <Link to={permaLink}>{titleText}</Link>
            </h2>
          )}
          <div className="overlay--controls">
            <Link to={permaLink} className="control--play">
              Play
            </Link>
            <Link to={permaLinkInfo} className="control--info">
              Info
            </Link>
          </div>
        </div>
      </div>
      {videoSource ? (
        <div className={`video ${loaded ? 'is-loaded' : 'loading'}`}>
          <video
            poster={fallbackSource}
            className="video--player"
            playsInline
            // autoPlay
            muted
            loop
            src={videoSource}
            onLoadedData={() => setLoaded(true)}
          />
        </div>
      ) : (
        <div className="video is-loaded is-unavailable"></div>
      )}
      {videoSource && <Loader loaded={loaded} />}

      {preloadSource && (
        <div className="preload">
          <img className="preload--image" src={preloadSource} />
        </div>
      )}
    </div>
  );
};

// Export: ProjectCover
export default ProjectCover;
