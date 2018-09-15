'use strict';

class ToDont extends React.Component {
	constructor(props) {
		super(props);

		let savedState = localStorage.getItem('todontState');
		if (savedState) {
			this.state = JSON.parse(savedState);
		} else {
			this.state = { items: ["say mean things about my website"] };
		}

		this.updateListItem = this.updateListItem.bind(this);
		this.deleteListItem = this.deleteListItem.bind(this);
		this.addNewItem = this.addNewItem.bind(this);

	}

	componentDidUpdate() {
		localStorage.setItem('todontState', JSON.stringify(this.state));
	}

	updateListItem(newValue, idx) {
		this.setState((state, props) => {
			let updatedItems = state.items;
			updatedItems[idx] = newValue;
			return { items: updatedItems }
		});
	}

	addNewItem() {
		this.setState((state, props) => {
			let updatedItems = state.items;
			updatedItems.push('');
			return { items: updatedItems };
		});
	}

	deleteListItem(idx) {
		console.log(idx);
		this.setState((state, props) => {
			let updatedItems = state.items;
			updatedItems.splice(idx, 1);
			return { items: updatedItems }
		});
	}

	render() {
		let listElements = this.state.items.map((item, idx) => <ToDontItem key={idx} index={idx} value={item} onChange={this.updateListItem} deleteItem={this.deleteListItem}></ToDontItem>)

		return (
			<div>
				<div className="app-desc todont-app-desc">
					<h1>to-don't</h1>
					<p>
						the to-don't list is a list of things not to do. it's like a to-do list in many ways except for the fact that it
						is the literal opposite.
						</p>
					<p>
						the list saves as you type, probably<br />
						if you do something on the list, you can delete it
						</p>
					<p>
						decide for yourself how ashamed you should be when you do
						</p>
				</div>
				<div className="app-content todont-app-content px-3">
					<h2>do&nbsp;not do the&nbsp;following:</h2>
					{listElements}
					<div className="todont-add my-3">
						<button className="btn btn-secondary todont-add-btn" onClick={this.addNewItem}>add new item +</button>
					</div>
				</div>
			</div>
		);
	}
}

class ToDontItem extends React.Component {
	constructor(props) {
		super(props);

		this.updateValue = this.updateValue.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	updateValue(event) {
		this.props.onChange(event.target.value, this.props.index);
	}

	deleteItem() {
		this.props.deleteItem(this.props.index);
	}

	render() {
		return (
			<div className="todont-item input-group my-2" key={this.props.index}>
				<input type="text" className="form-control" value={this.props.value} onChange={this.updateValue} />
				<div className="input-group-append">
					<button className="btn btn-secondary todont-close-btn input-group-btn" onClick={this.deleteItem}>&times;</button>
				</div>
			</div>
		);
	}
}