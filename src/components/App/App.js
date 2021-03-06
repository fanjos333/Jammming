import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults:[],
      playlistName:"New PlayList",
      playlistTracks:[]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlayList=this.updatePlayList.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack =>
          savedTrack.id === track.id)) {
      return;
    }
    else {
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      });

    }}
    removeTrack(track){
      this.setState({
        playlistTracks: this.state.playlistTracks.filter((playlistTrack)=>
        playlistTrack.id!==track.id)
      });
    }
    updatePlayList(name){
      this.setState({playlistName:name});
    }
    savePlaylist(){
      let trackURIs=this.state.playlistTracks.map((track) =>
      {
        return track.uri
      });
      Spotify.savePlaylist(this.state.playlistName, trackURIs);
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: []
      });
    }
    search(searchTerm){
      console.log(searchTerm);
      Spotify.search(searchTerm).then((tracks)=>{
        this.setState({
          searchResults:tracks
        });
      });
    }

    render(){
      return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
              <SearchBar onSearch={this.search}/>
                <div className="App-playlist">
                    <SearchResults
                      onAdd={this.addTrack}
                      searchResults = {this.state.searchResults}               
                    />
                        <PlayList
                          playlistName={this.state.playlistName}
                          playlistTracks={this.state.playlistTracks}
                          onRemove={this.removeTrack}
                          onNameChange={this.updatePlayList}
                          onSave={this.savePlaylist}
                        />
                  </div>
                </div>
              </div>
       );
      }
    };

    export default App;
