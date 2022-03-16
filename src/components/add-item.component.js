import React, { Component } from "react";
import ItemDataService from "../services/item.service";

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategory = this.onChangeCategory.bind(this)
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);
    this.onChangeLongitude = this.onChangeLongitude.bind(this);
    this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.newItem = this.newItem.bind(this);

    this.state = {
      id: null,
      category: "",
      name: "",
      notes: "",
      longitude: 0.0,
      latitude: 0.0,
      published: false,
      submitted: false,
    };
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeNotes(e) {
    this.setState({
      notes: e.target.value
    });
  }

  onChangeLongitude(e) {
    this.setState({
      longitude: e.target.value
    });
  }

  onChangeLatitude(e) {
    this.setState({
      latitude: e.target.value
    });
  }

  saveItem() {
    var data = {
      category: this.state.category,
      name: this.state.name,
      notes: this.state.notes,
      longitude: this.state.longitude,
      latitude: this.state.latitude
    };

    ItemDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          category: response.data.category,
          name: response.data.name,
          notes: response.data.notes,
          longitude: response.data.longitude,
          latitude: response.data.latitude,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newItem() {
    this.setState({
      id: null,
      category: "",
      name: "",
      notes: "",
      logitude: 0.0,
      latitude: 0.0,
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newItem}>
              Add
            </button>
          </div>
        ) : (
          <div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                required
                value={this.state.category}
                onChange={this.onChangeCategory}
                name="category"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <input
                type="text"
                className="form-control"
                id="notes"
                required
                value={this.state.notes}
                onChange={this.onChangeNotes}
                name="notes"
              />
            </div>

            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                className="form-control"
                id="longitude"
                required
                value={this.state.longitude}
                onChange={this.onChangeLongitude}
                name="longitude"
              />
            </div>

            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                className="form-control"
                id="latitude"
                required
                value={this.state.latitude}
                onChange={this.onChangeLatitude}
                name="latitude"
              />
            </div>

            <button onClick={this.saveItem} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
