import { Audio } from 'expo-av';


const AudioHelper = {
    list: [],
    muted: false,
    isInList: function(file){
      return this.list.findIndex(file) === 1;
    },
    init: async function(file,volume,looping){
      let newAudio =  new Audio.Sound();

      this.list[file] = {audio: newAudio, file: file};
      try{
      await Audio.setIsEnabledAsync(true);
      await this.list[file].audio.loadAsync(this.list[file].file);
      await this.list[file].audio.playAsync();
      if(volume){
        await this.list[file].audio.setVolumeAsync(volume);
      }
      if(looping){
        this.list[file].audio.setIsLoopingAsync(true);
      }
      if(this.muted){
        this.mute(file);
      }

    } catch(e){
        console.log("No bueno",file.toString());
    }

    },
    muteAll: async function(){
      this.muted = true;
      this.list.map(index=>{
        this.mute(index.file);
      });
    },
    mute: async function(file){
         this.list[file].audio.setIsMutedAsync(true);
    },
    unMute: async function(file){
         this.list[file].audio.setIsMutedAsync(false);
    },
    unMuteAll: function(){
      this.muted = false;
      this.list.map(index=>{
        this.unMute(index.file);
      });
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
