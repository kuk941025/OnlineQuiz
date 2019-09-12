import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
            <Route exact path="/admin" component={AdminLayout}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
