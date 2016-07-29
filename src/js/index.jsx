/*Create a simple mockup of an email reader which uses React Router to handle
routing. The app should have a sidebar which allows you to navigate between
the inbox and the spam folder. Clicking on these should take you to a /inbox
 or /spam route. Each of the /inbox and /spam routes should display a list of
 emails. Clicking on an email should take you to a /email/:emailId route,
  which displays the email contents.*/

const React = require( 'react' );
const ReactDOM = require( 'react-dom' );

const router = require( 'react-router' );
const Router = router.Router;
const Route = router.Route;
const hashHistory = router.hashHistory;

const IndexRoute = router.IndexRoute;
const Link = router.Link;

const INBOX = {
  0: {
    id: 0,
    from: 'billg@microsoft.com',
    to: 'TeamWoz@Woz.org',
    title: 'Possible work opportunity',
    content: 'Dear Woz.  Fancy a job at Mister Softee?  Bill x'
  },
  1: {
    id: 1,
    from: 'zuck@facebook.com',
    to: 'TeamWoz@Woz.org',
    title: 'Do you know PHP?',
    content: 'Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x'
  }
};

const SPAM = {
  0: {
    id: 0,
    from: 'ChEaPFl1ghTZ@hotmail.com',
    to: 'TeamWoz@Woz.org',
    title: 'WaNt CHEEp FlitZ',
    content: 'Theyre CheEp'
  },
  1: {
    id: 1,
    from: 'NiKEAIRJordanZ@hotmail.com',
    to: 'TeamWoz@Woz.org',
    title: 'JorDanz For SAle',
    content: 'Theyre REELY CheEp'
  }
};

const Email = function (props) {
  return (
    <div>
      <p>From: {props.from}</p>
      <p>To: {props.to}</p>
      <p>Title: {props.title}</p>
      <p>Content: {props.content}</p>
    </div>
  );
};

const EmailLink = function( props ) {
  return (
    <div>
      <Link to={'/inbox/' + props.id}>
        {props.from} - {props.title}
      </Link>
    </div>
  );
};

const EmailFolder = function( props ) {
  const emails = Object.keys( props.emails ).map( function( emailId, index ) {
    const email = props.emails[ emailId ];
    return (
      <li key={index}>
        <EmailLink id={email.id} from={email.from} title={email.title} />
      </li>
    );
  } );
  return (
    <ul>
      {emails}
    </ul>
  );
};

const Inbox = function() {
  return <EmailFolder emails={INBOX} />;
};

const SpamCan = function() {
  return <EmailFolder emails={SPAM} />;
};

const App = function( props ) {
  console.log('working');
  return (
    <div>
      <h1>
        Emails App
      </h1>
      <div>
        <Link to={'/inbox/'}>
          Inbox
        </Link><br></br>
        <Link to={'/spam/'}>
          Spam
        </Link>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );
};

const InboxEmailContainer = function(props) {
  console.log('hello');
  var email = INBOX[props.params.emailId];
  return (
    <Email from={email.from} to={email.to} title={email.title}
    content={email.content} />
  );
};

const SpamEmailContainer = function(props) {
  var email = SPAM[props.params.emailId];
  return (
    <Email from={email.from} to={email.to} title={email.title}
    content={email.content} />
  );
};

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={ App }>
      <Route path="/inbox">
        <IndexRoute component={Inbox}/>
        <Route path=":emailId" component={InboxEmailContainer} />
      </Route>
      <Route path="/spam" component={SpamCan} />
        {/* <Route path=":emailId" component={SpamEmailContainer} /> */}
    </Route>
  </Router>
);

document.addEventListener( 'DOMContentLoaded', function() {
  ReactDOM.render( routes, document.getElementById( 'app' ) );
} );

// const Sidebar = function( props ) {
//   return (

//   );
// }
