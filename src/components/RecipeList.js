import React, { Component } from 'react';
import EditForm from './EditForm';

class RecipeList extends Component {

	constructor (props) {
		super(props);
		this.state = {
			displayEdit: false
		}
	}

	onOpenForm = ()=> {
		this.setState ({
			displayEdit:true
		});
	}

	closeEdit = ()=> {
		this.setState ({
			displayEdit:false
		});
	}

	onRemoveItem = () => {
		this.props.onRemoveItem(this.props.recipes.id);
	}

  render() {
  	var {recipes,index}=this.props;

    return (
		<div className="list-group">
			<a className="list-group-item active" key={index}>
				<h4 className="list-group-item-heading">{recipes.name}</h4>
				<button type="button" className="btn btn-primary" onClick={this.onOpenForm}>Edit This Recipe</button>
				<button type="button" className="btn btn-danger" onClick={this.onRemoveItem}>Remove this Recipe</button>
				<p className="list-group-item-text">{recipes.desc}</p>
				{this.state.displayEdit ? <EditForm 
												onUpdateRecipe={this.props.onUpdateRecipe}
												recipes={recipes}
												closeEdit={this.closeEdit}/> : ''}
			</a>
		</div>
    						
    );
  }
}

export default RecipeList;
