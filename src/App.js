import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import './App.css'
import DropAndProcess from './components/dropandprocess'
import Search from './components/search'
import axios from 'axios';
import FileDownload from 'js-file-download'


class App extends Component {

    state = {
      page: {
        dropandprocess: true,
        search: false
      }
        
    }


    navbarHandler = (id) => {
      if (id === 'downloaddb') {
        console.log('call downloaddb')
        this.downloadDB()
        return
      }
      let page = this.state.page
      page[id] = true
      for (let key in page) {
        if (key !== id)
          page[key] = false
      }
      console.log(page)
      this.setState({page: page})
    }

    downloadDB = () => {
      axios.get('http://localhost:5000/downloaddb').then((res) => {
        console.log(res)
        FileDownload(res.data, 'DB.csv');
      }).catch(err => console.log(err))
    }


  

  
  render() {
    return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button onClick={() => this.navbarHandler('dropandprocess')} className="btn" style={{backgroundColor: "transparent", color: "white", margin: 5}}  >File upload</button>
            <button onClick={() => this.navbarHandler('downloaddb')} className="btn" style={{backgroundColor: "transparent", color: "white", margin: 5}}  >Download DB</button>
            <button onClick={() => this.navbarHandler('search')} className="btn" style={{backgroundColor: "transparent", color: "white", margin: 5}}  >Search</button>
          </nav>
          {this.state.page.dropandprocess && <DropAndProcess/>}
          {this.state.page.search && <Search/> }
        
      </div>

    );
  }
}

export default App;