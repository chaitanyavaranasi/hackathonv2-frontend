import React, { Component } from "react";
import ItemDataService from "../services/item.service";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategory = this.onChangeCategory.bind(this)
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);
    this.getItem = this.getItem.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
      currentItem: {
        id: null,
        category: "",
        name: "",
        notes: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getItem(this.props.match.params.id);
  }

  onChangeCategory(e) {
    const category = e.target.value;

    this.setState(function(prevState) {
      return {
        currentItem: {
          ...prevState.currentItem,
          category: category
        }
      };
    });
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentItem: {
          ...prevState.currentItem,
          name: name
        }
      };
    });
  }

  onChangeNotes(e) {
    const notes = e.target.value;

    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        notes: notes
      }
    }));
  }

  getItem(id) {
    ItemDataService.get(id)
      .then(response => {
        this.setState({
          currentItem: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentItem.id,
      category: this.state.currentItem.category,
      name: this.state.currentItem.name,
      notes: this.state.currentItem.notes,
      published: status
    };

    ItemDataService.update(this.state.currentItem.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentItem: {
            ...prevState.currentItem,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateItem() {
    ItemDataService.update(
      this.state.currentItem.id,
      this.state.currentItem
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The item was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteItem() {
    ItemDataService.delete(this.state.currentItem.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/items')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentItem } = this.state;

    return (
      <div>
        {currentItem ? (
          <div className="edit-form">
            <h4>Item</h4>
            <form>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={currentItem.name}
                  onChange={this.onChangeCategory}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentItem.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <input
                  type="text"
                  className="form-control"
                  id="notes"
                  value={currentItem.notes}
                  onChange={this.onChangeNotes}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentItem.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentItem.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteItem}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateItem}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Item...</p>
          </div>
        )}
      </div>
    );
  }
}
