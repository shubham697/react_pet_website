import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// importing all the pages
import HomePage from "../pages/HomePage";
import AboutUsPage from '../pages/AboutPage';
import contact from '../pages/ContactPage';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import ComingSoon from '../pages/ComingSoonPage';
import CreatePetPage from '../components/Pets/PetCreationJourneyPage/PetCreationPage';
import VerificationPage from '../pages/VerificationPage';
import OwnerPetsPage from '../pages/OwnerPetsPage';
import PetDetailsPage from '../pages/PetDetalsPage';
import DiscoveryPage from '../pages/DiscoveryPage';
import OwnerEditPetPage from '../pages/OwnerEditPetPage';
import OwnerProfileEditPage from '../pages/OwnerProfileEditPage';
import OwnerProfilePage from '../pages/OwnerProfilePage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import SetPasswordPage from '../pages/SetPasswordPage';
import NotificationsPage from '../pages/NotificationsPage';
import TermsOfUsePage from '../pages/TermsOfUsePage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';


//Loading Stores
import loadingStore from "../stores/loadingStore"
import LoadingOverlay from 'react-loading-overlay';

export default class Routes extends React.PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      isActive: (loadingStore.getLoading().message != null),
      loadingObject: loadingStore.getLoading()
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    loadingStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    loadingStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      loadingObject: loadingStore.getLoading(),
      isActive: (loadingStore.getLoading().message != null)
    });
  }

  render() {
    return (
      <React.Fragment>
        {/*<LoadingOverlay
          active={this.state.isActive}
          spinner
          text={this.state.loadingObject.message}
          styles={{ maxHeight: "100%" }}
        >*/}
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/about-us" component={AboutUsPage} />
            <Route exact path="/discover" component={DiscoveryPage} />
            <Route exact path="/contact" component={contact} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/createpet" component={CreatePetPage} />
            <Route exact path="/owner/pets" component={OwnerPetsPage} />
            <Route exact path="/owner/editpet/:id" component={OwnerEditPetPage} />
            <Route exact path="/viewpet/:id" component={PetDetailsPage} />
            <Route exact path="/owner/profile/view" component={OwnerProfilePage} />
            <Route exact path="/owner/profile/edit" component={OwnerProfileEditPage} />
            <Route exact path="/owner/verify/:token" component={VerificationPage} />
            <Route exact path="/owner/logout" component={LogoutPage} />
            <Route exact path="/resetpassword" component={ResetPasswordPage} />
            <Route exact path="/owner/resetpw/:token" component={SetPasswordPage} />
            <Route exact path="/owner/notifications" component={NotificationsPage} />
            <Route exact path="/termsofuse" component={TermsOfUsePage} />
            <Route exact path="/privacypolicy" component={PrivacyPolicyPage} />
          </Switch>
        </Router>
        {/*</LoadingOverlay>*/}
      </React.Fragment>
    );
  }
}
