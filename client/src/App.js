import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Create from './pages/Create';
//import FilterDiets from './components/FilterOrder';
import Detail from './pages/Detail';
import RecipesPage from './pages/RecipesPage';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/recipes" component={RecipesPage}/>
        <Route exact path="/recipe/create" component={Create} />
        <Route exact path="/recipe/detail/:idRecipe" component={Detail} />
        <Route path="*" component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
