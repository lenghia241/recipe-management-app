import React, { Component } from 'react';
// import ReactDom from 'react-dom';
// import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import AppFunction from './components/AppFunction';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import RecipeItem from './components/RecipeItem'

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			recipes:[],
			foundRecipe:"",
			displayForm:false,
			displayList:false,
			displayItem: false
		};
	}

    componentWillMount() {
    if(localStorage && localStorage.getItem('recipes')){
        var recipes=JSON.parse(localStorage.getItem('recipes'));
        this.setState ({
            recipes: recipes
        });
    	}
    }


	addRecipe = (value) => {


		var {recipes} = this.state;
		if(value.id==='') {
			value.id= this.generateID();
			recipes.push(value)
		};
		
		this.setState ({
			recipes:recipes
		});
		localStorage.setItem ('recipes', JSON.stringify(recipes));
		console.log(value.id);
	}

	generateID=()=> {
		var randomString = require('random-string');
		return randomString({length:8});
	}

	onCloseForm = () => {
		this.setState({
			displayForm:false,
			displayList:false,
			displayItem:false
		});
	}

	onOpenForm = () => {
		this.setState ({
			displayForm: true,
			displayList:false,
			displayItem:false
		});
	}

	onToggleList = () => {
		this.setState ({
			displayForm:false,
			displayList:!this.state.displayList,
			displayItem:false
		});
	}

	onDeleteAll=()=>{
		var recipes = [];
		this.setState({
			recipes:recipes
		});
		localStorage.setItem ('recipes', JSON.stringify(recipes));
	}

	onShowItem = (id) => {
		this.setState({
			displayForm:false,
			displayList:false,
			displayItem:true
		});
		var {recipes} = this.state;
		var index= this.checkId(id);
		if(index!==-1) {
			this.setState({
				foundRecipe:recipes[index]
			});
		};

	}

    checkId = (id) => {
	    var {recipes} = this.state;
	    var result = -1;
	    recipes.forEach((recipe, index)=> {
	        if(recipe.id === id) {
	            result = index;
	        } 
	    });
	    return result;
    }

    onUpdateRecipe=(value) => {
		var {recipes} = this.state;
		var index = this.checkId(value.id);
		recipes[index]=value;

		this.setState({
		    recipes: recipes
		});
	   	localStorage.setItem ('recipes', JSON.stringify(recipes));
    }

    onRemoveItem = (value) => {
    	var {recipes} = this.state;
		var index = this.checkId(value);

		
		recipes.splice(index,1);

		this.setState({
		    recipes: recipes
		});
	   	localStorage.setItem ('recipes', JSON.stringify(recipes));
		
		this.onCloseForm();
    }

  render() {

  	var {recipes, displayForm, displayList, displayItem, foundRecipe} = this.state;

  	var elmRecipes = recipes.map((recipe,index) => {
		return  <button className="button"
					key={index}
					type="button" 
					className="btn btn-default"
					onClick={()=>this.onShowItem(recipe.id)}>{recipe.name}</button>
	});

  	var elmList = recipes.map((recipe,index) => {
		return  <RecipeList
					key={index}
					recipes={recipe}
					index={index}
					onUpdateRecipe={this.onUpdateRecipe}
					onRemoveItem = {this.onRemoveItem}
					/>
	});

    return (
    	<div className="container-fluid">
    		<div className="row">
    			
				<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 functionArea">
				
					<div className="intro">
					</div>
					<h1>Recipe Storage Application</h1>
					<br/>
    				<AppFunction 
    				displayForm={displayForm}
    				onOpenForm = {this.onOpenForm}
    				onToggleList={this.onToggleList}
    				onDeleteRecipes={this.onDeleteAll}
    				displayList= {this.state.displayList}
    				/>

    				{elmRecipes}
    			</div>
    			

    			<div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 formArea">
					
    				{displayForm ? <RecipeForm 
    							addRecipe = {this.addRecipe}
    							onCloseForm= {this.onCloseForm}
    							/> : ''}

    				{displayList ? elmList:''}

    				{displayItem ? <RecipeItem 
								foundRecipe={foundRecipe}
								onUpdateRecipe={this.onUpdateRecipe}
								onRemoveItem = {this.onRemoveItem}/>:''}	
    			</div>

    		</div>
    	</div>
    );
  }
}

export default App;
