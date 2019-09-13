import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import AdminTestLayout from './components/admin_test/AdminTestLayout'
import EditQuestion from './components/admin_test/EditQuestion'
import Container from '@material-ui/core/Container'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Container maxWidth="md">

          <Switch>
            <Route exact path="/admin" component={AdminLayout} />
            <Route path="/admin/test/:test_id/question/:question_id" component={EditQuestion} />
            <Route path="/admin/test/:id" component={AdminTestLayout} />

          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
