import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import AdminTestLayout from './components/admin_test/AdminTestLayout'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
            <Route exact path="/admin" component={AdminLayout}/>
            <Route path="/admin/test/:id" component={AdminTestLayout} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
