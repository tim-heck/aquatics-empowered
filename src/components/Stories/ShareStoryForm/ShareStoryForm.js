import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShareStoryForm extends Component {


    

    render() {
        return (
            <>
            <p>Share your aquatic therapy story below!</p>
            <div className="add-bar-form">
                <form onSubmit={this.handleSubmit}>

                <input required placeholder="Bar Name"
                    id="bar-name-input"
                    // value={this.state.bar_name}
                    onChange={(event) => this.handleChangeFor('bar_name', event)} />
                <br/>
                <input required placeholder="Address, City"
                    id = "address-input"
                    // value={this.state.street_address}
                    onChange={(event) => this.handleChangeFor('street_address', event)} />
                <br/>
                <input required placeholder="Phone"
                    id = "phone-input"
                    // value={this.state.phone}
                    onChange={(event) => this.handleChangeFor('phone', event)} />
                <br/>
                <textarea rows="4" cols="40" id="add-bar-input" required placeholder="Hamm's Information"
                    // value={this.state.notes}
                    onChange={(event) => this.handleChangeFor('notes', event)} maxLength="200" />
                <br />
                <button type="submit">
                    Submit Story
                </button>
            </form>
            </div>
          
            </>
        )
    }
}

export default connect()(ShareStoryForm);
