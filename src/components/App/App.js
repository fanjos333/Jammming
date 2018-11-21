import React from 'react';
import './App.css';
import SeachBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults:[{
        name: 'name',
        artist: 'artist',
        album: 'album'
      }],
      playlistName:"Play List",
      playlistTracks:[{
        name:"name",
        artist:"artist",
        album:"album",
        id:"id"
      }]

    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlayList=this.updatePlayList.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
  }
  removeTrack(track){
    this.setState({ playlistTracks: this.state.playlistTracks.filter(playlistTrack=> playlistTrack.id!==track.id)
    });
  }
  updatePlayList(name){
    this.setState({playlistName:name});
  }
  savePlaylist(){
    const trackURIs=this.state.playlistTracks.map(track => (
      track.uri
    ));
  }
  search(search){
    console.log(search);
  }

  render(){
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      <SeachBar onSearch={this.search}/>
      <div className="App-playlist">
      <SearchResults searchResults = {this.state.searchResults} onAdd={this.addTrack}/>
      <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
      onRemove={this.removeTrack} onNameChange={this.updatePlayList}/>
      </div>
      </div>
      </div>);
    }
  };

  export default App;
