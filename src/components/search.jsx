import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios'


class Search extends Component {
    state = {
        searchquery: null,
        options: "email",
        searchresults: []
      }
    
    handleChange = (event) => {
        let state = this.state
        let name = event.target.name
        let value = event.target.value
        state[name] = value
        this.setState(state)
        
      };

    submit = () => {
        let state = this.state
        if (!state.searchquery)
            alert('search query empty')
        let link = 'http://localhost:5000/getdetails?key=' + state.options + '&val=' + state.searchquery

        axios.get(link, {}).then((res) => {
            let data = res.data
            if (!data.success) 
                alert(data.message)
            else if (data.message.length == 0) {
                alert('No results found.')
                this.setState({searchresults: []})
            }
            else {
                let message = data.message
                let searchresults = state.searchresults
                searchresults.push(message[0])
                for (let i = 1; i < message.length; i++) {
                    for (let j = 0; j < searchresults.length; j++) {
                        if (message[i].email !== searchresults[j].email)
                            searchresults.push(message[i])
                    }
                }
                this.setState({searchresults: searchresults})
            }

        }).catch(err => console.log(err))
        
    }


    render() { 
        return ( 
            <div style={{backgroundColor: "#D3D3D3", width: "50%", marginLeft: '30%', padding: 20}}>
                <h1>Search resume information</h1>
                <FormControl component="fieldset" style={{width: '100%'}}>
                    <input style={{width: '100%'}} name="searchquery" type="text" onChange={this.handleChange} />
                    <h6>Search using:</h6>
                    <RadioGroup style={{ display: 'inline-table', padding: '0px' }} 
                    aria-label="options" 
                    name="options" value={this.state.options} 
                    onChange={this.handleChange}>
                        <FormControlLabel labelPlacement="start" value="email" control={<Radio />} label="email" />
                        <FormControlLabel labelPlacement="start" value="phone" control={<Radio />} label="phone" />
                    </RadioGroup>
                </FormControl>

                <div><button onClick={this.submit} className="btn btn-secondary badge-primary">Search</button></div>
                <h2 style={{marginTop: 20}}>Results</h2>
                {this.state.searchresults.map(result => 
                <div style={{margin: 10, backgroundColor: 'white'}}>
                    <p>Name: {result.name}</p>
                    <p>Email: {result.email}</p>
                    <p>LinkedIn: {result.linkedin}</p>
                    <p>phone: {result.phone}</p>
                    <p>Tables: {result.tables}</p>
                    <p>Images: {result.images}</p>
                    <p>Fonts: {result.fonts}</p>
                </div>)}

            </div>
         );
    }
}
 
export default Search;