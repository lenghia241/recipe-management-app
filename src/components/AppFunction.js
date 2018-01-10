import React, { Component } from 'react';

class AppFunction extends Component {


    onClick = () => {
        this.props.onOpenForm();
    }

    toggleList = () => {
        this.props.onToggleList();
    }

    onDeleteAll = () =>{
        this.props.onDeleteRecipes();
    }

  render() {

    return (

        <div className="functionArea__wrapper">

                <button type="button" 
                        className="btn button"
                        onClick = {this.onClick}
                >Add a New Recipe</button>
                <br/>
                <button type="button" 
                        className="btn btn-success button"
                        onClick={this.toggleList}>{this.props.displayList? 'Hide All Recipes' : 'Show All Recipes'}</button>
                <br/>
                <button 
                        type="button" 
                        className="btn btn-danger button"
                        onClick={this.onDeleteAll}>Remove All Recipes</button>
                <br/>

            <br/>

                

        </div>

    				
    );
  }
}

export default AppFunction;
