import React, {useState, useEffect, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Transition, TransitionGroup} from 'react-transition-group';
import {play, exit} from './timelines';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {apiEndpoint} from './prismic-configuration';
import {Home, Projects, Project, Preview, NotFound, Page} from './pages';

/**
 * Main application componenet
 */

const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
const repoName = repoNameArray[1];

const App = () => {
  const [readyToRock, setReadyToRock] = useState(false);

  useEffect(() => {
    console.log('readyToRock', readyToRock);
    setReadyToRock(true);
  }, []);

  if (readyToRock) {
    console.log('readyToRock', readyToRock);
    return (
      <Fragment>
        {/* Load Prismic JS */}
        <Helmet>
          <script
            async
            defer
            src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`}
          />
        </Helmet>

        {/* Route Pages / Views */}
        <BrowserRouter>
          <Route
            render={({location}) => {
              const {pathname, key} = location;
              return (
                <TransitionGroup component={null}>
                  <Transition
                    key={key}
                    appear={true}
                    onEnter={(node, appears) => play(pathname, node, appears)}
                    onExit={(node, appears) => exit(node, appears)}
                    timeout={{enter: 750, exit: 150}}
                  >
                    {state => (
                      <div className={`aniWrapper ${state}`}>
                        <Switch location={location}>
                          <Redirect exact from="/" to="/home" />
                          <Route exact path="/home" component={Home} />
                          <Route path="/preview" component={Preview} />
                          <Route path="/page/:uid" component={Page} />
                          <Route path="/projects/:uid" component={Projects} />
                          <Route path="/project/:uid" component={Project} />
                          <Route path="/project/:uid/info" component={Project} />
                          <Route component={NotFound} />
                        </Switch>
                      </div>
                    )}
                  </Transition>
                </TransitionGroup>
              );
            }}
          />
        </BrowserRouter>
      </Fragment>
    );
  } else {
    return null;
  }
};

export default App;
