import { Audio } from 'expo-av';


const AudioHelper = {
    list: [],
    isInList: function(file){
      return this.list.findIndex(file) === 1;
    },
    init: async function(file){
      let newAudio =  new Audio.Sound();

      this.list[file] = {audio: newAudio, file: file};
      try{
      await Audio.setIsEnabledAsync(true);
      await this.list[file].audio.loadAsync(this.list[file].file);
      await this.list[file].audio.playAsync();
    } catch(e){
        console.log("No bueno",file.toString());
    }

    //  this.list[file].audio.setIsLoopingAsync(true);
    },
    findIndex: function(file){
      return this.list.findIndex(file);
    },
    play: async function(file){
      if(!this.list[file]){
        this.init(file);
      } else {
        await this.list[file].audio.playAsync();
      }
    },
    pause: async function(file){
      await this.list[file].audio.pauseAsync();
    },
    stop: async function(file){
      await this.list[file].audio.stopAsync();
    },
    stopAll: async function(){
      this.list.map(index=>{
        this.stop(index.file);
      });
    }

}
export default AudioHelper;
