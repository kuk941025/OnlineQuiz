import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import AdminTestLayout from './components/admin_test/AdminTestLayout'
import EditQuestion from './components/admin_test/EditQuestion'
import Container from '@material-ui/core/Container'
import UserAuth from './components/auth/UserAuth'
import UserLayout from './components/user/UserLayout'
import UserSignUp from './components/auth/UserSignUp'
import ResultList from './components/result/ResultList'
import Result from './components/result/Result'
import ImmediateResult from './components/admin_test/ImmediateResult'

function App() {
  return (
    <BrowserRouter>
      <div className="App">


        <Container maxWidth="sm">
          <Switch>
            <Route exact path="/join" component={UserLayout} />
            <Route path="/test/:id" component={UserLayout} />
            <Route exact path="/sign_up" component={UserSignUp} />
            <Route exact path="/" component={UserAuth} />
            <Route exact path="/admin" component={AdminLayout} />
            <Route path="/admin/test/:test_id/question/:question_id" component={EditQuestion} />
            <Route path="/admin/test/:id" component={AdminTestLayout} />
            <Route path="/view_result/:test_id/:question_id" component={ImmediateResult} />
          </Switch>
        </Container>

        <Switch>
          <Route path="/results/:test_id/:result_id" component={Result} />
          <Route path="/results/:test_id" component={ResultList} />
        </Switch>


      </div>
    </BrowserRouter>
  );
}

export default App;
