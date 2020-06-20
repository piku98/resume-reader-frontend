import React, { Component } from 'react';
import axios from 'axios'


class ResumeDetails extends Component {
    
    handleChange = (event) => {
        this.props.onValueChange(event.target.name, event.target.value)

    }

    addValue(id) {
        const resumedetails = this.props.resumedetails
        if (!resumedetails) return ''
        return resumedetails[id]

    }

    handleSubmitButton = () => {
        let resumedetails = this.props.resumedetails
        let data = {}
        for (let key in resumedetails) {
            if (key === 'n_tables')
                data['tables'] = resumedetails[key]
            else if (key === 'n_images')
                data['images'] = resumedetails[key]
            else if (key === 'fonts') {
                
                data[key] = resumedetails[key].toString()

            }
                
            else 
                data[key] = resumedetails[key]
        }
        console.log(this.props.resumedetails)
        axios.post('http://localhost:5000/updateinfo', data, {}).then((res) => {
            alert(res.data.message)
        }).catch(err => alert(err.response.data.message))

    }
    
    render() { 
        return ( 
            <div style={{height:500, width: "100%", marginLeft: 10, backgroundColor: "#D3D3D3", padding: 20}}>
                <h4>You can update the extracted details if you found something wrong</h4>
                <form className="form-control" style={{width: "70%"}} >
                    <p >
                    <label style={{width: 60}}>Name:</label> 
                    <input style={{width: '50%'}} name="name" type="text" defaultValue={this.addValue("name")} onChange={this.handleChange} />
                    </p>

                    <p >
                    <label style={{width: 60}}>Email:</label> 
                    <input style={{width: '50%'}}  name="email" type="text" defaultValue={this.addValue("email")} onChange={this.handleChange} />
                    </p>

                    <p >
                    <label style={{width: 60}}>Phone:</label> 
                    <input style={{width: '50%'}} name="phone" type="text" defaultValue={this.addValue("phone")} onChange={this.handleChange} />
                    </p>

                    <p >
                    <label style={{width: 60}}>LinkedIn:</label> 
                    <input style={{width: '50%'}} name="linkedin" type="text" defaultValue={this.addValue("linkedin")} onChange={this.handleChange} />
                    </p>

                    <p >
                    <label style={{width: 60}}>Images:</label> 
                    <input style={{width: '50%'}} name="images" type="text" defaultValue={this.addValue("n_images")} onChange={this.handleChange} />
                    </p>

                    <p >
                    <label style={{width: 60}}>Tables:</label> 
                    <input style={{width: '50%'}} name="tables" type="text" defaultValue={this.addValue("n_tables")} onChange={this.handleChange} />
                    </p>

                    <p >
                    <label style={{width: 60}}>Fonts:</label> 
                    <input style={{width: '50%'}} name="fonts" type="text" defaultValue={this.addValue("fonts")} onChange={this.handleChange} />
                    </p>

                </form>
                <div style={{marginLeft: '25%'}}><button onClick={this.handleSubmitButton} className="btn btn-primary">Submit</button></div>
                
          </div>
         );
    }
}
 
export default ResumeDetails;