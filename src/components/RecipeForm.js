import React, { Component } from 'react';


class RecipeForm extends Component {

	constructor(props) {
		super(props);
		this.state= {
			id:'',
			name: '',
			desc: ''
		}
	}


	onChange= (event) => {
		var target=event.target;
		var name=target.name;
		var value= target.value;
		this.setState({
			[name]:value
		});
	}

	onSubmit=(event)=>{
		event.preventDefault();
		this.props.addRecipe(this.state);
		this.clearForm();
		this.closeForm();
	}

	clearForm=()=>{
		this.setState({
			name:'',
			desc:''
		});
	}

	closeForm=()=>{
		this.props.onCloseForm();
	}

  render() {


    return (

		<form className="form" onSubmit={this.onSubmit}>
			<h2>Add a Recipe</h2>
			<input 
					type="text" 
					name="name" 
					className="form-control form__input"
					id="name"
					placeHolder="Recipe Name"
					value={this.state.name}
					onChange={this.onChange}/>
			<label for="name" className="form__label">Recipe Name</label>

			<textarea
					name="desc" 
					id="input" 
					className="form-control form__input" 
					rows="3"
					id="desc"
					placeHolder="Ingredients"
					value={this.state.desc}
					onChange={this.onChange}></textarea>
			<label for="desc" className="form__label">Ingredients</label>

			<button type="submit" className="btn btn-primary">Submit</button>
			<button type="button" className="btn btn-primary" onClick={this.closeForm}>Cancel</button>

		</form>
    );
  }
}

export default RecipeForm;
